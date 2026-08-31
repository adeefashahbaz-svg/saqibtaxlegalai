from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc

from backend.database import get_db
from backend.models import User, Subscription, PaymentReceipt, SubscriptionTier, UserRole
from backend.auth import get_current_user

router = APIRouter(prefix="/api/payment", tags=["Manual Bank Payments & Subscription Checkout"])
subscription_router = APIRouter(prefix="/api/subscription", tags=["User Subscription Status"])
admin_router = APIRouter(prefix="/api/admin", tags=["Admin Payment Verification & Approvals"])

# -------------------------------------------------------------
# PYDANTIC SCHEMAS
# -------------------------------------------------------------

class PaymentSubmitRequest(BaseModel):
    transaction_id: str
    sender_name: str
    amount: int
    receipt_image_url: Optional[str] = None # Can be image URL or Base64 string
    plan_type: str = "Monthly" # 'Monthly' or 'Yearly'
    plan_tier: str = "pro" # 'pro' or 'enterprise'
    payment_method: str = "Meezan Bank" # 'Meezan Bank', 'HBL', 'JazzCash', 'EasyPaisa'
    notes: Optional[str] = None

class LegacyPaymentSubmitRequest(BaseModel):
    trx_id: Optional[str] = None
    transaction_id: Optional[str] = None
    account_holder_name: Optional[str] = None
    sender_name: Optional[str] = None
    amount_pkr: Optional[int] = None
    amount: Optional[int] = None
    receipt_image_url: Optional[str] = None
    plan_type: Optional[str] = "Monthly"
    plan_tier: Optional[str] = "pro"
    payment_method: Optional[str] = "Meezan Bank"
    notes: Optional[str] = None

class VerifyPaymentRequest(BaseModel):
    payment_id: str
    action: str # "Approve" or "Reject"
    rejection_reason: Optional[str] = None
    admin_notes: Optional[str] = None

# Admin dependency helper
async def require_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if current_user.is_admin or current_user.role in [UserRole.ADMIN, UserRole.TAX_CONSULTANT]:
        return current_user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Administrative verification privileges required to access this endpoint."
    )

# -------------------------------------------------------------
# 1. USER PAYMENT SUBMISSION ENDPOINTS
# -------------------------------------------------------------

@router.post("/submit", status_code=status.HTTP_201_CREATED)
async def submit_payment_receipt(
    payload: LegacyPaymentSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    POST /api/payment/submit
    Allows logged-in users to submit manual bank / JazzCash payment proof.
    Creates a PaymentReceipt in 'Pending' status and a pending Subscription.
    """
    trx_id = payload.transaction_id or payload.trx_id
    sender = payload.sender_name or payload.account_holder_name
    amt = payload.amount or payload.amount_pkr or (2500 if (payload.plan_tier or "pro").lower() == "pro" else 10000)
    plan_type = payload.plan_type or "Monthly"
    plan_tier_str = (payload.plan_tier or "pro").lower()

    if not trx_id or not sender:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transaction ID and Sender / Account Holder Name are required."
        )

    if plan_tier_str not in ["pro", "enterprise"]:
        plan_tier_str = "pro"

    tier_enum = SubscriptionTier.PRO if plan_tier_str == "pro" else SubscriptionTier.ENTERPRISE

    # 1. Create PaymentReceipt record
    receipt = PaymentReceipt(
        user_id=current_user.id,
        amount=amt,
        transaction_id=trx_id.strip(),
        sender_name=sender.strip(),
        receipt_image_url=payload.receipt_image_url,
        plan_type=plan_type,
        plan_tier=plan_tier_str,
        payment_method=payload.payment_method or "Meezan Bank",
        status="Pending",
        notes=payload.notes,
        submitted_at=datetime.utcnow()
    )
    db.add(receipt)

    # 2. Create or sync Subscription record
    new_sub = Subscription(
        user_id=current_user.id,
        plan_type=plan_type,
        plan_tier=tier_enum,
        amount_pkr=amt,
        status="Pending",
        trx_id=trx_id.strip(),
        account_holder_name=sender.strip(),
        payment_method=payload.payment_method or "Meezan Bank",
        created_at=datetime.utcnow(),
        start_date=datetime.utcnow(),
        expires_at=None, # Will be set upon admin approval
    )
    db.add(new_sub)

    await db.commit()
    await db.refresh(receipt)
    await db.refresh(new_sub)

    return {
        "message": "Payment receipt submitted successfully. Status is Pending manual admin verification.",
        "payment_receipt": {
            "id": receipt.id,
            "user_id": receipt.user_id,
            "amount": receipt.amount,
            "transaction_id": receipt.transaction_id,
            "sender_name": receipt.sender_name,
            "receipt_image_url": receipt.receipt_image_url,
            "plan_type": receipt.plan_type,
            "plan_tier": receipt.plan_tier,
            "payment_method": receipt.payment_method,
            "status": receipt.status,
            "submitted_at": receipt.submitted_at.isoformat() if receipt.submitted_at else None,
        },
        "subscription": {
            "id": new_sub.id,
            "plan_type": new_sub.plan_type,
            "plan_tier": new_sub.plan_tier.value,
            "status": new_sub.status,
            "created_at": new_sub.created_at.isoformat() if new_sub.created_at else None,
        }
    }

# Backward compatible alias for /api/subscription/submit
@subscription_router.post("/submit", status_code=status.HTTP_201_CREATED)
async def submit_subscription_alias(
    payload: LegacyPaymentSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await submit_payment_receipt(payload, current_user, db)

# -------------------------------------------------------------
# 2. USER SUBSCRIPTION STATUS
# -------------------------------------------------------------

@subscription_router.get("/status")
async def get_subscription_status(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns the user's active tier, latest subscription, expiry date,
    and pending verification receipts.
    """
    # Fetch user's payment receipts
    receipts_stmt = (
        select(PaymentReceipt)
        .where(PaymentReceipt.user_id == current_user.id)
        .order_by(desc(PaymentReceipt.submitted_at))
    )
    receipts_res = await db.execute(receipts_stmt)
    receipts = receipts_res.scalars().all()

    # Fetch user's subscriptions
    subs_stmt = (
        select(Subscription)
        .where(Subscription.user_id == current_user.id)
        .order_by(desc(Subscription.created_at))
    )
    subs_res = await db.execute(subs_stmt)
    subs = subs_res.scalars().all()

    pending_receipt = next((r for r in receipts if r.status == "Pending"), None)
    active_sub = next((s for s in subs if s.status in ["Active", "APPROVED", "active"]), None)

    return {
        "user_id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "current_tier": current_user.subscription_tier.value,
        "is_admin": current_user.is_admin or current_user.role in [UserRole.ADMIN, UserRole.TAX_CONSULTANT],
        "queries_used_today": current_user.queries_used_today or 0,
        "max_daily_queries": 5 if current_user.subscription_tier == SubscriptionTier.FREE else 9999,
        "has_pending_payment": pending_receipt is not None,
        "expires_at": active_sub.expires_at.isoformat() if (active_sub and active_sub.expires_at) else None,
        "pending_payment": {
            "id": pending_receipt.id,
            "amount": pending_receipt.amount,
            "transaction_id": pending_receipt.transaction_id,
            "sender_name": pending_receipt.sender_name,
            "plan_type": pending_receipt.plan_type,
            "plan_tier": pending_receipt.plan_tier,
            "payment_method": pending_receipt.payment_method,
            "status": pending_receipt.status,
            "submitted_at": pending_receipt.submitted_at.isoformat() if pending_receipt.submitted_at else None,
        } if pending_receipt else None,
        "recent_receipts": [
            {
                "id": r.id,
                "amount": r.amount,
                "transaction_id": r.transaction_id,
                "sender_name": r.sender_name,
                "plan_type": r.plan_type,
                "plan_tier": r.plan_tier,
                "payment_method": r.payment_method,
                "status": r.status,
                "submitted_at": r.submitted_at.isoformat() if r.submitted_at else None,
                "verified_at": r.verified_at.isoformat() if r.verified_at else None,
            }
            for r in receipts[:10]
        ],
    }

# -------------------------------------------------------------
# 3. ADMIN VERIFICATION ENDPOINTS
# -------------------------------------------------------------

@admin_router.get("/pending-payments")
async def get_pending_payments(
    admin_user: User = Depends(require_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """
    GET /api/admin/pending-payments
    Protected admin endpoint to fetch all pending payment requests.
    """
    stmt = (
        select(PaymentReceipt, User)
        .join(User, PaymentReceipt.user_id == User.id)
        .where(PaymentReceipt.status == "Pending")
        .order_by(desc(PaymentReceipt.submitted_at))
    )
    result = await db.execute(stmt)
    rows = result.all()

    output = []
    for receipt, user in rows:
        output.append({
            "id": receipt.id,
            "user_id": receipt.user_id,
            "user_email": user.email,
            "user_name": user.full_name,
            "user_organization": user.organization,
            "amount": receipt.amount,
            "transaction_id": receipt.transaction_id,
            "sender_name": receipt.sender_name,
            "receipt_image_url": receipt.receipt_image_url,
            "plan_type": receipt.plan_type,
            "plan_tier": receipt.plan_tier,
            "payment_method": receipt.payment_method,
            "status": receipt.status,
            "notes": receipt.notes,
            "submitted_at": receipt.submitted_at.isoformat() if receipt.submitted_at else None,
        })
    return output

@admin_router.get("/payments")
async def get_all_payments(
    admin_user: User = Depends(require_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """
    GET /api/admin/payments
    Protected admin endpoint to fetch all payments (Pending, Approved, Rejected).
    """
    stmt = (
        select(PaymentReceipt, User)
        .join(User, PaymentReceipt.user_id == User.id)
        .order_by(desc(PaymentReceipt.submitted_at))
    )
    result = await db.execute(stmt)
    rows = result.all()

    output = []
    for receipt, user in rows:
        output.append({
            "id": receipt.id,
            "user_id": receipt.user_id,
            "user_email": user.email,
            "user_name": user.full_name,
            "user_organization": user.organization,
            "amount": receipt.amount,
            "transaction_id": receipt.transaction_id,
            "sender_name": receipt.sender_name,
            "receipt_image_url": receipt.receipt_image_url,
            "plan_type": receipt.plan_type,
            "plan_tier": receipt.plan_tier,
            "payment_method": receipt.payment_method,
            "status": receipt.status,
            "notes": receipt.notes,
            "rejection_reason": receipt.rejection_reason,
            "submitted_at": receipt.submitted_at.isoformat() if receipt.submitted_at else None,
            "verified_at": receipt.verified_at.isoformat() if receipt.verified_at else None,
            "verified_by": receipt.verified_by,
        })
    return output

@admin_router.post("/verify-payment")
async def verify_payment(
    payload: VerifyPaymentRequest,
    admin_user: User = Depends(require_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """
    POST /api/admin/verify-payment
    Admin endpoint to Approve or Reject a payment.
    - If Approved: Updates PaymentReceipt status to 'Approved', updates Subscription
      status to 'Active', computes expires_at (+30d for Monthly, +365d for Yearly),
      and elevates the User's tier to Pro or Enterprise.
    - If Rejected: Updates PaymentReceipt status to 'Rejected' with reason.
    """
    # 1. Fetch Receipt
    receipt_stmt = select(PaymentReceipt).where(PaymentReceipt.id == payload.payment_id)
    receipt_res = await db.execute(receipt_stmt)
    receipt = receipt_res.scalar_one_or_none()

    if not receipt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Payment receipt with ID {payload.payment_id} not found."
        )

    # 2. Fetch User
    user_stmt = select(User).where(User.id == receipt.user_id)
    user_res = await db.execute(user_stmt)
    user = user_res.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Associated user record not found."
        )

    # 3. Fetch latest Subscription for user
    sub_stmt = (
        select(Subscription)
        .where(Subscription.user_id == receipt.user_id)
        .order_by(desc(Subscription.created_at))
    )
    sub_res = await db.execute(sub_stmt)
    sub = sub_res.scalar_one_or_none()

    action_clean = payload.action.strip().capitalize() # "Approve" or "Reject"

    if action_clean == "Approve":
        receipt.status = "Approved"
        receipt.verified_at = datetime.utcnow()
        receipt.verified_by = admin_user.full_name or "SaqibTax Admin"

        # Calculate expiry date
        duration_days = 365 if receipt.plan_type.lower() == "yearly" else 30
        expiry_date = datetime.utcnow() + timedelta(days=duration_days)

        if sub:
            sub.status = "Active"
            sub.expires_at = expiry_date
            sub.approved_at = datetime.utcnow()
            sub.approved_by = admin_user.full_name or "SaqibTax Admin"
        else:
            sub = Subscription(
                user_id=user.id,
                plan_type=receipt.plan_type,
                plan_tier=SubscriptionTier.PRO if receipt.plan_tier.lower() == "pro" else SubscriptionTier.ENTERPRISE,
                amount_pkr=receipt.amount,
                status="Active",
                trx_id=receipt.transaction_id,
                account_holder_name=receipt.sender_name,
                created_at=datetime.utcnow(),
                expires_at=expiry_date,
                approved_at=datetime.utcnow(),
                approved_by=admin_user.full_name or "SaqibTax Admin",
            )
            db.add(sub)

        # Elevate user's tier
        tier_enum = SubscriptionTier.PRO if receipt.plan_tier.lower() == "pro" else SubscriptionTier.ENTERPRISE
        user.subscription_tier = tier_enum
        user.queries_used_today = 0
        if user.role == UserRole.TAXPAYER and tier_enum == SubscriptionTier.ENTERPRISE:
            user.role = UserRole.CORPORATE_CLIENT

        await db.commit()

        return {
            "message": f"Payment successfully Approved! User {user.email} elevated to {tier_enum.value.upper()}.",
            "status": "Approved",
            "payment_id": receipt.id,
            "user_id": user.id,
            "user_email": user.email,
            "new_tier": user.subscription_tier.value,
            "expires_at": expiry_date.isoformat(),
        }

    elif action_clean == "Reject":
        receipt.status = "Rejected"
        receipt.verified_at = datetime.utcnow()
        receipt.verified_by = admin_user.full_name or "SaqibTax Admin"
        receipt.rejection_reason = payload.rejection_reason or "Payment could not be verified on official bank ledger."

        if sub and sub.status == "Pending":
            sub.status = "Rejected"

        await db.commit()

        return {
            "message": f"Payment marked as Rejected. Reason: {receipt.rejection_reason}",
            "status": "Rejected",
            "payment_id": receipt.id,
            "user_id": user.id,
            "user_email": user.email,
            "rejection_reason": receipt.rejection_reason,
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Action must be either 'Approve' or 'Reject'."
        )

# Backward compatible single approve route
@admin_router.post("/approve-subscription/{sub_id}")
async def approve_subscription_legacy(
    sub_id: str,
    admin_user: User = Depends(require_admin_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Subscription).where(Subscription.id == sub_id)
    result = await db.execute(stmt)
    sub = result.scalar_one_or_none()

    if not sub:
        raise HTTPException(status_code=404, detail="Subscription record not found.")

    user_stmt = select(User).where(User.id == sub.user_id)
    user_res = await db.execute(user_stmt)
    user = user_res.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    sub.status = "Active"
    sub.approved_at = datetime.utcnow()
    sub.expires_at = datetime.utcnow() + timedelta(days=30)
    user.subscription_tier = sub.plan_tier

    await db.commit()
    return {
        "message": f"Subscription {sub_id} approved. User {user.email} elevated to {user.subscription_tier.value.upper()}.",
        "subscription_id": sub.id,
        "new_tier": user.subscription_tier.value,
        "status": "Active"
    }

import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from backend.database import init_db
from backend.routes import auth, chat, tax_knowledge, subscription, legal_portal

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables on startup
    await init_db()
    yield

app = FastAPI(
    title="SaqibTax Legal AI API",
    description="Backend API for Pakistani Tax Law Advisory, Legal Compliance, and FBR Notice Assistance",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal legal engine error occurred.", "error": str(exc)},
    )

# Include Routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(tax_knowledge.router)
app.include_router(subscription.router)
app.include_router(subscription.subscription_router)
app.include_router(subscription.admin_router)
app.include_router(legal_portal.router)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SaqibTax Legal AI - FastAPI Backend",
        "tax_framework": "Pakistani Income Tax Ordinance 2001 & Sales Tax Act 1990"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

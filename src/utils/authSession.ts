import { UserProfile, UserRole, SubscriptionTier } from '../types';

export const DEMO_PROFILES: Record<'advocate' | 'corporate' | 'individual', UserProfile> = {
  advocate: {
    id: 'user-demo-1',
    email: 'consultant@saqibtax.pk',
    fullName: 'Saqib Shahbaz (Advocate High Court)',
    role: 'tax_consultant',
    subscriptionTier: 'enterprise',
    queriesUsedToday: 0,
    maxDailyQueries: 9999,
    tokenBalance: 1000000,
    ntnNumber: '4289102-7',
    organization: 'Saqib & Partners Tax Consultants',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  corporate: {
    id: 'user-demo-2',
    email: 'corporate@paktextile.com',
    fullName: 'Tariq Mehmood (CFO)',
    role: 'corporate_client',
    subscriptionTier: 'pro',
    queriesUsedToday: 0,
    maxDailyQueries: 9999,
    tokenBalance: 250000,
    ntnNumber: '0817349-2',
    organization: 'Indus Valley Textiles Ltd',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  individual: {
    id: 'user-demo-3',
    email: 'individual@gmail.com',
    fullName: 'Ali Hassan',
    role: 'taxpayer',
    subscriptionTier: 'free',
    queriesUsedToday: 0,
    maxDailyQueries: 5,
    tokenBalance: 5000,
    ntnNumber: '7193840-1',
    organization: 'Individual Salaried Filer',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
};

export function generateMockToken(user: UserProfile): string {
  const payload = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    tier: user.subscriptionTier,
    ntnNumber: user.ntnNumber,
    organization: user.organization,
    exp: Date.now() + 7 * 24 * 3600 * 1000,
  };
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch {
    return btoa(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 86400000 }));
  }
}

export function saveSession(user: UserProfile, token: string): void {
  try {
    localStorage.setItem('saqibtax_token', token);
    localStorage.setItem('saqibtax_user', JSON.stringify(user));
  } catch (err) {
    console.warn('LocalStorage saveSession warning:', err);
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem('saqibtax_token');
    localStorage.removeItem('saqibtax_user');
  } catch (err) {
    console.warn('LocalStorage clearSession warning:', err);
  }
}

export function loadSession(): { user: UserProfile; token: string } | null {
  try {
    const token = localStorage.getItem('saqibtax_token');
    const userRaw = localStorage.getItem('saqibtax_user');

    if (userRaw) {
      const user = JSON.parse(userRaw) as UserProfile;
      if (user && user.email) {
        const validToken = token || generateMockToken(user);
        return { user, token: validToken };
      }
    }

    if (token) {
      // Decode payload from token
      try {
        const raw = decodeURIComponent(escape(atob(token)));
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email) {
          const role: UserRole = parsed.role || 'tax_consultant';
          const tier: SubscriptionTier = parsed.tier || (role === 'tax_consultant' ? 'enterprise' : role === 'corporate_client' ? 'pro' : 'free');
          const user: UserProfile = {
            id: parsed.userId || `user-${Date.now()}`,
            email: parsed.email,
            fullName: parsed.fullName || (role === 'tax_consultant' ? 'Saqib Shahbaz (Advocate High Court)' : role === 'corporate_client' ? 'Tariq Mehmood (CFO)' : parsed.email.split('@')[0]),
            role,
            subscriptionTier: tier,
            queriesUsedToday: 0,
            maxDailyQueries: tier === 'free' ? 5 : 9999,
            tokenBalance: tier === 'enterprise' ? 1000000 : tier === 'pro' ? 250000 : 5000,
            ntnNumber: parsed.ntnNumber || '4289102-7',
            organization: parsed.organization || 'Saqib & Partners Tax Consultants',
            createdAt: new Date().toISOString(),
          };
          saveSession(user, token);
          return { user, token };
        }
      } catch {
        // Continue to null
      }
    }
  } catch (err) {
    console.warn('LocalStorage loadSession error:', err);
  }
  return null;
}

export function createCustomProfile(
  email: string,
  role?: UserRole,
  fullName?: string,
  ntn?: string,
  org?: string
): { user: UserProfile; token: string } {
  const cleanEmail = (email || 'user@saqibtax.pk').trim().toLowerCase();
  const isConsultant = cleanEmail.includes('consultant') || cleanEmail.includes('saqib') || cleanEmail.includes('advocate') || role === 'tax_consultant';
  const isCorporate = cleanEmail.includes('corp') || cleanEmail.includes('textile') || cleanEmail.includes('company') || role === 'corporate_client';

  const userRole: UserRole = role || (isConsultant ? 'tax_consultant' : isCorporate ? 'corporate_client' : 'taxpayer');
  const userTier: SubscriptionTier = userRole === 'tax_consultant' ? 'enterprise' : userRole === 'corporate_client' ? 'pro' : 'free';
  const name = fullName?.trim() || (isConsultant ? 'Saqib Shahbaz (Advocate High Court)' : isCorporate ? 'Tariq Mehmood (CFO)' : cleanEmail.split('@')[0]);

  const user: UserProfile = {
    id: `user-local-${Date.now()}`,
    email: cleanEmail,
    fullName: name,
    role: userRole,
    subscriptionTier: userTier,
    queriesUsedToday: 0,
    maxDailyQueries: userTier === 'free' ? 5 : 9999,
    tokenBalance: userTier === 'enterprise' ? 1000000 : userTier === 'pro' ? 250000 : 5000,
    ntnNumber: ntn || (isConsultant ? '4289102-7' : isCorporate ? '0817349-2' : '7193840-1'),
    organization: org || (isConsultant ? 'Saqib & Partners Tax Consultants' : isCorporate ? 'Indus Valley Textiles Ltd' : 'Individual Filer'),
    createdAt: new Date().toISOString(),
  };

  const token = generateMockToken(user);
  return { user, token };
}

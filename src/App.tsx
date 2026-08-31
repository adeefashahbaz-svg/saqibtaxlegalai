import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { ChatView } from './components/ChatView';
import { TaxCalculatorView } from './components/TaxCalculatorView';
import { NoticeDrafterView } from './components/NoticeDrafterView';
import { SalesTaxDirectoryView } from './components/SalesTaxDirectoryView';
import { SalesTaxLegalEngineView } from './components/SalesTaxLegalEngineView';
import { DocumentAnalyzerView } from './components/DocumentAnalyzerView';
import { SubscriptionView } from './components/SubscriptionView';
import { AdminPaymentsView } from './components/AdminPaymentsView';
import { CodeArchitectureView } from './components/CodeArchitectureView';
import { LegalPortalSuiteView } from './components/LegalPortalSuiteView';
import { StatutesDashboardView } from './components/StatutesDashboardView';
import { TaxLegislationView } from './components/TaxLegislationView';
import { TaxComplianceSuiteView } from './components/TaxComplianceSuiteView';
import { SalesTaxCalculatorView } from './components/SalesTaxCalculatorView';
import { RealEstatePropertyTaxView } from './components/RealEstatePropertyTaxView';
import { ProvincialServicesTaxView } from './components/ProvincialServicesTaxView';
import { SuperTaxEngineView } from './components/SuperTaxEngineView';
import { EnterpriseB2BView } from './components/EnterpriseB2BView';
import { MasterStatutesIndexView } from './components/MasterStatutesIndexView';
import { LegalDisclaimerFooter } from './components/LegalDisclaimerFooter';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { ClientPrivacyModal } from './components/ClientPrivacyModal';
import { getPrivacySettings, savePrivacySettings } from './utils/cryptoStorage';
import { UserProfile, SubscriptionTier } from './types';


export default function App() {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Privacy & Statutory Notice States
  const [isMasked, setIsMasked] = useState<boolean>(() => getPrivacySettings().screenMaskingEnabled);
  const [legalNoticeOpen, setLegalNoticeOpen] = useState<boolean>(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  const handleToggleMasking = () => {
    const updated = !isMasked;
    setIsMasked(updated);
    const curr = getPrivacySettings();
    savePrivacySettings({ ...curr, screenMaskingEnabled: updated });
  };

  // Verify auth session on load
  useEffect(() => {
    const token = localStorage.getItem('saqibtax_token');
    if (token) {
      fetchUserProfile(token);
    } else {
      // Default demo profile for initial exploration
      setUser({
        id: 'user-demo-1',
        email: 'consultant@saqibtax.pk',
        fullName: 'Saqib Shahbaz (Advocate High Court)',
        role: 'tax_consultant',
        subscriptionTier: 'enterprise',
        queriesUsedToday: 3,
        maxDailyQueries: 9999,
        tokenBalance: 1000000,
        ntnNumber: '4289102-7',
        organization: 'Saqib & Partners Tax Consultants',
        createdAt: new Date().toISOString(),
      });
      // Store default demo token
      const defaultToken = btoa(unescape(encodeURIComponent(JSON.stringify({
        userId: 'user-demo-1',
        email: 'consultant@saqibtax.pk',
        role: 'tax_consultant',
        tier: 'enterprise',
        exp: Date.now() + 24 * 3600 * 1000,
      }))));
      localStorage.setItem('saqibtax_token', defaultToken);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        localStorage.removeItem('saqibtax_token');
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile, token: string) => {
    setUser(authenticatedUser);
    setAuthModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('saqibtax_token');
    setUser(null);
    handleOpenAuth('signin');
  };

  const handleUpdateTier = (newTier: SubscriptionTier) => {
    if (user) {
      setUser({
        ...user,
        subscriptionTier: newTier,
        maxDailyQueries: newTier === 'free' ? 5 : 9999,
      });
    }
  };

  const isPortalTab = activeTab.startsWith('portal-');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans antialiased text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onOpenTierModal={() => setActiveTab('pricing')}
        isMasked={isMasked}
        onToggleMasking={handleToggleMasking}
        onOpenPrivacyManager={() => setPrivacyModalOpen(true)}
        onOpenLegalNotice={() => setLegalNoticeOpen(true)}
      />

      {/* Main Layout with Persistent Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Persistent Desktop Sidebar */}
        <div className="hidden lg:flex flex-col">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
            }}
            onOpenPricing={() => setActiveTab('pricing')}
            className="h-[calc(100vh-4rem)] sticky top-16"
          />
        </div>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-900 flex flex-col justify-between">
          <div>
            {activeTab === 'tax-legislation' && (
              <TaxLegislationView
                onNavigateToChat={(initialPrompt) => {
                  setActiveTab('chat');
                }}
              />
            )}

            {(activeTab === 'master-statutes-index' ||
              activeTab === 'statutes-indirect' ||
              activeTab === 'statutes-sector-levies' ||
              activeTab === 'statutes-taxpayer-oversight' ||
              activeTab === 'statutes-financial-integrity' ||
              activeTab === 'statutes-foreign-exchange') && (
              <MasterStatutesIndexView
                initialCategoryId={
                  activeTab === 'statutes-indirect'
                    ? 'indirect_tax'
                    : activeTab === 'statutes-sector-levies'
                    ? 'sector_levies'
                    : activeTab === 'statutes-taxpayer-oversight'
                    ? 'taxpayer_oversight'
                    : activeTab === 'statutes-financial-integrity'
                    ? 'financial_integrity'
                    : activeTab === 'statutes-foreign-exchange'
                    ? 'foreign_exchange'
                    : 'all'
                }
                onNavigateToChat={(initialPrompt) => {
                  setActiveTab('chat');
                }}
                onOpenPricing={() => setActiveTab('pricing')}
                onOpenNoticeDrafter={(section) => setActiveTab('notice')}
              />
            )}

            {activeTab === 'statutes-dashboard' && (
              <StatutesDashboardView
                onNavigateToChat={(initialPrompt) => {
                  setActiveTab('chat');
                }}
                onOpenPricing={() => setActiveTab('pricing')}
                onOpenNoticeDrafter={(section) => setActiveTab('notice')}
              />
            )}

            {activeTab === 'enterprise-b2b' && (
              <EnterpriseB2BView
                user={user}
                onOpenPricing={() => setActiveTab('pricing')}
                onNavigateToChat={(initialPrompt) => {
                  setActiveTab('chat');
                }}
                isMasked={isMasked}
                onToggleMasking={handleToggleMasking}
                onOpenPrivacyManager={() => setPrivacyModalOpen(true)}
                onOpenLegalNotice={() => setLegalNoticeOpen(true)}
              />
            )}

          {activeTab === 'chat' && (

            <ChatView
              user={user}
              onOpenAuth={handleOpenAuth}
              onOpenTierModal={() => setActiveTab('pricing')}
              onNavigateToCalculator={() => setActiveTab('calculator')}
              onNavigateToNoticeDrafter={(section) => setActiveTab('notice')}
            />
          )}

          {isPortalTab && (
            <LegalPortalSuiteView
              activeModule={activeTab}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
              onOpenPricing={() => setActiveTab('pricing')}
            />
          )}

          {(activeTab === 'sales-tax-calculator' || activeTab === 'sales-tax-suite') && (
            <SalesTaxCalculatorView
              user={user}
              onOpenPricing={() => setActiveTab('pricing')}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
            />
          )}

          {(activeTab === 'super-tax' || activeTab === 'super-tax-engine' || activeTab === 'wht-rate-finder') && (
            <SuperTaxEngineView
              user={user}
              onOpenPricing={() => setActiveTab('pricing')}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'property-tax' && (
            <RealEstatePropertyTaxView
              user={user}
              onOpenPricing={() => setActiveTab('pricing')}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'provincial-tax' && (
            <ProvincialServicesTaxView
              user={user}
              onOpenPricing={() => setActiveTab('pricing')}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'sales-tax-engine' && (
            <SalesTaxLegalEngineView
              user={user}
              onOpenTierModal={() => setActiveTab('pricing')}
              onNavigateToNoticeDrafter={(section) => setActiveTab('notice')}
            />
          )}

          {activeTab === 'tax-compliance-suite' && (
            <TaxComplianceSuiteView
              user={user}
              onOpenPricing={() => setActiveTab('pricing')}
              onNavigateToChat={(initialPrompt) => {
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'calculator' && (
            <TaxCalculatorView
              user={user}
              onOpenTierModal={() => setActiveTab('pricing')}
            />
          )}

          {activeTab === 'notice' && (
            <NoticeDrafterView
              user={user}
              onOpenAuth={handleOpenAuth}
              onOpenTierModal={() => setActiveTab('pricing')}
            />
          )}

          {activeTab === 'directory' && (
            <SalesTaxDirectoryView />
          )}

          {activeTab === 'analyzer' && (
            <DocumentAnalyzerView
              user={user}
              onOpenAuth={handleOpenAuth}
              onOpenTierModal={() => setActiveTab('pricing')}
            />
          )}

          {activeTab === 'pricing' && (
            <SubscriptionView
              user={user}
              onOpenAuth={handleOpenAuth}
              onUpdateTier={handleUpdateTier}
            />
          )}

          {activeTab === 'admin-payments' && (
            <AdminPaymentsView
              user={user}
              onOpenAuth={handleOpenAuth}
              onRefreshUserProfile={() => {
                const token = localStorage.getItem('saqibtax_token');
                if (token) fetchUserProfile(token);
              }}
            />
          )}

          {activeTab === 'architecture' && (
            <CodeArchitectureView />
          )}
          </div>

          {/* Global Statutory Disclaimer & Privacy Footer */}
          <LegalDisclaimerFooter
            onOpenLegalNotice={() => setLegalNoticeOpen(true)}
            onOpenPrivacyManager={() => setPrivacyModalOpen(true)}
            isMasked={isMasked}
            onToggleMasking={handleToggleMasking}
          />
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Statutory Legal Disclaimer Modal */}
      <LegalNoticeModal
        isOpen={legalNoticeOpen}
        onClose={() => setLegalNoticeOpen(false)}
      />

      {/* LocalStorage & Client Privacy Manager Modal */}
      <ClientPrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        isMasked={isMasked}
        onToggleMasking={handleToggleMasking}
      />

    </div>
  );
}

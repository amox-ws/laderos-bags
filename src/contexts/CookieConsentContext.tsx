import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentState = 'pending' | 'accepted' | 'declined';

interface CookieConsentContextType {
  consent: ConsentState;
  hasConsented: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
}

const STORAGE_KEY = 'laderos_cookie_consent';

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted' || stored === 'declined') return stored;
    } catch {}
    return 'pending';
  });

  const acceptCookies = () => {
    setConsent('accepted');
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
  };

  const declineCookies = () => {
    setConsent('declined');
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch {}
  };

  return (
    <CookieConsentContext.Provider value={{ consent, hasConsented: consent === 'accepted', acceptCookies, declineCookies }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
};

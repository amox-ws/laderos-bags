
# Cookie Consent Banner Implementation

## Why This Is Needed
The website embeds Google Maps iframes in two places (Home page and Contact page). Google Maps sets third-party cookies (NID, CONSENT, etc.) for tracking and preferences. Under GDPR, these require explicit user consent before loading.

## What Will Be Built

### 1. Cookie Consent Context
A React context (`CookieConsentContext`) that manages consent state:
- Checks `localStorage` for previously saved consent
- Provides `hasConsented`, `acceptCookies()`, and `declineCookies()` to all components
- Persists the user's choice in `localStorage`

### 2. Cookie Consent Banner
A bottom-of-screen banner that appears on first visit:
- Bilingual text (Greek/English) explaining that the site uses third-party cookies (Google Maps)
- "Accept" and "Decline" buttons
- Disappears once the user makes a choice
- Does not reappear on subsequent visits

### 3. Conditional Google Maps Loading
Update both Google Maps embed locations:
- `src/components/home/WhereToFindUsSection.tsx`
- `src/pages/ContactPage.tsx`

If cookies are declined or no choice made yet, show a placeholder with a message like "Accept cookies to view the map" and a button to accept. If cookies are accepted, load the iframe normally.

### 4. Update Privacy Policy
Update the Cookies section (Section 8) in `src/pages/PrivacyPolicyPage.tsx` to:
- Mention Google Maps as a third-party service that sets cookies
- Add a link to Formspree's privacy policy in the Third Parties section

## Files to Create/Modify
- **New**: `src/contexts/CookieConsentContext.tsx` -- consent state management
- **New**: `src/components/CookieConsentBanner.tsx` -- the banner UI
- **Modify**: `src/components/layout/Layout.tsx` -- wrap with CookieConsentProvider, include banner
- **Modify**: `src/components/home/WhereToFindUsSection.tsx` -- conditional map loading
- **Modify**: `src/pages/ContactPage.tsx` -- conditional map loading
- **Modify**: `src/pages/PrivacyPolicyPage.tsx` -- update cookies and third-party sections

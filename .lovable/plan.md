
# Scroll to Top on Navigation

## Overview
When you click a button or link to navigate to a new page, the page will automatically scroll to the top. This improves user experience by ensuring visitors always see the beginning of each page.

## What Will Be Done

### Create a ScrollToTop Component
A new component will be created that:
- Listens for route changes using React Router's `useLocation` hook
- Automatically scrolls the window to the top (0, 0) whenever the route changes
- Works instantly without any visible delay

### Integrate with the App
The component will be placed inside the `BrowserRouter` in `App.tsx` so it can detect all navigation events across the entire website.

## Files to Change

| File | Change |
|------|--------|
| `src/components/ScrollToTop.tsx` | New file - the scroll-to-top utility component |
| `src/App.tsx` | Add the ScrollToTop component inside BrowserRouter |

## Technical Details

```text
+------------------+
|   BrowserRouter  |
|   +-----------+  |
|   |ScrollToTop|  | <-- Listens to location changes
|   +-----------+  |
|   |  Routes   |  |
|   +-----------+  |
+------------------+
```

The ScrollToTop component will use:
- `useLocation()` from react-router-dom to detect route changes
- `useEffect()` to trigger scroll when location changes
- `window.scrollTo(0, 0)` to scroll to the top of the page

This is a standard React Router pattern that works reliably across all pages and navigation methods (links, buttons, browser back/forward).

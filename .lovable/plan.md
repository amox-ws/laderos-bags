

# Remove Title and Divider from Carousel on Products Page

## What Changes

The "Who Trusts Us" carousel section on the Products page currently shows a heading and a blue divider line above the logo carousels. You want just the carousel logos displayed cleanly, without the title or line, and properly centered.

Since this carousel component is reused on other pages (Home, About) where the title should remain, we will add an option to hide it.

## Technical Details

### 1. Update `src/components/home/TrustedBySection.tsx`
- Add a `showTitle` prop (defaults to `true` so other pages are unaffected)
- When `showTitle` is `false`, skip rendering the heading and blue divider line
- Reduce top padding slightly when no title is shown for tighter spacing

### 2. Update `src/pages/ProductsPage.tsx`
- Pass `showTitle={false}` to the `TrustedBySection` component on the Products page
- This removes the title and blue line, leaving only the centered carousel

No layout, typography, or animation changes.


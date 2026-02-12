

# Optimize Heavy Gallery Images on Product Pages

## The Problem
The plastic bags page loads **15 PNG images totaling ~12-13MB**. Each image is 700KB-930KB. The paper bags page likely has a similar issue with its 16+ images. PNG is not ideal for photographic content -- it's designed for graphics with sharp edges and transparency.

## Solutions (from easiest to most impactful)

### Option A: Convert PNGs to WebP (Recommended -- Best Balance)
Manually convert all product images from PNG to WebP format using an online tool like [squoosh.app](https://squoosh.app) or [cloudconvert.com](https://cloudconvert.com). WebP typically achieves **70-80% smaller file sizes** than PNG for photos with no visible quality loss.

- A 900KB PNG becomes roughly 150-200KB WebP
- Total page weight drops from ~13MB to ~2-3MB
- You would re-upload the converted images and update the file references in the code

**What changes in code:**
- Update all image paths in `PlasticBagsPage.tsx` from `.PNG` to `.webp`
- Update all image paths in `PaperBagsPage.tsx` from `.PNG` to `.webp`

### Option B: Add Progressive Loading (Can Combine with Option A)
Show a low-quality placeholder or skeleton while images load, so the page feels faster even before images finish downloading.

**What changes in code:**
- Create a `LazyImage` component that shows a blurred placeholder or skeleton while loading
- Replace `<img>` in `GalleryImage` with this new component
- Uses the browser's native `loading="lazy"` (already in place) plus a visual loading state

### Option C: Responsive Images with srcSet (Advanced)
Serve different image sizes based on the user's screen. A mobile user doesn't need a 1920px-wide image.

**What changes in code:**
- Requires creating multiple sizes of each image (small, medium, large)
- Use `<img srcSet>` to let the browser pick the right size
- Most impactful for mobile performance

## Recommended Approach
**Option A + Option B together:**
1. You convert the images to WebP outside of Lovable and re-upload them
2. I update the file paths in the code and add a skeleton/placeholder loading component

This gives the biggest performance improvement with the least complexity.

## Technical Changes

### 1. New Component: `src/components/ui/LazyImage.tsx`
A wrapper that displays a skeleton placeholder until the image has loaded, preventing layout shifts and giving visual feedback.

### 2. Update `src/pages/PlasticBagsPage.tsx`
- Change all 15 image paths from `.PNG` to `.webp` (after you upload the converted files)
- Use `LazyImage` inside `GalleryImage` instead of raw `<img>`

### 3. Update `src/pages/PaperBagsPage.tsx`
- Same changes as above for the paper bag images

### 4. Update `src/components/home/ProductCarousel.tsx`
- Use `LazyImage` for carousel images too (the `/product_bags/` images)


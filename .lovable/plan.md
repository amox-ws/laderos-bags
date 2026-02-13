

# Fix Mobile Visibility Issues

## Problem
Sections disappear on mobile because animations start elements far off-screen (300px horizontally), and `overflow: hidden` on parent containers clips them before they can trigger the viewport intersection. Tilting the phone forces a re-layout that fixes it temporarily.

## Solution
Reduce horizontal slide distances on mobile, relax viewport margins, and fix the mobile viewport height issue. No visual changes on desktop.

---

## Changes

### 1. AnimatedSection component (`src/components/ui/AnimatedSection.tsx`)
- Change viewport margin from `"-100px"` to `"-50px"` so animations trigger earlier on small screens

### 2. Home page (`src/pages/HomePage.tsx`)
- Product carousels: reduce `x: -300` / `x: 300` to `x: -80` / `x: 80` on mobile (use responsive initial values or simply reduce globally to a moderate value like `x: -100` / `x: 100` that works on both)
- Change viewport margin from `"-100px"` to `"-50px"` on all `whileInView` elements
- Replace `-mt-[100vh]` with `-mt-[100dvh]` (dynamic viewport height, accounts for mobile browser address bar)
- CTA section: reduce `y: 200` to `y: 80`

### 3. About page (`src/pages/AboutPage.tsx`)
- "Who We Are" section: reduce `x: -300` / `x: 300` to `x: -100` / `x: 100`
- Change all viewport margins from `"-100px"` to `"-50px"`
- Replace `-mt-[100vh]` with `-mt-[100dvh]`
- Hero section: change `h-screen` to `h-[100dvh]` for proper mobile height
- CTA section: reduce `y: 200` to `y: 80`

### 4. About Preview section (`src/components/home/AboutPreviewSection.tsx`)
- Reduce `x: -300` / `x: 300` to `x: -100` / `x: 100`
- Change viewport margin from `"-100px"` to `"-50px"`

### 5. Products section (`src/components/home/ProductsSection.tsx`)
- Reduce `x: -300` / `x: 300` to `x: -100` / `x: 100`
- Change viewport margin from `"-100px"` to `"-50px"`

## What stays the same
- All desktop visual appearance remains identical (the reduced values still create a nice slide effect)
- No typography, color, or layout changes
- All animations still work, just with smaller, mobile-safe distances


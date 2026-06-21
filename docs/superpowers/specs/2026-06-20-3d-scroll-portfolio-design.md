# 3D Scroll Portfolio — Design Spec
**Date:** 2026-06-20
**Branch:** `feat/3d-portfolio`
**Status:** Approved — ready for implementation planning

---

## Overview

A complete rebuild of the portfolio on a separate branch, replacing the current layout with a scroll-driven 3D experience. A stylized Mixamo character (AJ) animates on the left side of the screen while the user scrolls through portfolio sections on the right. The branch stays isolated until the owner decides to merge into `main`.

---

## Layout

### Desktop (≥ 768px)
- **Left panel — 40% width, sticky, full viewport height:** Three.js canvas rendering AJ. Panel stays fixed as the right side scrolls.
- **Right panel — 60% width, scrollable:** All portfolio sections stacked vertically. Standard scroll behavior.
- **Navbar:** Full-width across the top, same dark glass styling as current site.

```
┌─────────────────────────────────────────────────┐
│            Navbar (full width)                  │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│  3D Canvas       │   Hero                       │
│  (sticky, 40%)   │   About                      │
│                  │   Skills                     │
│  AJ animates     │   Experience                 │
│  per section     │   Education                  │
│                  │   Publications               │
│                  │   Projects                   │
│                  │   Contact                    │
└──────────────────┴──────────────────────────────┘
```

### Mobile (< 768px)
- Character panel collapses to **top 35vh**, fixed.
- Sections scroll below it in a single column.
- AJ still animates per section — same logic, different layout.

---

## 3D Scene

### Character
- **Model:** AJ from Mixamo, loaded via `useFBX` from `@react-three/drei`
- **Format:** FBX files served directly (no GLB conversion needed)
- **Asset location:** `public/models/` (moved from `3DAssets/` at repo root)

### Camera
- Fixed position — no orbit controls exposed to the user
- AJ fills ~70% of the left panel height
- Subtle idle rotation: AJ slowly rotates ±15° on Y-axis to convey 3D depth even during idle

### Lighting
| Light | Type | Purpose |
|---|---|---|
| Ambient | Soft, low intensity | Fill shadows |
| Directional key | Upper-left | Shape and drama |
| Rim light | Cyan (`#38bdf8`), behind-right | Ties AJ to site accent color |

- Canvas background: **transparent** — page background shows through
- AJ casts a soft circular shadow disc on the floor plane to ground him

### Performance
- `<Suspense>` wraps the canvas with a skeleton placeholder while FBX loads
- `prefers-reduced-motion`: character freezes on current pose, no rotation
- Low-power device detection: pause animation loop on visibility change

---

## Animation System

### Approach
Each section has a dedicated FBX file containing AJ + one animation (downloaded from Mixamo "With Skin"). The correct FBX is loaded for the active section. When the section changes, `AnimationMixer.crossFadeTo()` blends from the current animation to the next over **0.5 seconds**.

### Section → Animation Mapping

| Section | FBX File | Status |
|---|---|---|
| Hero | `Standing Idle.fbx` | ✅ Ready |
| About | `Waving.fbx` | ✅ Ready |
| Skills | `Arm Stretching.fbx` | ✅ Ready |
| Experience | `Typing.fbx` | ✅ Ready |
| Education | `Searching Files High.fbx` | ✅ Ready |
| Publications | `Pointing.fbx` | ⚠️ **Missing — needs download from Mixamo** |
| Projects | `Hip Hop Dancing.fbx` | ✅ Ready |
| Contact | `Wave Hip Hop Dance.fbx` | ✅ Ready |

### Section Detection
- `IntersectionObserver` watches each section element in the right panel
- When a section crosses 40% into the viewport, it becomes "active"
- Active section triggers animation swap on the 3D canvas
- Hook: `useScrollSection` — returns `activeSection: string`

---

## Technical Stack

### New Dependencies
```
three
@react-three/fiber
@react-three/drei
@types/three
```

### Reused from Current Codebase
- `src/data/` — all project/experience/education data
- `src/utils/` — scroll helpers, lenis store
- `src/styles/globals.css` — Tailwind config, CSS variables, light/dark theme
- `src/hooks/useTheme.ts` — light/dark toggle

### New Files
```
src/
  components/
    3d/
      Scene.tsx          # Canvas setup, lighting, camera, Suspense boundary
      Character.tsx      # FBX loader, AnimationMixer, crossfade logic
      FloorShadow.tsx    # Soft circular shadow disc under AJ
  hooks/
    useScrollSection.ts  # IntersectionObserver → active section string
  pages/
    Portfolio3D.tsx      # Root layout: sticky left panel + scrollable right panel
```

### Asset Location
Move all FBX files from `3DAssets/` (repo root) to `public/models/` so Vite serves them:
```
public/
  models/
    Standing Idle.fbx
    Waving.fbx
    Arm Stretching.fbx
    Typing.fbx
    Searching Files High.fbx
    Pointing.fbx          ← needs to be added
    Hip Hop Dancing.fbx
    Wave Hip Hop Dance.fbx
```

---

## Visual Integration

- Section content (right panel) reuses existing `SectionHeading`, `TiltCard`, and glass card components
- Card styling unchanged — same dark glass aesthetic, same Tailwind classes
- Light/dark mode toggle carried over — both modes supported
- Navbar identical to current site

---

## Branch Strategy

- Work happens entirely on `feat/3d-portfolio`
- `main` is untouched until the owner decides to merge
- No changes to any existing files on `main`
- Can be previewed locally with `npm run dev` on the feature branch

---

## Out of Scope

- Scroll-scrubbing (frame-by-frame animation tied to exact scroll position) — can be added later as an upgrade
- Custom 3D model (non-Mixamo) — future enhancement
- Spline integration — not needed
- GSAP ScrollTrigger — not needed for this implementation (IntersectionObserver is sufficient)

---

## Open Items

1. **Pointing.fbx** — needs to be downloaded from Mixamo (Animations tab → search "Pointing" → apply to AJ → download With Skin → FBX Binary)
2. **File names with spaces** — FBX filenames have spaces (e.g. `Searching Files High.fbx`). These work fine in `public/` but will need URL encoding in code. Rename all files to kebab-case during the move to `public/models/` (e.g. `standing-idle.fbx`, `hip-hop-dancing.fbx`).
3. **"With Skin" verification** — each animation FBX must contain AJ's mesh, not just bone data. Check by opening one file in Blender or checking file size (with skin = 2–6MB, bone-only = under 200KB). If they are bone-only, the implementation changes: load `Aj.fbx` as the persistent base mesh and apply animation clips on top of it rather than swapping whole FBX files per section.

# 3D source assets

Original [Mixamo](https://www.mixamo.com/) FBX files for the portfolio's scroll
character (**AJ**). These are **source / build inputs** — they are NOT served by
the site. The site loads a single optimized model: `public/models/character.glb`
(~2 MB), which bundles one shared mesh + skeleton with all 8 animations as named
clips.

Kept here so the served GLB can be regenerated or extended (e.g. adding a new
section animation) in the future.

## Files → section / animation clip

| FBX | Clip name | Section |
|-----|-----------|---------|
| `Aj.fbx` | — | base character mesh + skeleton (no animation) |
| `Standing Idle.fbx` | `hero` | Hero |
| `Waving.fbx` | `about` | About |
| `Arm Stretching.fbx` | `skills` | Skills |
| `Typing.fbx` | `experience` | Experience |
| `Searching Files High.fbx` | `education` | Education |
| `Pointing.fbx` | `publications` | Publications |
| `Hip Hop Dancing.fbx` | `projects` | Projects |
| `Wave Hip Hop Dance.fbx` | `contact` | Contact |

## Regenerating `character.glb`

The build is not wired into npm scripts (it's a one-off). In short:

1. Convert each FBX → GLB with **FBX2glTF** (`npm i --no-save fbx2gltf`).
2. With **gltf-transform**, keep `Standing Idle` as the base mesh, then copy each
   other file's animation channels onto that base skeleton **matched by bone
   name** — this is what avoids shipping 8 duplicate meshes.
3. Compress textures to WebP (1024px) and `dedup()` / `prune()`.
4. **Face fix:** FBX2glTF drops the eye/brow/mouth decal textures (FBX
   "TransparentColor" channel) and sets that material to `baseColorFactor` alpha
   `0` → blank face. After the transforms, force the `Boy01_FacialAnimMap`
   material to `baseColorFactor [1,1,1,1]`, `alphaMode BLEND`, `doubleSided`.

Runtime: `src/components/3d/Character.tsx` (`useGLTF` + `useAnimations`,
crossfaded with `fadeIn`/`fadeOut`).

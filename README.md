# charanbandi.github.io

Personal portfolio site. React + TypeScript + Tailwind CSS + Vite.

## First-time setup

Make sure you have [Node.js](https://nodejs.org/) installed (v18+), then:

```
npm install
```

That's it. This pulls in all the dependencies.

## Run locally

```
npm run dev
```

Opens at `http://localhost:5173`. Hot-reloads as you edit.

### Stop the server

In the terminal where it's running, press **`Ctrl + C`**.

If it got orphaned in the background (e.g. the terminal was closed) and port 5173 is still taken, free the port with:

```
lsof -ti:5173 | xargs kill
```

The same works for the production preview server (`npm run preview`), which uses port `4173`:

```
lsof -ti:4173 | xargs kill
```

## Deploy

Just push to `main`. GitHub Actions automatically builds and deploys the site.

```
git add .
git commit -m "your message"
git push
```

**One-time GitHub setup:** in your repo's Settings > Pages, change the Source from "Deploy from a branch" to **"GitHub Actions"**.

## Just build (without deploying)

```
npm run build
```

Output goes to `dist/`. You can preview the production build locally with:

```
npm run preview
```

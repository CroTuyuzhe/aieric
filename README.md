# AI Eric — Portfolio

A minimal, Apple-inspired personal portfolio built with React, Tailwind CSS, and Vite.

Live at: [aieric.hicodesign.com](https://aieric.hicodesign.com)

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── DarkVeilBackground.jsx  # Animated gradient canvas background
│   ├── Navbar.jsx              # Frosted glass navigation bar
│   ├── Hero.jsx                # Landing hero section
│   ├── Works.jsx               # Project showcase cards
│   ├── About.jsx               # Bio + Bento Grid tech stack
│   ├── Blog.jsx                # Blog post list
│   └── Footer.jsx              # Site footer
├── App.jsx                     # Root component
├── main.jsx                    # Entry point
└── index.css                   # Global styles + Tailwind theme
```

## How to Modify Content

### Edit Projects (Works Section)

Open `src/components/Works.jsx` and edit the `projects` array:

```js
const projects = [
  {
    name: 'Project Name',
    description: 'A short description.',
    tags: ['Tag1', 'Tag2'],
    github: 'https://github.com/...',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
  },
]
```

### Add Blog Posts

Open `src/components/Blog.jsx` and add entries to the `posts` array:

```js
const posts = [
  {
    title: 'Your Post Title',
    date: '2026-05-01',
    summary: 'A brief summary of the post.',
    tags: ['Topic'],
  },
]
```

### Update About Section

Edit `src/components/About.jsx` — modify the text paragraphs and the `techStack` array.

## Deployment

The site auto-deploys via GitHub Actions on every push to `main`. The workflow builds with Vite and deploys to GitHub Pages.

### Custom Domain Setup

1. The `public/CNAME` file is already configured with `aieric.hicodesign.com`.
2. In your DNS provider, add a CNAME record pointing `aieric.hicodesign.com` to `CroTuyuzhe.github.io`.
3. In the GitHub repo Settings > Pages, ensure the custom domain is set.

## Tech Stack

- **React** — UI components
- **Tailwind CSS v4** — Utility-first styling
- **Vite** — Build tool
- **Framer Motion** — Animations
- **GitHub Pages** — Hosting

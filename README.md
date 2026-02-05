# Keenan Jusak - Portfolio

A premium, modern portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Clean, Apple-esque design with glassmorphism effects
- ✨ Smooth animations powered by Framer Motion
- 📱 Fully responsive (mobile and desktop)
- 🎯 Interactive floating navigation with sliding indicator
- 🚀 Built with Vite for fast development

## Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Animated floating navigation
│   ├── Section.jsx       # Reusable section wrapper
│   ├── Profile.jsx       # Hero/About section
│   ├── Education.jsx     # Education timeline
│   ├── Projects.jsx      # Project cards
│   ├── Skills.jsx        # Skills categories
│   └── Leadership.jsx    # Leadership experience
├── App.jsx               # Main application
├── main.jsx             # Entry point
└── index.css            # Global styles

```

## Customization

### Update Personal Information

Edit the content in each component file:
- **Profile.jsx** - Name, title, links
- **Education.jsx** - Schools and activities
- **Projects.jsx** - Project details and GitHub links
- **Skills.jsx** - Skill categories
- **Leadership.jsx** - Leadership roles

### Change Colors

Edit [tailwind.config.js](tailwind.config.js) to customize the color scheme.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

## License

MIT

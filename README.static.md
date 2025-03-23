# Static Portfolio Site

This is a static site version of the portfolio, converted from the original Remix/Cloudflare version. It uses React with Vite for a fully client-side implementation with no server dependencies.

## Key Changes

1. **Removed Server Dependencies**
   - Removed Remix and Cloudflare-specific code
   - Replaced server-side theme storage with localStorage
   - Converted contact form to use client-side submission

2. **Added Static Site Structure**
   - Created standard Vite + React entry points
   - Set up React Router for client-side routing
   - Configured path aliases to maintain the same import structure

3. **Maintained Visual Design**
   - All components, styles, and assets remain the same
   - Theme switching works identically (just stored differently)
   - Contact form has the same appearance and validation

## How to Run

### Development

```bash
npm install
npm run dev
```

This will start a development server at http://localhost:7777

### Build for Production

```bash
npm run build
```

This will create a `dist` directory with the static site files.

### Preview Production Build

```bash
npm run preview
```

## Deployment

The static site can be deployed to any static hosting service:

1. **GitHub Pages**: Use the gh-pages package or GitHub Actions
2. **Netlify**: Connect your repository or drag-and-drop the `dist` folder
3. **Vercel**: Connect your repository for automatic deployments
4. **Any Static Host**: Upload the contents of the `dist` directory

## File Structure

- `src/main.jsx`: Main entry point for the React application
- `src/App.jsx`: Main component with routing and layout
- `src/components/`: Client-side versions of components that needed changes
- `app/`: Original components and assets (mostly unchanged)

## Notes

- The contact form now submits directly to Formspree.io from the client side
- Theme preferences are stored in localStorage instead of cookies
- All routes are handled client-side with React Router
- MDX content is processed at build time instead of runtime
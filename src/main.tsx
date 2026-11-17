// OWNER: Claude (bootstrapping). Production pages arrive prerendered (scripts/prerender.mjs),
// so React hydrates the existing HTML. In `vite dev` the root is empty, so it renders from scratch.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import { routes } from './routes';

const router = createBrowserRouter(routes);
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
const root = document.getElementById('root')!;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

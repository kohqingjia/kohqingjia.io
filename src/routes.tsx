// OWNER: Claude. Route table shared by the browser (main.tsx) and the build-time renderer (entry-server.tsx).
import type { RouteObject } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import ProjectPage from './pages/Project';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

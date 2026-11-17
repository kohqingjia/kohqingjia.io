// OWNER: Claude. Build-time renderer used by scripts/prerender.mjs (never shipped to browsers).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routes } from './routes';

export { allProjects } from './lib/projects';
export { site } from './data/site';

const handler = createStaticHandler(routes);

export async function render(path: string) {
  const context = await handler.query(new Request(`https://kohqingjia.io${path}`));
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${path}`);
  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  );
}

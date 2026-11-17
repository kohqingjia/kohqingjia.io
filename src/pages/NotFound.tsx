// OWNER: Codex (visual).
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60svh] w-[min(100%-2rem,40rem)] flex-col items-center justify-center gap-3 text-center">
      <p className="font-mono text-sm text-slate-500">404</p>
      <h1 className="text-3xl font-medium">No page lives here</h1>
      <p><Link to="/projects" className="text-accent">See every project</Link> or <Link to="/" className="text-accent">go home</Link>.</p>
    </section>
  );
}

import { Link } from 'react-router';
import Sprite from '../components/Sprite';
export default function NotFound() {
  return (
    <section className="not-found page-width">
      <Sprite slug="not-found" file="placeholder.svg" size={128} eager />
      <p className="eyebrow">404</p>
      <h1>No page lives here</h1>
      <div>
        <Link className="button button--primary" to="/projects">
          See every project<span aria-hidden="true">↗</span>
        </Link>
        <Link className="button" to="/">
          Go home
        </Link>
      </div>
    </section>
  );
}

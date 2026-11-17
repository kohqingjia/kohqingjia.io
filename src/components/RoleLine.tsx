import { useEffect, useState } from 'react';
import { site } from '../data/site';
export default function RoleLine() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timers: number[] = [];
    const start = () => {
      timers.forEach(window.clearTimeout);
      setIndex(0);
      // Introduce each role once; no repeating typewriter or blinking cursor.
      timers = preference.matches
        ? []
        : site.roles
            .slice(1)
            .map((_, i) =>
              window.setTimeout(() => setIndex(i + 1), (i + 1) * 2400),
            );
    };
    start();
    preference.addEventListener('change', start);
    return () => {
      timers.forEach(window.clearTimeout);
      preference.removeEventListener('change', start);
    };
  }, []);
  return (
    <div className="role-line">
      <span className="sr-only">{site.roles.join(', ')}</span>
      <span aria-hidden="true" className="role-line__prompt">
        &gt;
      </span>
      <span aria-hidden="true" className="role-line__word">
        <span className="role-line__entry" key={index}>
          {site.roles[index]}
        </span>
      </span>
    </div>
  );
}

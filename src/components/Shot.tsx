import type { Shot as ShotData } from '../data/types';
export default function Shot({
  shot,
  eager = false,
}: {
  shot: ShotData;
  eager?: boolean;
}) {
  return (
    <figure
      className="shot"
      data-shot
      data-orientation={shot.height > shot.width ? 'portrait' : 'landscape'}
    >
      <a
        className="shot__frame"
        href={shot.src}
        aria-label={`Open full-size image: ${shot.alt}`}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </a>
      {shot.caption && (
        <figcaption className="shot__caption">{shot.caption}</figcaption>
      )}
    </figure>
  );
}

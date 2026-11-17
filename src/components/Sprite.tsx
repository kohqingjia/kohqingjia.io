import type { CSSProperties } from 'react';
export default function Sprite({
  slug,
  file,
  size = 64,
  eager = false,
}: {
  slug: string;
  file?: string;
  size?: 64 | 128 | 256;
  eager?: boolean;
}) {
  const src = file?.startsWith('/')
    ? file
    : `/sprites/${file || `${slug}.svg`}`;
  return (
    <img
      className={`sprite ${size === 64 ? 'sprite--sm' : 'sprite--lg'}`}
      src={src}
      alt=""
      width={size}
      height={size}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={
        {
          width: size,
          height: size,
          viewTransitionName: `sprite-${slug}`,
        } as CSSProperties
      }
    />
  );
}

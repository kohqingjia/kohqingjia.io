const paths = {
  about: 'M6 1h4v1h2v5h-2v1H6V7H4V2h2zM4 10h8v1h2v4H2v-4h2z',
  experience: 'M5 2h6v3h4v9H1V5h4zM7 4v1h2V4zM3 7v2h4v2h2V9h4V7z',
  projects: 'M2 2h5v2h7v1h1v9H1V3h1zM3 6v6h10V6z',
  skills: 'M10 1h4v2h-3v3h3V3h1v5h-2v2h-3l-5 5H2v-3l5-5V4h1V2h2z',
  contact: 'M1 3h14v10H1zM3 5v1h2v2h2v1h2V8h2V6h2V5h-2v1H9v1H7V6H5V5z',
  arrow: 'M3 3h10v10h-2V7l-7 7-2-2 7-7H3z',
};
export type PixelIconName = keyof typeof paths;
export default function PixelIcon({ name }: { name: PixelIconName }) {
  return (
    <svg
      className="pixel-icon"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
    >
      <path d={paths[name]} fillRule="evenodd" />
    </svg>
  );
}

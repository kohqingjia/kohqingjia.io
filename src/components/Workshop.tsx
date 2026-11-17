export default function Workshop() {
  return (
    <figure
      className="workshop"
      aria-label="Pixel illustration of QJ's workshop, with a laptop, a little plant and two helpful robot buddies"
    >
      <div className="workshop__label">
        <span className="eyebrow">QJ's little workshop</span>
        <span className="workshop__time eyebrow">
          <span className="night-label">After hours</span>
          <span className="day-label">Daylight mode</span>
        </span>
      </div>
      <img
        src="/sprites/workshop.svg"
        width="528"
        height="400"
        alt=""
        fetchPriority="high"
      />
      <figcaption>
        <span className="eyebrow">Ideas in, little things out</span>
        <span aria-hidden="true">[ save → ship ]</span>
      </figcaption>
    </figure>
  );
}

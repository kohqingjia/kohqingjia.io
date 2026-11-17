import './scroll-scene.css';

/** A single background story. The browser's scroll timeline does all the work. */
export default function ScrollScene() {
  return (
    <div className="scroll-scene" aria-hidden="true">
      <div className="scroll-scene__stage">
        <span className="scroll-scene__ground" />
        <img
          className="scroll-scene__card scroll-scene__king"
          src="/sprites/scene-king.svg"
          width="64"
          height="64"
          alt=""
        />
        <img
          className="scroll-scene__card scroll-scene__queen"
          src="/sprites/scene-queen.svg"
          width="64"
          height="64"
          alt=""
        />
        <img
          className="scroll-scene__card scroll-scene__jack"
          src="/sprites/scene-jack.svg"
          width="64"
          height="64"
          alt=""
        />
        <span className="scroll-scene__window" />
        <img
          className="scroll-scene__helper"
          src="/sprites/buddy.svg"
          width="64"
          height="64"
          alt=""
        />
      </div>
      <noscript>
        <style>{'.scroll-scene *{animation:none!important}'}</style>
      </noscript>
    </div>
  );
}

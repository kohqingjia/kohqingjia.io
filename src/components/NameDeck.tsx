const hand = [
  { rank: 'K', suit: 'spade', art: 'king' },
  { rank: 'Q', suit: 'heart', art: 'queen' },
  { rank: 'J', suit: 'club', art: 'jack' },
] as const;

function Suit({ name }: { name: (typeof hand)[number]['suit'] }) {
  const paths = {
    spade:
      'M7 1h2v2h2v2h2v2h2v5h-2v1h-3v-1H9v2h2v1H5v-1h2v-2H6v1H3v-1H1V7h2V5h2V3h2z',
    heart: 'M3 2h3v1h1v1h2V3h1V2h3v1h2v6h-2v2h-2v2H9v2H7v-2H5v-2H3V9H1V3h2z',
    club: 'M6 1h4v1h2v4h-2v1h3v1h2v4h-2v1h-3v-1H9v2h2v1H5v-1h2v-2H6v1H3v-1H1V8h2V7h3V6H4V2h2z',
  };
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}

/** Three court cards for Koh Qing Jia's initials. */
export default function NameDeck() {
  return (
    <figure
      className="name-deck"
      aria-label="K, Q and J playing cards for Koh Qing Jia"
    >
      <div className="name-deck__hand" aria-hidden="true">
        {hand.map(({ rank, suit, art }) => (
          <div className={`playing-card playing-card--${art}`} key={rank}>
            <span className="playing-card__index">
              <span>{rank}</span>
              <Suit name={suit} />
            </span>
            <div className="playing-card__court">
              <img
                src={`/sprites/card-${art}.svg`}
                width="64"
                height="64"
                alt=""
              />
              <span className="playing-card__rule" />
              <img
                src={`/sprites/card-${art}.svg`}
                width="64"
                height="64"
                alt=""
              />
            </div>
            <span className="playing-card__index playing-card__index--bottom">
              <span>{rank}</span>
              <Suit name={suit} />
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function DeckMark() {
  return (
    <span className="deck-mark" aria-hidden="true">
      {hand.map(({ rank }) => (
        <span key={rank}>{rank}</span>
      ))}
    </span>
  );
}

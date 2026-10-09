// Les 3 lignes verticales qui continuent, très discrètes, sur les sections claires
export default function Grid() {
  return (
    <div className="hm-grid" aria-hidden="true">
      <div className="frame">
        {[25, 50, 75].map((x) => (
          <span key={x} style={{ left: `${x}%` }} />
        ))}
      </div>
    </div>
  );
}

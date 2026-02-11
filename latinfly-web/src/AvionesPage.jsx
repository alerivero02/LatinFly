const mockAviones = [
  { id: 1, nombre: "Boeing 737-800", capacidad: 189, tipo: "Narrow-body", alcance: "5,765 km" },
  { id: 2, nombre: "Airbus A320neo", capacidad: 194, tipo: "Narrow-body", alcance: "6,300 km" },
  { id: 3, nombre: "Boeing 787 Dreamliner", capacidad: 296, tipo: "Wide-body", alcance: "14,140 km" },
  { id: 4, nombre: "Airbus A350-900", capacidad: 325, tipo: "Wide-body", alcance: "15,000 km" },
];

export const AvionesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Nuestra Flota</h2>
        <p>Aeronaves modernas para tu comodidad y seguridad</p>
      </div>

      <div className="cards-grid">
        {mockAviones.map((avion) => (
          <div className="plane-card" key={avion.id}>
            <div className="plane-icon">🛩️</div>
            <div className="plane-info">
              <h3>{avion.nombre}</h3>
              <p>{avion.tipo} · Alcance: {avion.alcance}</p>
            </div>
            <div className="plane-capacity">
              <div className="number">{avion.capacidad}</div>
              <div className="label">Asientos</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

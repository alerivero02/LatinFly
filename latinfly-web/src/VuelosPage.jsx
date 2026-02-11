import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data for demo - no backend required
const mockVuelos = [
  {
    idVuelo: 1,
    Pais_Origen: "Buenos Aires",
    Pais_Destino: "Madrid",
    fecha: "2026-03-15",
    HoraSalida: "22:30",
    aerolinea: "LatinFly",
    precio: 850,
    clase: "Directa",
  },
  {
    idVuelo: 2,
    Pais_Origen: "Lima",
    Pais_Destino: "Miami",
    fecha: "2026-03-18",
    HoraSalida: "08:15",
    aerolinea: "LatinFly",
    precio: 620,
    clase: "Directa",
  },
  {
    idVuelo: 3,
    Pais_Origen: "Bogotá",
    Pais_Destino: "New York",
    fecha: "2026-03-20",
    HoraSalida: "14:45",
    aerolinea: "LatinFly",
    precio: 730,
    clase: "1 Escala",
  },
  {
    idVuelo: 4,
    Pais_Origen: "Santiago",
    Pais_Destino: "Roma",
    fecha: "2026-04-02",
    HoraSalida: "21:00",
    aerolinea: "LatinFly",
    precio: 920,
    clase: "Directa",
  },
  {
    idVuelo: 5,
    Pais_Origen: "Ciudad de México",
    Pais_Destino: "París",
    fecha: "2026-04-10",
    HoraSalida: "17:30",
    aerolinea: "LatinFly",
    precio: 880,
    clase: "1 Escala",
  },
  {
    idVuelo: 6,
    Pais_Origen: "Caracas",
    Pais_Destino: "Lisboa",
    fecha: "2026-04-12",
    HoraSalida: "23:45",
    aerolinea: "LatinFly",
    precio: 790,
    clase: "Directa",
  },
];

export const VuelosPage = () => {
  const [filter, setFilter] = useState("");

  const filteredVuelos = mockVuelos.filter(
    (vuelo) =>
      vuelo.Pais_Destino.toLowerCase().includes(filter.toLowerCase()) ||
      vuelo.Pais_Origen.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Vuelos Disponibles</h2>
        <p>Encuentra tu próximo destino entre nuestras rutas internacionales</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon">🌎</div>
          <div className="stat-value">12</div>
          <div className="stat-label">Destinos</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✈️</div>
          <div className="stat-value">{mockVuelos.length}</div>
          <div className="stat-label">Vuelos activos</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💺</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Clases</div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por ciudad de origen o destino..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="cards-grid">
        {filteredVuelos.map((vuelo) => (
          <div className="flight-card" key={vuelo.idVuelo}>
            <div className="flight-card-header">
              <div className="flight-route">
                <span>{vuelo.Pais_Origen}</span>
                <span className="arrow">→</span>
                <span>{vuelo.Pais_Destino}</span>
              </div>
              <span className="flight-tag">{vuelo.clase}</span>
            </div>

            <div className="flight-details">
              <div className="flight-detail">
                <span className="label">Fecha</span>
                <span className="value">
                  {new Date(vuelo.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flight-detail">
                <span className="label">Hora de salida</span>
                <span className="value">{vuelo.HoraSalida} hs</span>
              </div>
              <div className="flight-detail">
                <span className="label">Aerolínea</span>
                <span className="value">{vuelo.aerolinea}</span>
              </div>
              <div className="flight-detail">
                <span className="label">Vuelo</span>
                <span className="value">LF-{String(vuelo.idVuelo).padStart(3, "0")}</span>
              </div>
            </div>

            <div className="flight-footer">
              <div className="flight-price">
                ${vuelo.precio} <small>USD / persona</small>
              </div>
              <Link to={`/boletos/${vuelo.idVuelo}`}>
                <button className="btn btn-primary">Reservar →</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function RutasDestacadas({ rutas }) {
  // Tomamos solo las primeras 3 rutas del arreglo de datos
  const destacadas = rutas.slice(0, 3);

  return (
    <aside className="top-routes-section" style={{ flex: 1 }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Rutas Destacadas</h2>
      
      <div className="top-routes-grid">
        {/* Recorremos solo las 3 rutas destacadas */}
        {destacadas.map((ruta) => (
          <article className="card" key={ruta.id}>
            <img src={ruta.imagen} alt={ruta.alt} />
            
            <div className="card-content">
              {/* Usamos h3 para mantener la jerarquía semántica dentro del aside */}
              <h3>{ruta.nombre}</h3>
              
              <dl className="details">
                <dt>Distancia</dt>
                <dd>{ruta.distanciaKm} km</dd>
                
                <dt>Dificultad</dt>
                <dd style={{ textTransform: "capitalize" }}>{ruta.dificultad}</dd>
              </dl>
              
              <a href="#" className="view-more" aria-label={`Ver detalles de ${ruta.nombre}`}>
                Ver Detalles
              </a>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
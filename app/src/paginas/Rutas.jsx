import { useState } from "react";
import { Link } from "react-router";

// Datos de prueba ampliados para que el filtro funcione
const rutasData = [
  { id: 1, nombre: "Sendero Araucarias", distanciaKm: 5, dificultad: "media", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Bosque" },
  { id: 2, nombre: "Ruta del Ñielol", distanciaKm: 3, dificultad: "baja", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Cerro Ñielol" },
  { id: 3, nombre: "Parque Conguillío", distanciaKm: 12, dificultad: "alta", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Parque" },
  { id: 4, nombre: "Volcán Villarrica", distanciaKm: 8, dificultad: "alta", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Volcán" }
];

export default function Rutas() {
  // Estado para controlar qué dificultad estamos filtrando
  const [dificultad, setDificultad] = useState("todas");
  
  // Filtramos el arreglo original dependiendo del botón presionado
  const visibles = dificultad === "todas"
    ? rutasData
    : rutasData.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#a7f3d0", textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Catálogo de Rutas
      </h2>
      
      {/* Panel de Filtros con Glassmorphism */}
      <div className="filtros glass-panel">
        <span style={{ fontWeight: "bold", color: "#ffffff", textShadow: "1px 1px 2px black" }}>
          Filtrar por dificultad:
        </span>
        <button 
          type="button" 
          aria-pressed={dificultad === "todas"} 
          onClick={() => setDificultad("todas")}
        >
          Todas
        </button>
        <button 
          type="button" 
          aria-pressed={dificultad === "baja"} 
          onClick={() => setDificultad("baja")}
        >
          Baja
        </button>
        <button 
          type="button" 
          aria-pressed={dificultad === "media"} 
          onClick={() => setDificultad("media")}
        >
          Media
        </button>
        <button 
          type="button" 
          aria-pressed={dificultad === "alta"} 
          onClick={() => setDificultad("alta")}
        >
          Alta
        </button>
      </div>

      {/* Grilla de Tarjetas usando la lista filtrada 'visibles' */}
      <div className="card-grid">
        {visibles.map((ruta) => (
          <article className="card" key={ruta.id}>
            <img src={ruta.imagen} alt={ruta.alt} />
            
            <div className="card-content">
              <h2>{ruta.nombre}</h2>
              
              <dl className="details">
                <dt>Distancia</dt>
                <dd>{ruta.distanciaKm} km</dd>
                
                <dt>Dificultad</dt>
                <dd style={{ textTransform: "capitalize" }}>{ruta.dificultad}</dd>
              </dl>
              
              {/* Botón que llevará al Detalle (Encargo D) usando el ID dinámico */}
              <Link 
                to={`/rutas/${ruta.id}`} 
                className="view-more btn-whatsapp" 
                style={{ marginTop: "auto", textDecoration: "none" }}
              >
                Ver Detalles
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {/* Mensaje por si un filtro se queda sin rutas */}
      {visibles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
          No hay rutas disponibles con esta dificultad por el momento.
        </p>
      )}
    </div>
  );
}
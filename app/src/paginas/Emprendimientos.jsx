import { useState } from "react";
// Opcional: importar Link si quieres conectarlo a las rutas en el futuro

// Datos de prueba basados en tu contrato API (Recurso 2: emprendimientos)
const emprendimientosData = [
  { id: 1, rutaId: 1, nombre_local: "Sabores Mapuche", categoria: "gastronomia", descripcion: "Comida ancestral con ingredientes orgánicos de la zona.", comuna: "Temuco", telefono: "+56 9 1234 5678" },
  { id: 2, rutaId: 2, nombre_local: "Refugio del Bosque", categoria: "alojamiento", descripcion: "Cabañas sustentables equipadas con paneles solares.", comuna: "Temuco", telefono: "+56 9 8765 4321" },
  { id: 3, rutaId: 1, nombre_local: "Artesanías Pewen", categoria: "artesania", descripcion: "Tejidos tradicionales a telar y tallados finos en madera nativa.", comuna: "Temuco", telefono: "+56 9 1122 3344" },
  { id: 4, rutaId: 3, nombre_local: "Ruka Pewenche", categoria: "gastronomia", descripcion: "Degustación de piñones y platos típicos de la cordillera.", comuna: "Melipeuco", telefono: "+56 9 4433 2211" }
];

export default function Emprendimientos() {
  // Estado para controlar qué categoría de PYME estamos filtrando
  const [categoria, setCategoria] = useState("todas");
  
  // Filtramos el arreglo original dependiendo del botón presionado
  const visibles = categoria === "todas"
    ? emprendimientosData
    : emprendimientosData.filter((emp) => emp.categoria === categoria);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#a7f3d0", textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Catálogo de Emprendimientos
      </h2>
      
      {/* Panel de Filtros reutilizando exactamente la clase del Encargo C */}
      <div className="filtros glass-panel">
        <span style={{ fontWeight: "bold", color: "#ffffff", textShadow: "1px 1px 2px black" }}>
          Categoría:
        </span>
        <button 
          type="button" 
          aria-pressed={categoria === "todas"} 
          onClick={() => setCategoria("todas")}
        >
          Todas
        </button>
        <button 
          type="button" 
          aria-pressed={categoria === "gastronomia"} 
          onClick={() => setCategoria("gastronomia")}
        >
          Gastronomía
        </button>
        <button 
          type="button" 
          aria-pressed={categoria === "alojamiento"} 
          onClick={() => setCategoria("alojamiento")}
        >
          Alojamiento
        </button>
        <button 
          type="button" 
          aria-pressed={categoria === "artesania"} 
          onClick={() => setCategoria("artesania")}
        >
          Artesanía
        </button>
      </div>

      {/* Grilla de Tarjetas usando las clases globales */}
      <div className="card-grid">
        {visibles.map((emp) => (
          <article className="card" key={emp.id} style={{ minHeight: "250px" }}>
            <div className="card-content">
              <h2>{emp.nombre_local}</h2>
              <p style={{ marginBottom: "1.5rem", fontStyle: "italic", opacity: 0.9 }}>
                "{emp.descripcion}"
              </p>
              
              <dl className="details">
                <dt>Rubro</dt>
                <dd style={{ textTransform: "capitalize" }}>{emp.categoria}</dd>
                
                <dt>Ubicación</dt>
                <dd style={{ textTransform: "capitalize" }}>{emp.comuna}</dd>
                
                <dt>Contacto</dt>
                <dd>{emp.telefono}</dd>
              </dl>
              
              <button className="view-more btn-whatsapp" style={{ marginTop: "auto" }}>
                Contactar PYME
              </button>
            </div>
          </article>
        ))}
      </div>
      
      {/* Mensaje vacío */}
      {visibles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
          No hay emprendimientos registrados en esta categoría por ahora.
        </p>
      )}
    </div>
  );
}
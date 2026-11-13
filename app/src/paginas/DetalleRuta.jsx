import { useParams, Link } from "react-router";

// Datos de prueba (idealmente los mismos que en Rutas.jsx, con algo de descripción extra)
const rutasData = [
  { id: 1, nombre: "Sendero Araucarias", distanciaKm: 5, dificultad: "media", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Bosque", descripcion: "Un hermoso sendero rodeado de milenarias araucarias. Perfecto para disfrutar en familia y conectar con la naturaleza de forma tranquila." },
  { id: 2, nombre: "Ruta del Ñielol", distanciaKm: 3, dificultad: "baja", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Cerro Ñielol", descripcion: "Recorrido clásico por el pulmón verde de Temuco. Cuenta con miradores y una rica biodiversidad de flora y fauna local." },
  { id: 3, nombre: "Parque Conguillío", distanciaKm: 12, dificultad: "alta", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Parque", descripcion: "Desafiante ruta que te lleva a través de paisajes volcánicos, lagos de colores intensos y bosques densos. Requiere buena condición física." },
  { id: 4, nombre: "Volcán Villarrica", distanciaKm: 8, dificultad: "alta", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Volcán", descripcion: "Ascenso técnico hacia uno de los volcanes más activos. Ofrece vistas panorámicas impresionantes de la región de La Araucanía." }
];

export default function DetalleRuta() {
  // Extraemos el parámetro :id de la URL
  const { id } = useParams();
  
  // Buscamos la ruta que coincida con ese id (convertido a número)
  const ruta = rutasData.find((r) => r.id === Number(id));

  // Si alguien escribe un ID que no existe (ej: /rutas/99), mostramos esto:
  if (!ruta) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", color: "white" }}>
        <h2 style={{ fontSize: "2rem", color: "#a7f3d0" }}>Ruta no encontrada</h2>
        <p className="lista">No existe una ruta registrada con el número {id}.</p>
        <Link to="/rutas" className="btn-whatsapp" style={{ display: "inline-block", marginTop: "1rem", textDecoration: "none" }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // Si la ruta existe, mostramos su detalle con efecto Glassmorphism
  return (
    <div style={{ marginTop: "2rem", maxWidth: "900px", margin: "2rem auto" }}>
      <div className="info-block glass-panel" style={{ padding: "0", overflow: "hidden" }}>
        {/* Imagen de cabecera */}
        <img 
          src={ruta.imagen} 
          alt={ruta.alt} 
          style={{ width: "100%", height: "400px", objectFit: "cover" }} 
        />
        
        {/* Contenido del detalle */}
        <div style={{ padding: "2rem" }}>
          <h2 style={{ color: "#a7f3d0", fontSize: "2.5rem", marginBottom: "1rem" }}>{ruta.nombre}</h2>
          
          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "1rem" }}>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Distancia:</strong> <br/>
              {ruta.distanciaKm} km
            </div>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Dificultad:</strong> <br/>
              <span style={{ textTransform: "capitalize" }}>{ruta.dificultad}</span>
            </div>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Estado:</strong> <br/>
              Activa
            </div>
          </div>
          
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Sobre esta ruta</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.8" }}>
            {ruta.descripcion}
          </p>
          
          <Link to="/rutas" className="btn-whatsapp" style={{ display: "inline-block", textDecoration: "none", width: "auto" }}>
            ← Volver a todas las rutas
          </Link>
        </div>
      </div>
    </div>
  );
}
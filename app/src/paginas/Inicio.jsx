import { Link } from "react-router";
// IMPORTANTE: Ajusta la ruta de importación si tu componente está en otra subcarpeta
import RutasDestacadas from "../components/RutasDestacadas.jsx";

// Arreglo de prueba temporal (luego lo reemplazarás por tus datos reales importados)
const rutasPrueba = [
  { id: 1, nombre: "Sendero Araucarias", distanciaKm: 5, dificultad: "media", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Bosque de araucarias" },
  { id: 2, nombre: "Ruta del Ñielol", distanciaKm: 3, dificultad: "baja", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Cerro Ñielol" },
  { id: 3, nombre: "Parque Conguillío", distanciaKm: 12, dificultad: "alta", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop", alt: "Parque Nacional" }
];

export default function Inicio() {
  return (
    <div className="home-layout" style={{ marginTop: "2rem" }}>
      
      {/* Columna Izquierda: Información y botón para ver más */}
      <section className="info-section" style={{ flex: 2 }}>
        <div className="info-block glass-panel">
          <h2 style={{ color: "#a7f3d0", fontSize: "2rem", marginBottom: "1rem" }}>Bienvenidos a EcoRuta Temuco</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Descubre los mejores senderos sostenibles y apoya a los emprendimientos 
            locales de La Araucanía. Nuestra plataforma te conecta con la naturaleza 
            de forma responsable.
          </p>
          
          <ul style={{ marginBottom: "2rem", lineHeight: "2" }}>
            <li>✅ Rutas verificadas y seguras.</li>
            <li>✅ Conexión directa con PYMEs turísticas.</li>
            <li>✅ Información del clima en tiempo real.</li>
          </ul>

          {/* Usamos Link de react-router en lugar de la etiqueta <a> tradicional */}
          <Link 
            to="/rutas" 
            className="btn-whatsapp" 
            style={{ display: "inline-block", width: "auto", textDecoration: "none" }}
          >
            Explorar todas las rutas
          </Link>
        </div>
      </section>

      {/* Columna Derecha: El componente que ya habías creado. 
          Al pasarle el arreglo, el componente automáticamente tomará las 3 primeras (slice) */}
      <RutasDestacadas rutas={rutasPrueba} />
      
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";
import RutasDestacadas from "../components/RutasDestacadas.jsx";
import ProximosFeriados from "../components/ProximosFeriados.jsx";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRutas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }

    cargarRutas();
  }, []);

  return (
    <div className="home-layout" style={{ marginTop: "2rem" }}>
      <section className="info-section" style={{ flex: 2 }}>
        <div className="info-block glass-panel">
          <h2 style={{ color: "#a7f3d0", fontSize: "2rem", marginBottom: "1rem" }}>
            Bienvenidos a EcoRuta Temuco
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Descubre los mejores senderos sostenibles y apoya a los emprendimientos
            locales de La Araucanía. Nuestra plataforma te conecta con la naturaleza
            de forma responsable.
          </p>

          <ul style={{ marginBottom: "2rem", lineHeight: "2" }}>
            <li>✅ Rutas verificadas y seguras.</li>
            <li>✅ Conexión directa con PYMEs turísticas.</li>
            <li>✅ Información útil para planificar tu salida.</li>
          </ul>

          <Link
            to="/rutas"
            className="btn-whatsapp"
            style={{ display: "inline-block", width: "auto", textDecoration: "none" }}
          >
            Explorar todas las rutas
          </Link>
        </div>

        <ProximosFeriados />
      </section>

      <div className="top-routes-section">
        {cargando && (
          <p className="lista estado" role="status">
            Cargando rutas...
          </p>
        )}

        {!cargando && error && (
          <p className="lista estado error" role="alert">
            {error}
          </p>
        )}

        {!cargando && !error && <RutasDestacadas rutas={rutas.slice(0, 3)} />}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { API_URL } from "../api.js";

export default function Rutas() {
  // PASO 1: Los cuatro estados arriba antes de cualquier return
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [dificultad, setDificultad] = useState("todas");

  // PASO 2 y 3: Pedir las rutas a la API una sola vez al montar
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

  // PASO 4: Estados de carga y error
  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando rutas...
      </p>
    );
  }

  if (error) {
    return (
      <p className="lista estado error" role="alert">
        {error}
      </p>
    );
  }

  // El cálculo de visibles puede ir aquí porque no es un hook
  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#a7f3d0", textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Catálogo de Rutas
      </h2>

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

      {visibles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
          No hay rutas disponibles con esta dificultad por el momento.
        </p>
      )}
    </div>
  );
}
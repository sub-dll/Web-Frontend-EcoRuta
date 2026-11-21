import { useState, useEffect } from "react";
import { API_URL } from "../api.js";

export default function Emprendimientos() {
  // PASO 1: Todos los hooks arriba
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoria, setCategoria] = useState("todas");

  // PASO 2 y 3: Cargar desde la API
  useEffect(() => {
    async function cargarEmprendimientos() {
      try {
        const respuesta = await fetch(`${API_URL}/emprendimientos`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setEmprendimientos(await respuesta.json());
      } catch {
        setError("No se pudieron cargar los emprendimientos. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }

    cargarEmprendimientos();
  }, []);

  // PASO 4: Estados de carga y error
  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando emprendimientos...
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
    categoria === "todas"
      ? emprendimientos
      : emprendimientos.filter((emp) => emp.categoria === categoria);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#a7f3d0", textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Catálogo de Emprendimientos
      </h2>

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

      {visibles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
          No hay emprendimientos registrados en esta categoría por ahora.
        </p>
      )}
    </div>
  );
}
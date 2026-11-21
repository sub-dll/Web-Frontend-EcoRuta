import { useState, useEffect } from "react";
import { API_URL } from "../api.js";
import FormularioEmprendimiento from "./FormularioEmprendimiento.jsx";

export default function EmprendimientosRuta({ rutaId }) {
  // PASO 1: Todos los hooks arriba, antes de cualquier return
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // PASO 2 y 3: Pedir solo los emprendimientos de esta ruta cada vez que cambie rutaId
  useEffect(() => {
    async function cargarEmprendimientos() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(`${API_URL}/emprendimientos?rutaId=${rutaId}`);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setEmprendimientos(await respuesta.json());
      } catch {
        setError("No se pudieron cargar los emprendimientos de esta ruta. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }

    cargarEmprendimientos();
  }, [rutaId]);

  // Borrar: primero responde la API, después se actualiza la pantalla
  async function borrar(idEmprendimiento) {
    try {
      const respuesta = await fetch(`${API_URL}/emprendimientos/${idEmprendimiento}`, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        setEmprendimientos(emprendimientos.filter((emp) => emp.id !== idEmprendimiento));
      }
    } catch {
      setError("No se pudo borrar el emprendimiento. ¿Está corriendo la API?");
    }
  }

  // Función que recibirá el nuevo registro creado desde FormularioEmprendimiento (Encargo E)
  function agregar(nuevo) {
    setEmprendimientos([...emprendimientos, nuevo]);
  }

  // PASO 4: Dibujar según el estado
  if (cargando) {
    return (
      <p className="estado" role="status">
        Cargando emprendimientos asociados...
      </p>
    );
  }

  if (error) {
    return (
      <p className="estado error" role="alert">
        {error}
      </p>
    );
  }

  return (
    <section className="seccion-api">
      <h3 style={{ color: "#a7f3d0", fontSize: "1.6rem", marginBottom: "1rem" }}>
        Emprendimientos cercanos a esta ruta
      </h3>

      {emprendimientos.length === 0 ? (
        <p style={{ marginBottom: "1.5rem", opacity: 0.9 }}>
          Aún no hay emprendimientos registrados en esta ruta.
        </p>
      ) : (
        <ul>
          {emprendimientos.map((emp) => (
            <li className="item-api" key={emp.id}>
              <div>
                <h4 style={{ color: "#a7f3d0", marginBottom: "0.25rem" }}>
                  {emp.nombre_local}
                </h4>
                <p style={{ fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                  {emp.descripcion}
                </p>
                <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                  <strong style={{ textTransform: "capitalize" }}>{emp.categoria}</strong> ·{" "}
                  <span style={{ textTransform: "capitalize" }}>{emp.comuna}</span> · {emp.telefono}
                </p>
              </div>

              <button
                type="button"
                className="btn-borrar"
                aria-label={`Borrar el emprendimiento ${emp.nombre_local}`}
                onClick={() => borrar(emp.id)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Por ahora mostrará "Formulario pendiente" hasta fusionar el Encargo E */}
      <FormularioEmprendimiento rutaId={rutaId} onCreada={agregar} />
    </section>
  );
}
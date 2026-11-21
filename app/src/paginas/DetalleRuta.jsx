import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { API_URL } from "../api.js";
import EmprendimientosRuta from "../components/EmprendimientosRuta.jsx";

export default function DetalleRuta() {
  // PASO 1: Todos los hooks arriba, antes de cualquier return
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // PASO 2 y 3: Pedir la ruta por ID cada vez que cambie :id
  useEffect(() => {
    async function cargarRuta() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(`${API_URL}/rutas/${id}`);

        // fetch no lanza error en 404, así que se controla aquí
        if (respuesta.status === 404) {
          setRuta(null);
          return;
        }

        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }

        setRuta(await respuesta.json());
      } catch {
        setError("No se pudo cargar el detalle de la ruta. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }

    cargarRuta();
  }, [id]);

  // PASO 4: Dibujar según el estado
  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando detalle de la ruta...
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

  // Si la API respondió 404 (id inexistente)
  if (!ruta) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", color: "white" }}>
        <h2 style={{ fontSize: "2rem", color: "#a7f3d0" }}>Ruta no encontrada</h2>
        <p className="lista">No existe una ruta registrada con el número {id}.</p>
        <Link
          to="/rutas"
          className="btn-whatsapp"
          style={{ display: "inline-block", width: "auto", marginTop: "1rem", textDecoration: "none" }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      <div className="info-block glass-panel" style={{ padding: "0", overflow: "hidden" }}>
        <img
          src={ruta.imagen}
          alt={ruta.alt}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />

        <div style={{ padding: "2rem" }}>
          <h2 style={{ color: "#a7f3d0", fontSize: "2.5rem", marginBottom: "1rem" }}>
            {ruta.nombre}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "1rem",
            }}
          >
            <div>
              <strong style={{ color: "#a7f3d0" }}>Distancia:</strong> <br />
              {ruta.distanciaKm} km
            </div>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Dificultad:</strong> <br />
              <span style={{ textTransform: "capitalize" }}>{ruta.dificultad}</span>
            </div>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Accesible:</strong> <br />
              {ruta.accesible ? "Sí" : "No"}
            </div>
            <div>
              <strong style={{ color: "#a7f3d0" }}>Estado:</strong> <br />
              {ruta.estado}
            </div>
          </div>

          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Sobre esta ruta</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.8" }}>
            {ruta.descripcion}
          </p>

          <Link
            to="/rutas"
            className="btn-whatsapp"
            style={{ display: "inline-block", textDecoration: "none", width: "auto" }}
          >
            ← Volver a todas las rutas
          </Link>
        </div>
      </div>

      {/* Recurso asociado que se conectará en el Encargo D */}
      <EmprendimientosRuta rutaId={ruta.id} />
    </div>
  );
}
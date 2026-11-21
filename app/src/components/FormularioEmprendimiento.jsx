import { useState } from "react";
import { API_URL } from "../api.js";

export default function FormularioEmprendimiento({ rutaId, onCreada }) {
  const [nombreLocal, setNombreLocal] = useState("");
  const [categoria, setCategoria] = useState("gastronomia");
  const [comuna, setComuna] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setMensaje("");

    if (!nombreLocal.trim() || !comuna.trim() || !telefono.trim() || !descripcion.trim()) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (descripcion.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch(`${API_URL}/emprendimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutaId: Number(rutaId),
          nombre_local: nombreLocal.trim(),
          categoria,
          comuna: comuna.trim().toLowerCase(),
          telefono: telefono.trim(),
          descripcion: descripcion.trim(),
          estado_solicitud: "pendiente",
        }),
      });

      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }

      const creado = await respuesta.json();
      onCreada(creado);

      // Limpiar los campos después de crear
      setNombreLocal("");
      setCategoria("gastronomia");
      setComuna("");
      setTelefono("");
      setDescripcion("");
      setMensaje("Emprendimiento agregado correctamente.");
    } catch {
      setError("No se pudo guardar el emprendimiento. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="form-api" onSubmit={enviar} noValidate>
      <h4 style={{ color: "#a7f3d0", fontSize: "1.3rem" }}>
        Registrar nuevo emprendimiento en esta ruta
      </h4>

      <div>
        <label htmlFor="nombre_local">Nombre del local</label>
        <input
          id="nombre_local"
          type="text"
          value={nombreLocal}
          onChange={(e) => setNombreLocal(e.target.value)}
          placeholder="Ej: Café del Bosque"
          required
        />
      </div>

      <div>
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="gastronomia" style={{ color: "#111" }}>Gastronomía</option>
          <option value="alojamiento" style={{ color: "#111" }}>Alojamiento</option>
          <option value="artesania" style={{ color: "#111" }}>Artesanía</option>
        </select>
      </div>

      <div>
        <label htmlFor="comuna">Comuna</label>
        <input
          id="comuna"
          type="text"
          value={comuna}
          onChange={(e) => setComuna(e.target.value)}
          placeholder="Ej: Temuco"
          required
        />
      </div>

      <div>
        <label htmlFor="telefono">Teléfono de contacto</label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej: +56 9 1234 5678"
          required
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe brevemente qué ofrece este emprendimiento..."
          required
        />
      </div>

      {error && (
        <p className="estado error" role="alert" style={{ margin: 0, maxWidth: "100%" }}>
          {error}
        </p>
      )}

      {mensaje && (
        <p className="estado" role="status" style={{ margin: 0, maxWidth: "100%" }}>
          {mensaje}
        </p>
      )}

      <button type="submit" className="btn-glass-submit" disabled={enviando}>
        {enviando ? "Guardando..." : "Agregar emprendimiento"}
      </button>
    </form>
  );
}
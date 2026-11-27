import { useState, useEffect } from "react";

const URL_FERIADOS = "https://date.nager.at/api/v3/NextPublicHolidays/CL";

export default function ProximosFeriados() {
  const [feriados, setFeriados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarFeriados() {
      try {
        const respuesta = await fetch(URL_FERIADOS);
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setFeriados(Array.isArray(datos) ? datos.slice(0, 4) : []);
      } catch {
        setError("No se pudieron cargar los próximos feriados en este momento.");
      } finally {
        setCargando(false);
      }
    }

    cargarFeriados();
  }, []);

  return (
    <section className="seccion-api api-externa" aria-labelledby="titulo-feriados">
      <h3 id="titulo-feriados" style={{ color: "#a7f3d0", fontSize: "1.4rem", marginBottom: "0.75rem" }}>
        Próximos feriados en Chile para planificar tu ruta
      </h3>

      {cargando && (
        <p className="estado" role="status" style={{ margin: "1rem 0", maxWidth: "100%" }}>
          Cargando calendario de feriados...
        </p>
      )}

      {!cargando && error && (
        <p className="estado error" role="alert" style={{ margin: "1rem 0", maxWidth: "100%" }}>
          {error}
        </p>
      )}

      {!cargando && !error && feriados.length === 0 && (
        <p style={{ opacity: 0.9 }}>No hay feriados próximos disponibles por ahora.</p>
      )}

      {!cargando && !error && feriados.length > 0 && (
        <ul className="lista-feriados">
          {feriados.map((feriado) => (
            <li className="item-api" key={`${feriado.date}-${feriado.localName}`}>
              <div>
                <strong style={{ color: "#a7f3d0" }}>{feriado.localName}</strong>
                <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>{feriado.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p style={{ fontSize: "0.85rem", opacity: 0.85, marginTop: "1rem" }}>
        Fuente:{" "}
        <a
          href="https://date.nager.at/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#a7f3d0", textDecoration: "underline" }}
        >
          Nager.Date Public Holidays API
        </a>
      </p>
    </section>
  );
}
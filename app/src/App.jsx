import Encabezado from "./components/Encabezado.jsx";
import BannerPrincipal from "./components/BannerPrincipal.jsx";
import TarjetaRuta from "./components/TarjetaRuta.jsx";
import ListaRutas from "./components/ListaRutas.jsx";
import ListaEmprendimientos from "./components/RutasDestacadas.jsx";
import PiePagina from "./components/PiePagina.jsx";
import { rutas } from "./datos/rutas.js";
import { emprendimientos } from "./datos/emprendimientos.js";
import imagenPrueba from "./assets/react.svg";
import RutasDestacadas from "./components/RutasDestacadas.jsx";

function App() {
  return (
    <>
      <Encabezado
        enlaces={["Inicio", "Rutas", "Contacto"]}
        paginaActual="Inicio"
      />

      <main>
        <BannerPrincipal
          titulo="Rutas sostenibles de La Araucanía"
          subtitulo="Senderos y emprendimientos cerca de Temuco"
        />

        {/* Usamos el layout de 2 columnas que ya tienes en tu CSS */}
        <div className="home-layout" style={{ marginTop: "2rem" }}>

          <section className="info-section" style={{ flex: 2 }}>
            {/* Aquí va tu lista principal de rutas */}
            <ListaRutas rutas={rutas} />
          </section>

          {/* Aquí inyectamos tu nuevo panel derecho pasándole las rutas */}
          <RutasDestacadas rutas={rutas} />

        </div>
      </main>

      <PiePagina />
    </>
  );
}

export default App;
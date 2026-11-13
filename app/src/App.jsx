import { Routes, Route } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./paginas/Inicio.jsx";
import Rutas from "./paginas/Rutas.jsx";
import DetalleRuta from "./paginas/DetalleRuta.jsx";
import Emprendimientos from "./paginas/Emprendimientos.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";

function App() {
  return (
    <>
      {/* No modificamos las props del Encabezado todavía para evitar errores */}
      <Encabezado
        enlaces={["Inicio", "Rutas", "Contacto"]}
        paginaActual="Inicio"
      />
      
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/rutas/:id" element={<DetalleRuta />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      
      <PiePagina />
    </>
  );
}

export default App;
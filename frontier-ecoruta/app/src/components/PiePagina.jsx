export default function PiePagina() {
  // Un pequeño truco de React: usamos JavaScript para obtener el año actual
  // así no tendrás que cambiarlo a mano el próximo año.
  const anioActual = new Date().getFullYear();

  return (
    // La etiqueta footer ya tiene todo el diseño Glassmorphism gracias a tu index.css
    <footer>
      <p>
        &copy; {anioActual} EcoRuta. Promoviendo el turismo responsable en La Araucanía, Chile.
      </p>
      
      {/* Opcional: Un pequeño menú secundario si el profe pide más interactividad */}
      <div style={{ marginTop: "1rem", fontSize: "0.9rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
        <a href="#" style={{ color: "#a7f3d0", textDecoration: "none" }}>Términos y Condiciones</a>
        <a href="#" style={{ color: "#a7f3d0", textDecoration: "none" }}>Política de Privacidad</a>
        <a href="#" style={{ color: "#a7f3d0", textDecoration: "none" }}>Contacto</a>
      </div>
    </footer>
  );
}
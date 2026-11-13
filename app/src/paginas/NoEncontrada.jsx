import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <div style={{ textAlign: "center", padding: "10vh 2rem", color: "white" }}>
      <h2 style={{ fontSize: "4rem", marginBottom: "1rem", color: "#a7f3d0" }}>404</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
        Ups, te perdiste en el bosque. La ruta que buscas no existe.
      </p>
      
      <Link 
        to="/" 
        className="btn-whatsapp" 
        style={{ display: "inline-block", width: "auto", textDecoration: "none" }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
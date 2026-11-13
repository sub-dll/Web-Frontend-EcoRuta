import { NavLink } from "react-router";
// Asegúrate de que el nombre de tu imagen sea el correcto
import logoImg from "../assets/imagen-ejemplo.jpg"; 

export default function Encabezado() {
  // Los enlaces ahora viven aquí adentro, como pide el laboratorio
  const enlacesMenu = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Rutas", ruta: "/rutas" },
    { texto: "Emprendimientos", ruta: "/emprendimientos" }
  ];

  return (
    <header className="header-glass glass-panel">
      
      <h1 style={{ margin: 0, display: "flex", alignItems: "center" }}>
        <div className="logo">
          <img 
            src={logoImg} 
            alt="Logotipo de EcoRuta" 
            style={{ height: "35px", borderRadius: "50%" }} 
          />
        </div>
      </h1>
      
      <nav aria-label="Navegación principal">
        <ul style={{ display: "flex", flexDirection: "row", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
          
          {enlacesMenu.map((enlace) => (
            <li key={enlace.ruta}>
              {/* Reemplazamos <a> por NavLink */}
              <NavLink
                to={enlace.ruta}
                end={enlace.ruta === "/"}
                className={({ isActive }) => (isActive ? "activo" : "")}
                style={({ isActive }) => ({
                  color: isActive ? "#a7f3d0" : "#ffffff", // Verde si está activo, blanco si no
                  textDecoration: "none", 
                  fontWeight: "bold", 
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)"
                })}
              >
                {enlace.texto}
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>
      
      <div className="user-actions" style={{ width: "auto" }}>
        {/* El login también usa NavLink */}
        <NavLink 
          to="/login" 
          style={{ 
            backgroundColor: "#ffffff", 
            color: "#1E2761", 
            padding: "8px 20px", 
            borderRadius: "20px", 
            fontWeight: "bold",
            textDecoration: "none"
          }}
        >
          Login
        </NavLink>
      </div>
    </header>
  );
}
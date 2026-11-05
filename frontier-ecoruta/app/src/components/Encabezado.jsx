// Paso 4: Importamos la imagen del logo directamente desde la carpeta assets
import logoImg from "../assets/EcoRuta_Logo.png";

export default function Encabezado({ enlaces, paginaActual }) {
  return (
    // Se usa className en lugar de class
    <header className="header-glass glass-panel">
      
      {/* El profe pide que el h1 de la página vaya solo en el Encabezado */}
      <h1 style={{ margin: 0, display: "flex", alignItems: "center" }}>
        <div className="logo">
          {/* La imagen usa la variable logoImg que importamos arriba */}
          <img 
            src={logoImg} 
            alt="Logotipo de EcoRuta" 
            style={{ height: "35px", borderRadius: "50%" }} 
          />
        </div>
      </h1>
      
      <nav aria-label="Navegación principal">
        <ul style={{ display: "flex", flexDirection: "row", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
          
          {/* Encargo A: Usamos .map para recorrer el arreglo de enlaces */}
          {enlaces.map((enlace) => (
            <li key={enlace}>
              <a
                href="#"
                // Si el enlace coincide con la paginaActual, le ponemos la clase "activo"
                className={enlace === paginaActual ? "activo" : ""}
                style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
              >
                {enlace}
              </a>
            </li>
          ))}

        </ul>
      </nav>
      
      <div className="user-actions" style={{ width: "auto" }}>
        <a 
          href="#" 
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
        </a>
      </div>
    </header>
  );
}
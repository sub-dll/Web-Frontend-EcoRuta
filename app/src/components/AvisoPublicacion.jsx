export default function AvisoPublicacion() {
  if (import.meta.env.DEV) return null;

  return (
    <aside className="aviso-publicacion" role="status">
      <p>
        <strong>Versión publicada:</strong> Estás navegando EcoRuta en GitHub Pages.
        Los datos propios requieren levantar la API local (<code>npm run api</code>),
        mientras que la API pública externa funciona en tiempo real.
      </p>
    </aside>
  );
}
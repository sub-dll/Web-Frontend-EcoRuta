# Web-Frontend-EcoRuta

## Integrantes y roles (Sprint 3)

| Nombre | Rol ágil |
| :--- | :--- |
| Diego Fonseca | Scrum Master |
| Kevin Martin | Product Owner |
| Maximiliano Triviño | Developer |

## Descripción

> Aplicación web frontend para la organización "EcoRuta Temuco", que conecta a visitantes con senderos sostenibles y emprendimientos locales de La Araucanía.

## Tecnologías utilizadas

- HTML5 / CSS3
- JavaScript (ES6+)
- React 19 + React Router 7
- Vite
- JSON Server (API local simulada)
- Nager.Date Public Holidays API (API pública externa)

## Estado del proyecto

- Sprint actual: Sprint 3 (API externa y aplicación publicada)
- Última actualización: 26-11-2026

## Tablero Kanban

- Enlace al tablero: [Frontier EcoRuta en Trello](https://trello.com/invite/b/6a7dd5fe175ffd5d1c4c6f34/ATTI2b294cc6e99c5c4a91b2083ed51c89297E64BEE8/frontier-ecoruta)

## Enlace de despliegue

- **Sitio estático:** [https://sub-dll.github.io/Web-Frontend-EcoRuta/](https://sub-dll.github.io/Web-Frontend-EcoRuta/)
- **Aplicación React:** [https://sub-dll.github.io/Web-Frontend-EcoRuta/aplicacion/](https://sub-dll.github.io/Web-Frontend-EcoRuta/aplicacion/)

## Contrato API y Modelo de Datos (Sprint 3)

### Modelos de Datos

#### Recurso 1: `rutas`
| Campo | Tipo | Ejemplo de valor | Notas (obligatorio, rango, relación) |
| :--- | :--- | :--- | :--- |
| `id` | number | 1 | Lo genera el servidor |
| `nombre` | string | "Sendero Araucarias" | Obligatorio |
| `imagen` | string | "./img/imagen-ejemplo.jpg" | Obligatorio |
| `alt` | string | "Sendero rodeado de árboles" | Obligatorio para accesibilidad |
| `distanciaKm` | number | 15 | Obligatorio |
| `dificultad` | string | "media" | Valores: "baja", "media", "alta" |
| `accesible` | boolean | true | Obligatorio |
| `estado` | string | "Activa" | "Activa" o "Inactiva" |

**Ejemplo JSON:**
```json
{
  "id": 1,
  "nombre": "Sendero Araucarias",
  "imagen": "./img/imagen-ejemplo.jpg",
  "alt": "Sendero rodeado de árboles",
  "distanciaKm": 15,
  "dificultad": "media",
  "accesible": true,
  "estado": "Activa"
}
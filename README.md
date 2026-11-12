# Web-frontend-Ecoruta

## Integrantes y roles (Sprint actual)

| Nombre | Rol ágil |
|Diego Fonseca|Scrum Master|
|Kevin Martin|Product Owner|
|Maximiliano Triviño|Developer|
|  |  |
|  |  |

## Descripción 

> Una aplicacion web frontend para la organizacion "Ecoruta Temuco", mostrando las ofertas de rutas, emprendimientos y actividades, etc.

## Tecnologías utilizadas

- HTML5 / CSS3
- JavaScript / TypeScript
- (Framework a definir)
- (API consumida)

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Estado del proyecto

- Sprint actual: Sprint 0 (Kickoff)
- Última actualización: 13-08-2026

## Tablero Kanban

Enlace al tablero: (https://trello.com/invite/b/6a7dd5fe175ffd5d1c4c6f34/ATTI2b294cc6e99c5c4a91b2083ed51c89297E64BEE8/frontier-ecoruta)

## Enlace de despliegue

(agregar enlace una vez desplegado)

## Contrato API y Modelo de Datos (Sprint 3)

### API Pública Externa
- **Nombre:** Open-Meteo API
- **Uso:** Consulta del clima actual y la calidad del aire (PM2.5) en las coordenadas de la ruta.

### Modelos de Datos

#### Recurso 1: `rutas`
| Campo | Tipo | Ejemplo de valor | Notas (obligatorio, rango, relación) |
| :--- | :--- | :--- | :--- |
| `id` | number | 1 | Lo genera el servidor |
| `nombre` | string | "Sendero Araucarias" | Obligatorio |
| `imagen` | string | "../assets/nielol.jpg" | Obligatorio |
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
  "imagen": "../assets/nielol.jpg",
  "alt": "Sendero rodeado de árboles",
  "distanciaKm": 15,
  "dificultad": "media",
  "accesible": true,
  "estado": "Activa"
}

#### Recurso 2: `emprendimientos`
| Campo | Tipo | Ejemplo de valor | Notas (obligatorio, rango, relación) |
| :--- | :--- | :--- | :--- |
| `id` | number | 1 | Lo genera el servidor |
| `rutaId` | number | 1 | Relación con la ruta cercana (opcional) |
| `nombre_local` | string | "Sabores Mapuche" | Obligatorio |
| `rut_local` | string | "12.345.678-9" | Obligatorio |
| `categoria` | string | "gastronomia" | Ej: gastronomia, alojamiento, artesania |
| `descripcion` | string | "Comida ancestral" | Obligatorio |
| `comuna` | string | "temuco" | Obligatorio |
| `direccion` | string | "Av. Caupolicán 1234" | Obligatorio |
| `email` | string | "contacto@sabores.cl" | Obligatorio |
| `telefono` | string | "+56 9 1234 5678" | Obligatorio |
| `estado_solicitud` | string | "pendiente" | "pendiente", "aprobado", "rechazado" |

**Ejemplo JSON:**
```json
{
  "id": 1,
  "rutaId": 1,
  "nombre_local": "Sabores Mapuche",
  "rut_local": "12.345.678-9",
  "categoria": "gastronomia",
  "descripcion": "Comida ancestral",
  "comuna": "temuco",
  "direccion": "Av. Caupolicán 1234",
  "email": "contacto@sabores.cl",
  "telefono": "+56 9 1234 5678",
  "estado_solicitud": "pendiente"
}

#### Tabla del Contrato: `Endpoints`
| Metodo | Endpoint | Envía el frontend (JSON) | Responde la API | Código | Vista o componente |
| :--- | :--- | :--- | :--- |
| `GET` | /rutas | nada | arreglo de rutas | 200 | Home, Explorar Rutas, Panel Admin  |
| `GET` | /rutas/:id | nada | una ruta | 200 / 404 | Detalle de Ruta |
| `GET` | /emprendimientos | nada | arreglo de emprendimientos | 200 | Catálogo PYMEs |
| `GET` | /emprendimientos?estado_solicitud=pendiente | nada | emprendimientos por revisar | 200 | Panel Admin |
| `POST` | /emprendimientos | { rutaId,<br>nombre_local,<br>rut_local,<br>categoria,<br>descripcion,<br>comuna,<br>direccion, email,<br>telefono,<br>estado_solicitud<br>} | emprendimiento creado, con su id | 201 | Formulario Inscripción PYME |
| `PATCH` | /emprendimientos/:id |{<br>estado_solicitud:<br>"aprobado" } | el emprendimiento actualizado |  200  | Panel Admin |
| `DELETE` | /emprendimientos/:id | nada | { } (objeto vacío) | 200 | Panel Admin |

// Paso 3: URL del clima y selectores del DOM
const URL_CLIMA = "https://api.open-meteo.com/v1/forecast?latitude=-38.74&longitude=-72.60&current=temperature_2m,wind_speed_10m,weather_code&timezone=America/Santiago";
// Parte 2 (Opción B): URL de calidad del aire
const URL_AIRE = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-38.74&longitude=-72.60&current=pm2_5,pm10&timezone=America/Santiago";

const estado = document.querySelector("#estado");
const temperatura = document.querySelector("#temperatura");
const viento = document.querySelector("#viento");
const aviso = document.querySelector("#aviso-clima");
const cielo = document.querySelector("#cielo");
const aire = document.querySelector("#aire");

// Paso 7: Función que traduce el weather_code a texto
function describirCielo(codigo) {
    if (codigo === 0) return "Despejado";
    if (codigo <= 3) return "Parcialmente nublado a nublado";
    if (codigo === 45 || codigo === 48) return "Niebla";
    if (codigo >= 51 && codigo <= 57) return "Llovizna";
    if (codigo >= 61 && codigo <= 67) return "Lluvia";
    if (codigo >= 71 && codigo <= 77) return "Nieve";
    if (codigo >= 80 && codigo <= 82) return "Chubascos";
    if (codigo >= 95) return "Tormenta";
    return "Desconocido";
}

// Paso 5: Función que evalúa los datos y muestra un aviso
function mostrarAviso(clima) {
    aviso.hidden = false;
    
    if (clima.temperature_2m < 8) {
        aviso.textContent = "Hace frío: lleva abrigo.";
    } else if (clima.wind_speed_10m > 40) {
        aviso.textContent = "Viento fuerte: evita los miradores.";
    } else {
        aviso.textContent = "Buen momento para salir.";
        aviso.style.color = "#0E7C7B"; // Lo pintamos verde si está bueno
    }
}

// Paso 4: Función principal asíncrona (Clima)
async function mostrarClima() {
    estado.textContent = "Cargando clima…";
    try {
        const respuesta = await fetch(URL_CLIMA);
        if (!respuesta.ok) {
            throw new Error("La API respondió con error");
        }
        const datos = await respuesta.json();
        console.log("Datos del clima:", datos); 
        
        temperatura.textContent = `${datos.current.temperature_2m} °C`;
        viento.textContent = `${datos.current.wind_speed_10m} km/h`;
        cielo.textContent = describirCielo(datos.current.weather_code);
        
        mostrarAviso(datos.current);
        estado.textContent = "Clima actualizado.";
    } catch (error) {
        console.error(error);
        estado.textContent = "No pudimos cargar el clima.";
    }
}

// Parte 2 : Función asíncrona (Calidad del Aire)
async function mostrarCalidadAire() {
    try {
        const respuesta = await fetch(URL_AIRE);
        if (!respuesta.ok) {
            throw new Error("La API de aire respondió con error");
        }
        const datos = await respuesta.json();
        console.log("Datos de aire:", datos);
        
        const pm25 = datos.current.pm2_5;
        aire.textContent = pm25;
        
        
        if (pm25 > 15) {
            aire.style.color = "#d9534f"; // Rojo si supera norma OMS
        }
    } catch (error) {
        console.error("Error al cargar aire:", error);
        aire.textContent = "N/A";
    }
}

// Ejecutar ambas llamadas al cargar la página
mostrarClima();
mostrarCalidadAire();
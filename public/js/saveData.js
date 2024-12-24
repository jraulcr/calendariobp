//js/saveData.js

import axios from 'axios'; // Importar Axios para las solicitudes HTTP

// URL del endpoint de Netlify que maneja la persistencia en Replit DB
const REPLIT_DB_URL = 'https://calendariobp/.netlify/functions/saveData'; 

// Función para guardar datos en Replit DB
async function saveDateToReplitDB(date, activeSlots) {
  try {
    console.log("Guardando datos en Replit DB:", { date, activeSlots }); // Verificar qué datos se envían
    // Hacer la solicitud POST con axios para guardar los datos
    const response = await axios.post(REPLIT_DB_URL, {
      date,
      activeSlots
    });

    console.log('Datos guardados satisfactoriamente en Replit DB:', response.data);
  } catch (error) {
    console.error('Error al guardar en Replit DB:', error);
  }
}

// Función para cargar los datos de Replit DB para un calendario específico
async function loadCalendarFromReplitDB() {
  try {
    const currentDate = new Date(); // Asegúrate de que currentDate esté definido
    const date = currentDate.toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
    console.log("Cargando datos para la fecha:", date);

    // Hacer la solicitud GET con axios para cargar los datos
    const response = await axios.get(`${REPLIT_DB_URL}?date=${date}`);

    if (response.data) {
      console.log("Datos cargados desde Replit DB:", response.data);
      updateCalendarWeek(); // Refrescar la vista si hay datos
    } else {
      console.log("No se encontraron datos para la fecha:", date);
    }
  } catch (error) {
    console.error('Error al cargar datos desde Replit DB:', error);
  }
}

// Función para guardar los datos en localStorage y Replit DB
function saveData() {
  // Guardar los datos en localStorage si es necesario
  localStorage.setItem('holidays', JSON.stringify([...holidays])); 
  localStorage.setItem('activeSlots', JSON.stringify(activeSlots));

  // Llamar a Replit DB para guardar datos
  const currentDate = new Date(); // Asegúrate de que currentDate esté definido
  const date = currentDate.toISOString().split('T')[0];
  saveDateToReplitDB(date, activeSlots);
}

// Cargar los datos cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', async () => {
  await loadCalendarFromReplitDB();
  updateCalendarWeek(); // Asegúrate de que esta función está definida
});

//js/saveData.js
import axios from 'axios'; // Importar Axios para las solicitudes HTTP
const db = new Database(); // Crear una instancia de la base de datos
const REPLIT_DB_URL = 'https://calendariobp/.netlify/functions/saveData'; // URL del endpoint de Netlify

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

async function loadCalendarFromReplitDB() {
  try {
    const date = currentDate.toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
    console.log("Cargando datos para la fecha:", date);

    // Hacer la solicitud GET con axios para cargar los datos
    const response = await axios.get(`${REPLIT_DB_URL}?date=${date}`);

    if (response.data) {
      console.log("Datos cargados desde Replit DB:", response.data);
      updateCalendarWeek(); // Refrescar la vista
    } else {
      console.log("No se encontraron datos para la fecha:", date);
    }
  } catch (error) {
    console.error('Error al cargar datos desde Replit DB:', error);
  }
}

function saveData() {
  localStorage.setItem('holidays', JSON.stringify([...holidays]));
  localStorage.setItem('activeSlots', JSON.stringify(activeSlots));

  // Llamar a Replit DB para guardar datos
  const date = currentDate.toISOString().split('T')[0];
  saveDateToReplitDB(date, activeSlots);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadCalendarFromReplitDB();
  updateCalendarWeek();
});

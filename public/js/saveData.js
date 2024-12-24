import Database from 'repl-it-db'; // Importar la librería de Replit DB
const db = new Database(); // Crear una instancia de la base de datos

async function saveDateToReplitDB(date, activeSlots) {
  try {
    console.log("Guardando datos en Replit DB:", { date, activeSlots }); // Verificar qué datos se envían
    // Guardar los datos en Replit DB
    await db.set(date, activeSlots);
    console.log('Datos guardados satisfactoriamente en Replit DB.');
  } catch (error) {
    console.error('Error al guardar en Replit DB:', error);
  }
}

async function loadCalendarFromReplitDB() {
  try {
    const date = currentDate.toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
    console.log("Cargando datos para la fecha:", date);

    // Cargar los datos de Replit DB
    const activeSlots = await db.get(date);

    if (activeSlots) {
      console.log("Datos cargados desde Replit DB:", activeSlots);
      // Actualizar las casillas activas con los datos obtenidos
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

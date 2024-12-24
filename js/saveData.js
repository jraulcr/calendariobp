// js/saveData.js

async function saveDateToSupabase(date, activeSlots) {
    try {
      const response = await fetch('/.netlify/functions/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, activeSlots }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error al guardar en Supabase:', result.error);
      } else {
        console.log('Datos guardados satisfactoriamente:', result.message);
      }
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
    }
  }
  
  async function loadCalendarFromSupabase() {
    try {
      const { data, error } = await supabase
        .from('calendar')
        .select('*')
        .eq('date', currentDate.toISOString().split("T")[0]); // Filtrar por fecha actual
  
      if (error) {
        console.error('Error al cargar datos de Supabase:', error);
        return;
      }
  
      if (data && data.length > 0) {
        // Actualizar las casillas activas con los datos obtenidos
        activeSlots = data[0].activeSlots;
        updateCalendarWeek(); // Refrescar la vista
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }
  
  function saveData() {
    localStorage.setItem('holidays', JSON.stringify([...holidays]));
    localStorage.setItem('activeSlots', JSON.stringify(activeSlots));
  
    // Llamar a Supabase para guardar datos
    const date = currentDate.toISOString().split('T')[0];
    saveDateToSupabase(date, activeSlots);
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    await loadCalendarFromSupabase();
    updateCalendarWeek();
  });
  
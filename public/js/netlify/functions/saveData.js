// js/netlify/functions/saveData.js

const axios = require('axios'); // Importar axios si lo necesitas en el backend

exports.handler = async (event, context) => {
  // Manejar el método POST para guardar datos
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);

      if (!data.date || !data.activeSlots) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Los campos "date" y "activeSlots" son obligatorios' }),
        };
      }

      const { date, activeSlots } = data;

      // Guardar en la base de datos con la fecha como clave
      await db.set(date, { activeSlots });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Datos guardados satisfactoriamente', date }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  // Manejar el método GET para listar datos
  if (event.httpMethod === 'GET') {
    try {
      // Obtener todas las claves almacenadas
      const keys = await db.list();

      // Recuperar los valores asociados a las claves
      const results = {};
      for (const key of keys) {
        results[key] = await db.get(key);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ data: results }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  // Si el método HTTP no es soportado
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Método no permitido, usa POST para guardar o GET para listar' }),
  };
};

  }
};

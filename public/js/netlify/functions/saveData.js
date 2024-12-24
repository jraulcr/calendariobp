// js/netlify/functions/saveData.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymxrrqxpblgegyqptlok.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido, usa POST' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.date || !data.activeSlots) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Los campos "date" y "activeSlots" son obligatorios' }),
      };
    }

    const { date, activeSlots } = data;

    const { error } = await supabase.from('calendar').insert([{ date, activeSlots }]);
    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Fecha salvada satisfactoriamente' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
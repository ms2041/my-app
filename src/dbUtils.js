import { supabase } from './supabase.js';
import { pcs, playerChData } from './Cast.jsx';
import { createResource, For } from "solid-js";
import { getNextFreeIndex } from './Cast';
import { getRandomInt } from './generalUtils.js';

// Debug functions to test Supabase.
export async function getCastFromDb() {
  const castList = fetchPlayerChProps('player_ch_data', '*');
  console.log('getCastFromDb: ', castList);
}

export async function savePlayerChToDb() {
  const currentIndex = getNextFreeIndex() + 1;
  const currentPlayerChData = playerChData[displayIndex()]; // Get the current state of the 'playerChData' store

  // Create a copy of the 'playerChData' array
  const updatedPlayerChArray = [...playerChData];

  // Update the specific element at 'currentIndex' with a new object
  updatedPlayerChArray[currentIndex] = { ...updatedPlayerChData, id: currentIndex };

  console.log('writePlayerChDataToDb: ', updatedPlayerChArray);
  // Call the 'updatePlayerCh' function to update the row in Supabase
  updatePlayerCh(currentIndex, updatedPlayerChData);
}

// Function to fetch player characters from Supabase
export async function fetchPcs() {
  try {
    const { data, error } = await supabase
      .from('pcs')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.log('throw error: ', error);
      throw error;
    }
    console.log('Fetched player characters data:', data); // Log fetched data
    return data || [];
  } catch (error) {
    console.error('Error fetching player characters:', error, error.message);
    return [];
  }
}

// Test function to send position.
export async function writeXY() {
  const pos = {x: getRandomInt(32),
               y: getRandomInt(32)};
  const index = 4;
  console.log('writeXY: ', pos);
  updatePlayerChPosition(index, pos);
}

// Test function to read position.
export async function readXY() {
  const data = readPlayerChPosition();
  console.log('readXY: ', data);

}

// Update Player Character position.
export async function updatePlayerChPosition(index, position) {
  try {
    const { data, error } = await supabase
      .from('player_ch_position')
      .update(position)
      .match({ id: index });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player position:', error.message);
    return null;
  }
}

// Function to fetch player characters from Supabase
export async function readPlayerChPosition() {
  try {
    const { data, error } = await supabase
      .from('player_ch_position')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.log('throw error: ', error);
      throw error;
    }
    console.log('Fetched player characters data:', data); // Log fetched data
    return data || [];
  } catch (error) {
    console.error('Error fetching player characters:', error, error.message);
    return [];
  }
}

export async function updateWholeTable(tableName, newData) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .upsert(newData);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating whole table:', error.message);
    return null;
  }
}

// Update Player Character properties to Supabase.
export async function updatePlayerChProps(tableName, id, propertiesToUpdate) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(propertiesToUpdate)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player character properties:', error.message);
    return null;
  }
}

// Function to fetch Player Character properties from Supabase.
export async function fetchPlayerChProps(tableName, columnsToSelect) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(columnsToSelect)
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    console.log('Fetched player character properties:', tableName, data); // Log fetched data
    if (tableName == 'player_ch_equipment') {
      console.log('equipment data: ', data[0].equipment[0]);
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching player character properties:', error.message);
    return [];
  }
}
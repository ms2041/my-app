import { supabase } from './supabase.js';
import { pcs } from './Cast.jsx';
import { createResource, For } from "solid-js";
import { getNextPcIndex } from './Cast';
import { getRandomInt } from './generalUtils.js';

// Debug functions
export async function readFromDb() {
  const castList = fetchPcs();
  console.log('readFromDb: ', castList);
}

export async function writeToDb(updatedPc) {
  const currentIndex = getNextPcIndex() + 1; // Assuming getNextPcIndex() fetches the appropriate index
  const currentPcs = pcs(); // Get the current state of the 'pcs' store

  // Create a copy of the 'pcs' array
  const updatedPcs = [...currentPcs];

  // Update the specific element at 'currentIndex' with a new object
  updatedPcs[currentIndex] = { ...updatedPc, id: currentIndex };

  console.log('writeToDb: ', updatedPcs);
  // Call the 'updatePcs' function to update the row in Supabase
  updatePcs(currentIndex, updatedPc);
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

// Function to update a player character in Supabase
export async function updatePcs(index, updatedPcData) {
  try {
    const { data, error } = await supabase
      .from('pcs')
      .update(updatedPcData)
      .match({ id: index });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player character:', error.message);
    return null;
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
    return data || [];
  } catch (error) {
    console.error('Error fetching player character properties:', error.message);
    return [];
  }
}
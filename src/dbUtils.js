import { supabase } from "./supabase";
import { createResource, For } from "solid-js";

// Debug functions
export async function testFetch() {
  const castList = fetchPlayers();
  console.log('testFetch: ', castList);
}

export async function testUpdate(playerId, updatedPlayer) {
  console.log('updatePlayer: ', playerId, updatedPlayer)
  updatePlayers(playerId, updatedPlayer);
}

// Function to fetch players from Supabase
export async function fetchPlayers() {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*');

    if (error) {
      throw error;
    }
    console.log('Fetched players data:', data); // Log fetched data
    return data || [];
  } catch (error) {
    console.error('Error fetching players:', error.message);
    return [];
  }
}

// Function to update a player in Supabase
export async function updatePlayers(playerId, updatedPlayerData) {
  try {
    const { data, error } = await supabase
      .from('players')
      .update(updatedPlayerData)
      .match({ id: playerId });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player:', error.message);
    return null;
  }
}
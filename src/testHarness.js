import { supabase } from './supabase.js';
import { getRandomInt } from './generalUtils.js';

export async function setPlayerChMoney() {
  const money = {shillings: getRandomInt(32),
                 pennies: getRandomInt(32),
                 guilders: getRandomInt(32)};
  const index = 5;
  console.log('setPlayerChMoney: ', money);
  await updateMoney(index, money);
}

// Test function to read money.
export async function getPlayerChMoney() {
  const data = await fetchMoney();
  console.log('getMoney: ', data, data[4].shillings);
}

// Update Player Character position.
export async function updateMoney(index, money) {
  try {
    const { data, error } = await supabase
      .from('player_ch_money')
      .update(money)
      .match({ id: index });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player money:', error.message);
    return null;
  }
}

// Function to fetch player characters from Supabase
export async function fetchMoney() {
  try {
    const { data, error } = await supabase
      .from('player_ch_money')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.log('throw error: ', error);
      throw error;
    }
    console.log('Fetched player characters money:', data); // Log fetched data
    return data || [];
  } catch (error) {
    console.error('Error fetching player characters money:', error, error.message);
    return [];
  }
}

export async function setAb() {
  const ab = {ability: [
    'long sword',
    'musket',
    'spinach',
    '', '', '', '', '', '', ''
  ]};
  const index = 5;
  console.log('setAb: ', index, ab);
  await updateAb(index, ab);
}

// Test function to read abilites.
let myAbilities = [];
export async function readAb() {
  const data = await fetchAb();
  myAbilities = data;
  console.log('readAb: ', data, data[4]);
}

// Update Player Character abilities.
export async function updateAb(index, abilities) {
  try {
    const { data, error } = await supabase
      .from('player_ch_abilities')
      .update(abilities)
      .match({ id: index });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating player abilities:', error.message);
    return null;
  }
}

// Function to fetch player character abilities from Supabase
export async function fetchAb() {
  try {
    const { data, error } = await supabase
      .from('player_ch_abilities')
      .select('ability')
      .order('id', { ascending: true });

    if (error) {
      console.log('throw error: ', error);
      throw error;
    }
    console.log('Fetched player characters abilities:', data); // Log fetched data
    return data || [];
  } catch (error) {
    console.error('Error fetching player characters abilities:', error, error.message);
    return [];
  }
}
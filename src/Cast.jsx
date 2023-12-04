import { createSignal, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { abilitiesFirstList } from './oddpendium.jsx';
import { fetchPlayerChProps, updateWholeTable } from './dbUtils.js';
import { MAX_PCS } from './constants.js';

const [pcIndex, setPcIndex] = createSignal(0);
export { pcIndex, setPcIndex };
const [playerChIndex, setPlayerChIndex] = createSignal(0);
export { playerChIndex, setPlayerChIndex };
const [companionIndex, setCompanionIndex] = createSignal(1);
export { companionIndex, setCompanionIndex };

// Signal to store index used to display playerCh[]. displayIndex is
const [displayIndex, setDisplayIndex] = createSignal(0);
export { displayIndex, setDisplayIndex };

// Declare player character stores.
const playerChDataArray = [];
const playerChAbilitiesArray = [];
const playerChEquipmentArray = [];
const playerChMoneyArray = [];
const playerChStateArray = [];
const playerChPositionArray = [];

for (let i = 0; i < MAX_PCS; i++) {
  const playerChDataObject = {
    id: 0,
    classification: '',
    category:'',
    name: '',
    str: 0,
    dex: 0,
    wil: 0,
    hp: 0,
    specialInformation: '',
    companion: '',
  }
  playerChDataArray.push(playerChDataObject);
  const abilitiesObject = {
    ability: ["", "", "", "", "", "", "", "", "", ""],
  };
  playerChAbilitiesArray.push(abilitiesObject);
  const equipmentObject = {
    id: 0, //i + 1, // Assuming IDs start from 1
    equipment: ["", "", "", "", "", "", "", "", "", ""],
    equipmentPtr: 0,
  };
  playerChEquipmentArray.push(equipmentObject);
  const moneyObject = {
    shillings: 0,
    pennies: 0,
    guilders: 0,
  }
  playerChMoneyArray.push(moneyObject);
  playerChStateArray.push({});
  playerChPositionArray.push({});
}
export const [playerChData, setPlayerChData] = createStore(playerChDataArray);
export const [playerChAbilities, setPlayerChAbilities] = createStore(playerChAbilitiesArray);
export const [playerChEquipment, setPlayerChEquipment] = createStore(playerChEquipmentArray);
export const [playerChMoney, setPlayerChMoney] = createStore(playerChMoneyArray);
export const [playerChState, setPlayerChState] = createStore(playerChStateArray);
export const [playerChPosition, setPlayerChPosition] = createStore(playerChPositionArray);

export function abilitiesFirst(name) {
  return abilitiesFirstList.includes(name);
}

const defaultPc = {
  id: 0,
  classification: '',
  category: '',
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  abilities: ['', '', '', '', '', '', '', '', '', ''],
  equipment: ['', '', '', '', '', '', '', '', '', ''],
  equipmentPtr: 0,
  companion: '',
  specialInformation: '',
  shillings: 0,
  pennies: 0,
  guilders: 0,
  onScreen: false,
  state: '',
  x: 0,
  y: 0,
};

const initialPcs = new Array(MAX_PCS).fill(defaultPc);

// Array of player characters and companions.
const [pcs, setPcs] = createStore(initialPcs);

// Global variable containing a placeholder player character, prior to saving in pcs array.
const [pc, setPc] = createStore(defaultPc);

// Functions to convert to and from JSON.
export function PcsToJson(PcsArray) {
  return JSON.stringify(PcsArray);
}

export function JsonToPcs(jsonString) {
  return JSON.parse(jsonString);
}

/* Copy new data to playerCh arrays, identified by index (int) and propertyType ('data',
   'abilities', 'equipment', 'money', 'state', 'position' which are Supabase tables). */
function updatePlayerCh(index, propertyType, updatedProperties) {
  console.log('updatePlayerCh: ', index, propertyType, updatedProperties);
  
  const updateFunctions = {
    data: setPlayerChData,
    abilities: setPlayerChAbilities,
    equipment: setPlayerChEquipment,
    money: setPlayerChMoney,
    state: setPlayerChState,
    position: setPlayerChPosition,
  };
  
  const setFunction = updateFunctions[propertyType];
  
  if (setFunction) {
    setFunction((prevArray) => {
      const newArray = [...prevArray];
      if (index >= 0 && index < newArray.length) {
        newArray[index] = {
          ...newArray[index],
          ...updatedProperties,
        };
      }
      return newArray;
    });
  } else {
    console.error('Invalid propertyType:', propertyType);
  }
  console.log('')
}

// Iterates through playerChData from position 0 until element with empty name is found.
function getNextFreeIndex() {
  for (let i = 0; i < playerChData.length; i += 2) {
    if (playerChData[i].name === '') {
      console.log('Empty player character slot found at: ', i);
      return i;
    }
  }
  return -1; // Return -1 if no element with empty 'name' is found
}

export function savePlayerChData(index) {
  const playerChDataCopy = { ...playerChData[displayIndex()] };

  // Update the playerChData at getNextFreeIndex with the copied data
  setPlayerChData((prevPlayerChData) => {
    const updatedPlayerChData = [...prevPlayerChData];
    updatedPlayerChData[index] = playerChDataCopy;
    return updatedPlayerChData;
  });
}

export function savePlayerChAbilities(index) {
  const playerChAbilitiesCopy = { ...playerChAbilities[displayIndex()] };

  setPlayerChAbilities((prevPlayerChAbilities) => {
    const updatedPlayerChAbilities = [...prevPlayerChAbilities];
    updatedPlayerChAbilities[index] = playerChAbilitiesCopy;
    return updatedPlayerChAbilities;
  });
}

export function savePlayerChEquipment(index) {
  const playerChEquipmentCopy = { ...playerChEquipment[displayIndex()] };

  setPlayerChEquipment((prevPlayerChEquipment) => {
    const updatedPlayerChEquipment = [...prevPlayerChEquipment];
    updatedPlayerChEquipment[index] = playerChEquipmentCopy;
    return updatedPlayerChEquipment;
  });
}

export function savePlayerChMoney(index) {
  const playerChMoneyCopy = { ...playerChMoney[displayIndex()] };

  setPlayerChMoney((prevPlayerChMoney) => {
    const updatedPlayerChMoney = [...prevPlayerChMoney];
    updatedPlayerChMoney[index] = playerChMoneyCopy;
    return updatedPlayerChMoney;
  });
}

export function savePlayerChState(index) {
  const playerChMoneyCopy = { ...playerChMoney[displayIndex()] };

  setPlayerChState((prevPlayerChState) => {
    const updatedPlayerChState = [...prevPlayerChState];
    updatedPlayerChState[index] = playerChStateCopy;
    return updatedPlayerChState;
  });
}

export function savePlayerChPosition(index) {
  const playerChPositionCopy = { ...playerChPosition[displayIndex()] };

  setPlayerChPosition((prevPlayerChPosition) => {
    const updatedPlayerChPosition = [...prevPlayerChPosition];
    updatedPlayerChPosition[nextFreeIndex] = playerChPositionCopy;
    return updatedPlayerChPosition;
  });
}

// Define a generalised function to copy sourceRow to destinationRow while excluding the 'id' property
function copyRowWithoutId(sourceIndex, destinationIndex, sourceStore, setDestinationStore) {
  const sourceArray = sourceStore;
  const sourceItem = { ...sourceArray[sourceIndex] };
  const destinationArray = [...sourceArray];

  const { id, ...propertiesWithoutId } = sourceItem;

  if (destinationIndex >= 0 && destinationIndex < destinationArray.length) {
    destinationArray[destinationIndex] = { ...destinationArray[destinationIndex], ...propertiesWithoutId };
    setDestinationStore(destinationArray);
  } else {
    console.error('Invalid destination index');
  }
}
export function savePlayerCh() {
  const nextFreeIndex = getNextFreeIndex();

  if (nextFreeIndex !== -1) {
    // displayIndex() returns 0 normally, but not always.
    const playerChDataCopy = { ...playerChData[displayIndex()] };
    const playerChAbilitiesCopy = { ...playerChAbilities[displayIndex()] };
    const playerChEquipmentCopy = { ...playerChEquipment[displayIndex()] };
    const playerChMoneyCopy = { ...playerChMoney[displayIndex()] };
    const playerChStateCopy = { ...playerChState[displayIndex()] };
    const playerChPositionCopy = { ...playerChPosition[displayIndex()] };

    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChData, setPlayerChData);
    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChAbilities, setPlayerChAbilities);
    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChEquipment, setPlayerChEquipment);
    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChMoney, setPlayerChMoney);
    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChState, setPlayerChState);
    copyRowWithoutId(displayIndex(), nextFreeIndex, playerChPosition, setPlayerChPosition);

    console.log('savePlayerCh - data: ', playerChData);
    updatePlayerChArraysInSupabase()
  } else {
    console.log('Maximum Player Characters reached.');
  }
}

async function updatePlayerChArraysInSupabase() {
  console.log('updatePlayerChArraysInSupabase called');
  try {
    const playerChDataArray = playerChData;
    const playerChAbilitiesArray = playerChAbilities;
    const playerChEquipmentArray = playerChEquipment;
    const playerChMoneyArray = playerChMoney;
    const playerChStateArray = playerChState;
    const playerChPositionArray = playerChPosition;
    console.log('playerChDataArray: ', playerChDataArray);

    /*const updatedPlayerChData = playerChDataArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });

    const updatedPlayerChAbilities = playerChAbilitiesArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });

    const updatedPlayerChEquipment = playerChEquipmentArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });

    const updatedPlayerChMoney = playerChMoneyArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });

    const updatedPlayerChState = playerChStateArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });

    const updatedPlayerChPosition = playerChPositionArray.map(item => {
      const { id, ...propertiesWithoutId } = item;
      return propertiesWithoutId;
    });*/

    await updateWholeTable('player_ch_data', playerChDataArray);
    await updateWholeTable('player_ch_abilities', playerChAbilitiesArray);
    await updateWholeTable('player_ch_equipment', playerChEquipmentArray);
    await updateWholeTable('player_ch_money', playerChMoneyArray);
    await updateWholeTable('player_ch_state', playerChStateArray);
    await updateWholeTable('player_ch_position', playerChPositionArray);

    console.log('Arrays updated in Supabase successfully');
  } catch (error) {
    console.error('Error updating arrays in Supabase:', error.message);
  }
}

export { pcs, setPcs, pc, setPc, updatePlayerCh, getNextFreeIndex };

// Load Supabase tables at startup.
async function loadPlayerChArray() {
  const initialData = await fetchPlayerChProps('player_ch_data', '*');
  const initialAbilities = await fetchPlayerChProps('player_ch_abilities', '*');
  const initialEquipment = await fetchPlayerChProps('player_ch_equipment', '*');
  const initialMoney = await fetchPlayerChProps('player_ch_money', '*');
  const initialState = await fetchPlayerChProps('player_ch_state', '*');
  const initialPositions = await fetchPlayerChProps('player_ch_position', '*');
  setPlayerChData([...initialData]);
  setPlayerChAbilities([...initialAbilities]);
  setPlayerChEquipment([...initialEquipment]);
  setPlayerChMoney([...initialMoney]);
  setPlayerChState([...initialState]);
  setPlayerChPosition([...initialPositions]);
}

function Cast() {

  onMount(() => {
    // Call the loadPlayerChArray function to fetch and set data on component mount
    loadPlayerChArray();
    console.log('Cast onMount: ', playerChData, playerChEquipment);
  });
  
  return (
    <div class="text-base tracking-widest font-hultog-italic">
      Cast
    </div>
  );
}

export default Cast;
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { creatureList } from './oddpendium.jsx';
import { fetchPlayerChProps, updateWholeTable } from './dbUtils.js';
import { MAX_PLAYER_CHS } from './constants.js';

const [playerChIndex, setPlayerChIndex] = createSignal(0);
export { playerChIndex, setPlayerChIndex };
const [companionIndex, setCompanionIndex] = createSignal(1);
export { companionIndex, setCompanionIndex };

// Signal to store index used to display playerCh arrays.
const [displayIndex, setDisplayIndex] = createSignal(0);
export { displayIndex, setDisplayIndex };

// Declare player character stores.
const playerChDataArray = [];
const playerChAbilitiesArray = [];
const playerChEquipmentArray = [];
const playerChMoneyArray = [];
const playerChStateArray = [];
const playerChPositionArray = [];

for (let i = 0; i < MAX_PLAYER_CHS; i++) {
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
    id:0,
    ability: ["", "", "", "", "", "", "", "", "", ""],
  };
  playerChAbilitiesArray.push(abilitiesObject);
  const equipmentObject = {
    id: 0,
    equipment: ["", "", "", "", "", "", "", "", "", ""],
  };
  playerChEquipmentArray.push(equipmentObject);
  const moneyObject = {
    id: 0,
    shillings: 0,
    pennies: 0,
    guilders: 0,
  }
  playerChMoneyArray.push(moneyObject);
  const stateObject = {
    id: 0,
    condition: "",
  }
  playerChStateArray.push(stateObject);
  const positionObject = {
    id: 0,
    x: 0,
    y: 0,
    onScreen: false,
  }
  playerChPositionArray.push(positionObject);
}
export const [playerChData, setPlayerChData] = createStore(playerChDataArray);
export const [playerChAbilities, setPlayerChAbilities] = createStore(playerChAbilitiesArray);
export const [playerChEquipment, setPlayerChEquipment] = createStore(playerChEquipmentArray);
export const [playerChMoney, setPlayerChMoney] = createStore(playerChMoneyArray);
export const [playerChState, setPlayerChState] = createStore(playerChStateArray);
export const [playerChPosition, setPlayerChPosition] = createStore(playerChPositionArray);

function PcsToJson() {
}

function JsonToPcs() {
}

export function isCreature(name) {
  return creatureList.includes(name);
}

/* Copy new data to playerCh arrays, identified by index (int) and propertyType ('data',
   'abilities', 'equipment', 'money', 'state', 'position'. They are Supabase tables. */
export function updatePlayerCh(index, propertyType, updatedProperties) {
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
}

// Iterates through playerChData from position 0 until element with empty name is found.
export function getNextFreeIndex() {
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
    updatedPlayerChPosition[getNextFreeIndex] = playerChPositionCopy;
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

// Check if playerCh[0] exists elsewhere in the playerCh array.
export function playerChExists(playerChName) {
  console.log('Check if player name exists: ', playerChName, playerChData[displayIndex()].name, playerChData[playerChIndex()].name)
  let playerChFound = false;
  for (let i = 2; i < MAX_PLAYER_CHS; i++) {
    if (playerChName === playerChData[i].name) {
      playerChFound = true;
    }
  }
  console.log('playerExists: ', playerChFound);
  return(playerChFound);
}

export function savePlayerCh() {
  console.log('savePlayerCh - before: playerChIndex ', playerChIndex(), 'displayIndex: ', displayIndex());
  let index = 0;
  if (!playerChExists(playerChData[0].name)){
    index = getNextFreeIndex();
    setPlayerChIndex(index);
  } else {
    console.log('Player Ch already exists - no new slot required: ', displayIndex());
  }
  console.log('savePlayerCh - after: playerChIndex ', playerChIndex(), 'displayIndex: ', displayIndex(), index);

  if (index !== -1) {
    // displayIndex() returns 0 normally, but not always.
    copyRowWithoutId(displayIndex(), index, playerChData, setPlayerChData);
    copyRowWithoutId(displayIndex(), index, playerChAbilities, setPlayerChAbilities);
    copyRowWithoutId(displayIndex(), index, playerChEquipment, setPlayerChEquipment);
    copyRowWithoutId(displayIndex(), index, playerChMoney, setPlayerChMoney);
    copyRowWithoutId(displayIndex(), index, playerChState, setPlayerChState);
    copyRowWithoutId(displayIndex(), index, playerChPosition, setPlayerChPosition);

    // Check if companion assigned. If true, copy companion.
    if (playerChData[0].companion) {
      console.log('Copy companion: ', playerChData[displayIndex() + 1].companion);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChData, setPlayerChData);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChAbilities, setPlayerChAbilities);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChEquipment, setPlayerChEquipment);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChMoney, setPlayerChMoney);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChState, setPlayerChState);
      copyRowWithoutId(displayIndex() + 1, index + 1, playerChPosition, setPlayerChPosition);
    } else {
      // Set companion to default playerCh.
    }

    setDisplayIndex(index); // Display index is set to any player that is saved, whether existing or rolled.
    console.log('savePlayerCh - data: ', playerChData, 'displayIndex: ',displayIndex(), 'playerChIndex: ', playerChIndex());
    updatePlayerChArraysInSupabase()
  } else {
    console.log('Maximum Player Characters reached.');
  }
}

export function goHome() {
  const homeIndex = playerChIndex();
  setDisplayIndex(homeIndex)
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
  });
  
  return (
    <div class="text-base tracking-widest font-hultog-italic">
      Cast
    </div>
  );
}

export default Cast;
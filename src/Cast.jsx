import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { abilitiesFirstList } from './oddpendium.jsx';
import { fetchPlayerChProps, updatePlayerChProps } from './dbUtils.js';
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
  playerChDataArray.push({});
  playerChAbilitiesArray.push({});
  playerChEquipmentArray.push({});
  playerChMoneyArray.push({});
  playerChStateArray.push({});
  playerChPositionArray.push({});
}
export const [playerChData, setPlayerChData] = createStore(playerChDataArray);
export const [playerChAbilities, setPlayerChAbilities] = createStore(playerChAbilitiesArray);
export const [playerChEquipment, setPlayerChEquipment] = createStore(playerChEquipmentArray);
export const [playerChMoney, setPlayerChMoney] = createStore(playerChMoneyArray);
export const [playerChState, setPlayerChState] = createStore(playerChStateArray);
export const [playerChPosition, setPlayerChPosition] = createStore(playerChPositionArray);


const defaultPlayerCh = {

}

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
  }
  
// Copy new data to pcs array, identified by index.
function updatePc(index, updatedProperties) {
  console.log('updatePlayerCh: ', index, updatedProperties);

  setPcs((prevPcs) => {
    const newPcs = [...prevPcs];

    if (index >= 0 && index < MAX_PCS) {
      newPcs[index] = {
        ...newPcs[index],
        ...updatedProperties,
      };
    }
    return newPcs;
  });
}



// Iterates through pcs[i] from position 0 until element with empty name is found.
function getNextPcIndex() {
  for (let i = 0; i < pcs.length; i += 2) {
    if (pcs[i].name === '') {
      console.log('EmptyPcSlot found at: ', i);
      return i;
    }
  }
  return -1; // Return -1 if no element with empty 'name' is found
}

export { pcs, setPcs, pc, setPc, updatePc, updatePlayerCh, getNextPcIndex };

async function loadPlayerChArray() {
  setPlayerChData(fetchPlayerChProps('player_ch_data', '*'));
  setPlayerChAbilities(fetchPlayerChProps('player_ch_abilities', '*'));
  setPlayerChEquipment(fetchPlayerChProps('player_ch_equipment', '*'));
  setPlayerChMoney(fetchPlayerChProps('player_ch_money', '*'));
  setPlayerChState(fetchPlayerChProps('player_ch_state', '*'));
  setPlayerChPosition(fetchPlayerChProps('player_ch_position', '*'));
}

function Cast() {

  onMount(() => {
    // Call the loadPcs function to fetch and set data on component mount
    loadPlayerChArray();
  });
  
  return (
    <div class="text-base tracking-widest font-hultog-italic">
      Cast
    </div>
  );
}

export default Cast;
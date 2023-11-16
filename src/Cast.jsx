import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { abilitiesFirstList } from './oddpendium.jsx';

const [playerIndex, setPlayerIndex] = createSignal(0);
export { playerIndex, setPlayerIndex };
const [companionIndex, setCompanionIndex] = createSignal(1);
export { companionIndex, setCompanionIndex };
const [displayIndex, setDisplayIndex] = createSignal(0);
export { displayIndex, setDisplayIndex };

export function abilitiesFirst(name) {
  return abilitiesFirstList.includes(name);
}

const defaultPlayer = {
  id: 0,
  classification: '',
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
  category: '',
};

const initialPlayers = new Array(8).fill(defaultPlayer);
const [players, setPlayers] = createStore(initialPlayers);

// Functions to convert to and from JSON.
export function playersToJson(playersArray) {
  return JSON.stringify(playersArray);
}

export function JsonToPlayers(jsonString) {
  return JSON.parse(jsonString);
}

function updatePlayer(index, updatedProperties) {
  console.log('Inside updatePlayer: ', index, updatedProperties);

  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];

    if (index >= 0 && index < 8) {
      newPlayers[index] = {
        ...newPlayers[index],
        ...updatedProperties,
      };
    }
    return newPlayers;
  });
}

export { players, setPlayers, updatePlayer };

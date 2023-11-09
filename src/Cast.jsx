import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

const [playerIndex, setPlayerIndex] = createSignal(0);
export { playerIndex, setPlayerIndex };
const [companionIndex, setCompanionIndex] = createSignal(1);
export { companionIndex, setCompanionIndex };


const defaultPlayer = {
  id: 0,
  classification: '',
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
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

function updatePlayer(playerIndex, updatedProperties) {
  console.log('Inside updatePlayer: ', playerIndex, updatedProperties);

  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];

    if (playerIndex >= 0 && playerIndex < 8) {
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        ...updatedProperties,
      };
    }
    return newPlayers;
  });
}

export { players, setPlayers, updatePlayer };

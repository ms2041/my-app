import { player, setPlayer, getHighestAbility } from './Player';
import { players, setPlayers, playerIndex, companionIndex, updatePlayer } from './Cast';
import { starterPackages, arcanum } from './oddpendium';
import { getRandomInt } from './utils';

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

// Increment the equipmentPtr for a specific player
function incrementEquipmentPtr() {
  updatePlayer(playerIndex(), { equipmentPtr: players[playerIndex()].equipmentPtr + 1 });
  console.log('incrementEquipmentPtr: ', players[playerIndex()].equipmentPtr);
}

function addEquipment(item, slot) {
  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];

    if (playerIndex() >= 0 && playerIndex() < 8) {
      const updatedEquipment = [...newPlayers[playerIndex()].equipment];
      updatedEquipment[slot] = item;
      
      newPlayers[playerIndex()] = {
        ...newPlayers[playerIndex()],
        equipment: updatedEquipment,
      };
    }
    incrementEquipmentPtr();
    return newPlayers;
  });
}

export function getStarterPackage() {
  // Choose a starter package and initialise player with equipment.
  let i = players[playerIndex()].hp - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('getStarterPackage Column, Row: ', playerIndex(), starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], players[playerIndex()].equipmentPtr);

  const newEquipment = [...selectedPackage.equipment];
  updatePlayer(playerIndex(), { equipmentPtr: newEquipment.length });

  // Ensure the equipment array has a length of 10
  while (newEquipment.length < 10) {
    newEquipment.push(''); // Fill with empty strings
  }
  
  // Update players array with starter package.
  updatePlayer(playerIndex(), { equipment: newEquipment,
                                specialInformation: selectedPackage.specialInformation,
                                companion: selectedPackage.companion });

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    console.log('Selected arcana: ', selectedArcana.name);
    addEquipment(selectedArcana.name, players[playerIndex()].equipmentPtr);
    console.log('Arcana added ', players[playerIndex()].equipment, ' at ', players[playerIndex()].equipmentPtr)
  }

  console.log('getStarterPackage called ', players[playerIndex()]);

  return starterPackages[i][j];
} 

function handleLeftClick(index) {
  console.log('handleLeftClick: ', index, players[playerIndex()].equipment, players[playerIndex()].equipmentPtr);
  if (players[playerIndex()].equipment[index] === '') {
    selectEquipment(index);
  }
}

// Add equipment to equipment array.
function selectEquipment(index) {
  console.log('selectEquipment: ', index);
}

function Equipment() {
  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-xs">
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
        on:click={() => handleLeftClick(0)}>{players[playerIndex()].equipment[0] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(1)}>{players[playerIndex()].equipment[1] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(2)}>{players[playerIndex()].equipment[2] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(3)}>{players[playerIndex()].equipment[3] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(4)}>{players[playerIndex()].equipment[4] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(5)}>{players[playerIndex()].equipment[5] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(6)}>{players[playerIndex()].equipment[6] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(7)}>{players[playerIndex()].equipment[7] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(8)}>{players[playerIndex()].equipment[8] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(9)}>{players[playerIndex()].equipment[9] || ''}</div>
    </div>
  );
}

export default Equipment;

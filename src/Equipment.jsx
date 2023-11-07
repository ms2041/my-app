import { player, setPlayer, getHighestAbility } from './Player';
import { starterPackages, arcanum } from './oddpendium';
import { getRandomInt } from './utils';

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

function incrementEquipmentPtr() {
  setPlayer((prevPlayer) => {
    const updatedPlayer = { ...prevPlayer };
    updatedPlayer.equipmentPtr++;
    return updatedPlayer;
  });
}

function addArcana(item, index) {
  setPlayer({ equipment: { ...player.equipment, [index]: item + '*' } });
  incrementEquipmentPtr();
}  

export function getStarterPackage() {
  // Choose a starter package and initialise player with equipment.
  let i = player.hp - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('Column, Row: ', starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], player.equipmentPtr);

  const newEquipment = [...selectedPackage.equipment];

  // Ensure the equipment array has a length of 10
  while (newEquipment.length < 10) {
    newEquipment.push(''); // Fill with empty strings
  }
  setPlayer({equipment: newEquipment});
  setPlayer({equipmentPtr: selectedPackage.equipment.length});

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    console.log('Selected arcana: ', selectedArcana.name, player.equipmentPtr);
    addArcana(selectedArcana.name, player.equipmentPtr);
    console.log('Arcana added ', player.equipment, ' at ', player.equipmentPtr)
  }
  setPlayer({companion: selectedPackage.companion});
  setPlayer({specialInformation: selectedPackage.specialInformation});

  console.log('getStarterPackage called ', player);

  return starterPackages[i][j];
} 

function handleLeftClick(index) {
  console.log('handleLeftClick: ', index, player.equipment, player.equipmentPtr);
  if (player.equipment[index] === '') {
    addEquipment(index);
  }
}

// Add equipment to equipment array.
function addEquipment(index) {
  console.log('addEquipment: ', index);
}

function Equipment() {
  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-xs">
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
        on:click={() => handleLeftClick(0)}>{player.equipment[0] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(1)}>{player.equipment[1] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(2)}>{player.equipment[2] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(3)}>{player.equipment[3] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(4)}>{player.equipment[4] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(5)}>{player.equipment[5] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(6)}>{player.equipment[6] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(7)}>{player.equipment[7] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(8)}>{player.equipment[8] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(9)}>{player.equipment[9] || ''}</div>
    </div>
  );
}

export default Equipment;

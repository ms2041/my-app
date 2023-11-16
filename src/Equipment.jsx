import { getHighestAbility, equipmentToggle } from './Player';
import { players, setPlayers, playerIndex, companionIndex, displayIndex, updatePlayer, abilitiesFirst } from './Cast';
import { starterPackages, arcanum } from './oddpendium';
import { getRandomInt } from './utils';
import EquipmentModal from './EquipmentModal';
import { createSignal } from 'solid-js';


const [showModal, setShowModal] = createSignal(false);
const [selectedItem, setSelectedItem] = createSignal(null);
const [selectedSlot, setSelectedSlot] = createSignal(null);

export function reorderEquipment() {
  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];
    const currentPlayer = newPlayers[displayIndex()];

    // Remove empty strings from the equipment array
    const filteredEquipment = currentPlayer.equipment.filter(item => item !== '');

    // Add empty strings to maintain a length of 10
    while (filteredEquipment.length < 10) {
      filteredEquipment.push('');
    }

    // Update the player's equipment array
    newPlayers[displayIndex()] = {
      ...currentPlayer,
      equipment: filteredEquipment,
    };

    return newPlayers;
  });
}

function removeEquipment(slot) {
  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];

    const index = displayIndex();

    if (index >= 0 && index < 8) {
      const { equipment } = newPlayers[index];

      // Replace the item at the specified slot with an empty string
      equipment[slot] = '';

      newPlayers[index] = {
        ...newPlayers[index],
        equipment: equipment,
      };

      // Call reorderEquipment to ensure contiguous items
      console.log('removeEquipment: ', slot, players[displayIndex()].equipment);

      // Calculate the new equipmentPtr
      const newEquipmentPtr = equipment.filter(item => item !== '').length;

      newPlayers[index] = {
        ...newPlayers[index],
        equipmentPtr: newEquipmentPtr,
      };
    }

    return newPlayers;
  });
}

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

// Increment the equipmentPtr for a specific player
export function incrementEquipmentPtr() {
  updatePlayer(displayIndex(), { equipmentPtr: players[displayIndex()].equipmentPtr + 1 });
  console.log('incrementEquipmentPtr: ', players[displayIndex()].equipmentPtr);
}

export function addEquipment(item, slot) {
  console.log('addEquipment: ', item, slot);
  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];

    if (displayIndex() >= 0 && displayIndex() < 8) {
      const updatedEquipment = [...newPlayers[displayIndex()].equipment];
      updatedEquipment[slot] = item;
      
      newPlayers[displayIndex()] = {
        ...newPlayers[displayIndex()],
        equipment: updatedEquipment,
      };
    }
    incrementEquipmentPtr();
    return newPlayers;
  });
}

export function getStarterPackage() {
  // Choose a starter package and initialise player with equipment.
  let i = players[displayIndex()].hp - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('getStarterPackage Column, Row: ', displayIndex(), starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], players[displayIndex()].equipmentPtr);

  const newEquipment = [...selectedPackage.equipment];
  updatePlayer(displayIndex(), { equipmentPtr: newEquipment.length });

  // Ensure the equipment array has a length of 10
  while (newEquipment.length < 10) {
    newEquipment.push(''); // Fill with empty strings
  }
  
  // Update players array with starter package.
  updatePlayer(displayIndex(), { equipment: newEquipment,
                                specialInformation: selectedPackage.specialInformation,
                                companion: selectedPackage.companion });

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    console.log('Selected arcana: ', selectedArcana.name);
    addEquipment(selectedArcana.name, players[displayIndex()].equipmentPtr);
    console.log('Arcana added ', players[displayIndex()].equipment, ' at ', players[displayIndex()].equipmentPtr)
  }

  console.log('getStarterPackage called ', players[displayIndex()]);

  return starterPackages[i][j];
} 

// Add equipment to equipment array.
function selectEquipment(index) {
  console.log('selectEquipment: ', index);
  setSelectedItem(players[displayIndex()].equipment[index]);
  setShowModal(true);
}

function handleLeftClick(slot) {
  setSelectedSlot(slot);
  console.log('handleLeftClick: ', slot, players[displayIndex()].equipment, players[displayIndex()].equipmentPtr, ' Slot: ', selectedSlot());
  if (players[displayIndex()].equipment[slot] === '') {
    setSelectedItem(null); // Reset selected item when selecting an empty slot
    setShowModal(true);
    selectEquipment(slot);
  } else {
    removeEquipment(slot);
    reorderEquipment();
  }
}

function closeModal() {
  setShowModal(false);
}


function Equipment() {
  
  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-base">
      {equipmentToggle()
        ? players[displayIndex()].equipment.map((equipmentItem, index) => (
            <div class=" rounded p-1 hover:text-blue-300 bg-neutral-800 cursor-pointer px-2" on:click={() => handleLeftClick(index)}>
              {equipmentItem || ''}
            </div>
          ))
        : players[displayIndex()].abilities.map((ability, index) => (
            <div class="bg-neutral-800 rounded p-1 cursor-not-allowed px-2">{ability}</div>
          ))
      }
      {showModal() && (
        <EquipmentModal onClose={closeModal} selectedSlot={[selectedSlot, setSelectedSlot]} />
      )}
    </div>
  );
}

export default Equipment;

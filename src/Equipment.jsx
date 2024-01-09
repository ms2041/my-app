import { getHighestAbility, equipmentToggle } from './PlayerCh';
import { playerChEquipment, setPlayerChEquipment, playerChData, companionIndex, displayIndex} from './Cast';
import { starterPackages, arcanum, items } from './oddpendium';
import { getRandomInt } from './generalUtils';
import { subscribeToPlayerChEquipment } from './dbUtils';
import { createSignal, onMount } from 'solid-js';
import { MAX_EQUIPMENT_SLOTS, MAX_PLAYER_CHS, MAX_PLAYERS } from './constants';

import EquipmentModal from './EquipmentModal';


const [showEquipmentModal, setShowEquipmentModal] = createSignal(false);
const [selectedItem, setSelectedItem] = createSignal(null);
const [selectedSlot, setSelectedSlot] = createSignal(null);

// After an item is added or deleted, the equipment array is reordered.
export function reorderEquipment() {
  setPlayerChEquipment((prevEquipment) => {
    const newEquipment = [...prevEquipment];
    const currentEquipment = newEquipment[displayIndex()];

    // Remove empty strings from the equipment array
    const filteredEquipment = currentEquipment.equipment.filter(item => item !== '');

    // Add empty strings to maintain a length of MAX_EQUIPMENT_SLOTS.
    while (filteredEquipment.length < MAX_EQUIPMENT_SLOTS) {
      filteredEquipment.push('');
    }

    // Update the character's equipment array
    newEquipment[displayIndex()] = {
      ...currentEquipment,
      equipment: filteredEquipment,
    };

    return newEquipment;
  });
}

// Remove an item from inventory identified by slot number.
function removeEquipment(slot) {
  setPlayerChEquipment((prevEquipment) => {
    const newEquipment = [...prevEquipment];

    const index = displayIndex();

    if (index >= 0 && index < MAX_PLAYERS) {
      const { equipment } = newEquipment[index];

      // Replace the item at the specified slot with an empty string
      equipment[slot] = '';

      newEquipment[index] = {
        ...newEquipment[index],
        equipment: equipment,
      };

      console.log('removeEquipment: ', slot, playerChEquipment[displayIndex()].equipment);

      newEquipment[index] = {
        ...newEquipment[index],
      };
    }

    return newEquipment;
  });
}

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

// Search items array for item that matches a itemName.
export function getItem(itemName) {
  const foundItem = items.find(item => {
    return item.name.toLowerCase() === itemName.toLowerCase();
  });

  if (foundItem) {
    return foundItem;
  } else {
    console.log(`Item '${itemName}' not found:`, foundItem);
    return null;
  }
}

// Calculate free slots available to see if item can be added.
export function freeSlots() {
  const index = displayIndex();
  let slotsSum = 0;
  for (let i = 0; i < playerChEquipment[index].equipment.length; i++) {
    if (playerChEquipment[index].equipment[i] !== "") {
      const item = getItem(playerChEquipment[index].equipment[i]);
      if ((item != null) && (item.name != "")) {
        slotsSum = slotsSum + item.slots;
      }
    }
  }
  return (MAX_EQUIPMENT_SLOTS - slotsSum);
}

// Find next empty slot in the inventory and return it's pointer.
function getNextFreeSlot() {
  // Assume that the inventory is ordered.
  const inventory = playerChEquipment;
  const index = displayIndex();
  console.log('getNextFreeSlot: ', inventory, index);
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[index].equipment[i] === '') {
      console.log('getNextFreeSlot found: ', i);
      return i;
    }
  }
  console.log('getNextFreeSlot NOT found.');
  return(-1);
}

// Add an item to a player character's equipment array.
export function addEquipment(item, slot) {
  console.log('addEquipment: ', item, slot);

  setPlayerChEquipment((prevEquipment) => {
    const index = displayIndex();

    if (index >= 0 && index < MAX_PLAYER_CHS) {
      const updatedEquipment = [...prevEquipment];
      const updatedPlayerEquipment = { ...updatedEquipment[index] }; // Create a copy of the player's equipment object

      // Create a new copy of the equipment array within the player's equipment object
      const updatedEquipmentArray = [...updatedPlayerEquipment.equipment];
      updatedEquipmentArray[slot] = item; // Update the specific slot with the new item
      updatedPlayerEquipment.equipment = updatedEquipmentArray; // Update the equipment array in the copied object

      updatedEquipment[index] = updatedPlayerEquipment; // Update the player's equipment object in the main array
      return updatedEquipment; // Return the updated array
    }

    return prevEquipment; // Return previous state if no changes are made
  });
}

// Read starter package based on player attributes and populate player tables.
export function getStarterPackage() {
  const index = displayIndex();
  const playerHP = playerChData[index]?.hp ?? 1;

  let i = playerHP - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('getStarterPackage Column, Row: ', index, starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j]);

  const newEquipment = [...selectedPackage.equipment];
  const updatedEquipment = Array(MAX_EQUIPMENT_SLOTS).fill(''); // Create an array of length MAX_EQUIPMENT_SLOTS filled with empty strings

  // Fill updatedEquipment with newEquipment data if available
  newEquipment.forEach((item, index) => {
    updatedEquipment[index] = item;
  });

  // Fill PlayerChEquipment array from the starter package.
  setPlayerChEquipment((prevEquipment) => {
    const updatedPlayerEquipment = [...prevEquipment];
    updatedPlayerEquipment[index] = {
      ...updatedPlayerEquipment[index],
      equipment: updatedEquipment,
      //characteristics: selectedPackage.characteristics,
      //companion: selectedPackage.companion,
    };
    console.log('companion value 1: ', index);
    // console.log('updatedPlayerEquipment: ', updatedPlayerEquipment);
    return updatedPlayerEquipment;
  });

  console.log('companion value 2: ', index);

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    const slot = getNextFreeSlot();
    console.log('Selected arcana + slot: ', selectedArcana.name, slot);
    addEquipment(selectedArcana.name, slot);
    console.log('Arcana added ', playerChEquipment[index]?.equipment, ' at ', slot);
  }

  console.log('getStarterPackage called ', playerChEquipment[index]);

  return starterPackages[i][j];
}

// Add equipment to equipment array.
function selectEquipment(index) {
  console.log('selectEquipment: ', index);
  setSelectedItem(playerChEquipment[displayIndex()].equipment[index]);
  setShowEquipmentModal(true);
}

function handleLeftClick(slot) {
  setSelectedSlot(slot);
  console.log('handleLeftClick: ', slot);
  if (playerChEquipment[displayIndex()].equipment[slot] === '') {
    setSelectedItem(null); // Reset selected item when selecting an empty slot
    setShowEquipmentModal(true);
    selectEquipment(slot);
  } else {
    removeEquipment(slot);
    reorderEquipment();
  }
}

function closeEquipmentModal() {
  setShowEquipmentModal(false);
}

export function handlePlayerChEquipmentUpdate(updatedData) {
  console.log('handlePlayerChEquipmentUpdate called:', updatedData);
  console.log('data payload: ', updatedData.new);
  const newData = [...playerChData]; // Create a copy of the current playerChData store
  let index = updatedData.new.id - 1;

  setPlayerChEquipment((prevData) => {
    return prevData.map((item, i) => {
      if (i === index) {
        return {
          id: updatedData.new.id,
          equipment: updatedData.new.equipment,
        };
      }
      return item;
    });
  });

}

// Equipment component.
function Equipment() {
  const equipment = playerChEquipment;
  console.log('Equipment: ', equipment);

  onMount(() => {

    // Subscribe to player_ch_data updates when the component mounts
    const unsubscribe = subscribeToPlayerChEquipment(handlePlayerChEquipmentUpdate);

    // To unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  });

  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-base">
      {equipment[displayIndex()] && equipment[displayIndex()].equipment && (
        equipment[displayIndex()].equipment.map((equipmentItem, index) => (
          <div class="rounded p-1 hover:text-blue-300 bg-neutral-800 cursor-pointer px-2" on:click={() => handleLeftClick(index)}>
            {equipmentItem || ''}
          </div>
        ))
      )}
      {showEquipmentModal() && (
        <EquipmentModal onClose={closeEquipmentModal} selectedSlot={[selectedSlot, setSelectedSlot]} />
      )}
    </div>
  );
}

export default Equipment;

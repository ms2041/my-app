import { getHighestAbility, equipmentToggle } from './PlayerCh';
import { playerChEquipment, setPlayerChEquipment, playerChData, pcIndex, companionIndex, displayIndex, updatePc, abilitiesFirst } from './Cast';
import { starterPackages, arcanum } from './oddpendium';
import { getRandomInt } from './generalUtils';
import { createSignal, createEffect } from 'solid-js';
import { MAX_EQUIPMENT_SLOTS, MAX_PCS } from './constants';
import EquipmentModal from './EquipmentModal';


const [showEquipmentModal, setShowEquipmentModal] = createSignal(false);
const [selectedItem, setSelectedItem] = createSignal(null);
const [selectedSlot, setSelectedSlot] = createSignal(null);

export function reorderEquipment() {
  setPlayerChEquipment((prevEquipment) => {
    const newEquipment = [...prevEquipment];
    const currentEquipment = newEquipment[displayIndex()];

    // Remove empty strings from the equipment array
    const filteredEquipment = currentEquipment.equipment.filter(item => item !== '');

    // Add empty strings to maintain a length of 10
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

function removeEquipment(slot) {
  setPlayerChEquipment((prevEquipment) => {
    const newEquipment = [...prevEquipment];

    const index = displayIndex();

    if (index >= 0 && index < 8) {
      const { equipment } = newEquipment[index];

      // Replace the item at the specified slot with an empty string
      equipment[slot] = '';

      newEquipment[index] = {
        ...newEquipment[index],
        equipment: equipment,
      };

      console.log('removeEquipment: ', slot, playerChEquipment[displayIndex()].equipment);

      // Calculate the new equipmentPtr
      const newEquipmentPtr = equipment.filter(item => item !== '').length;

      newEquipment[index] = {
        ...newEquipment[index],
        equipmentPtr: newEquipmentPtr,
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

// Increment the equipmentPtr for a specific player character
export function incrementEquipmentPtr() {
  const currentEquipmentPtr = playerChEquipment[displayIndex()].equipmentPtr;
  setPlayerChEquipment((prevEquipment) => {
    const updatedEquipment = [...prevEquipment];
    updatedEquipment[displayIndex()] = {
      ...updatedEquipment[displayIndex()],
      equipmentPtr: currentEquipmentPtr + 1,
    };
    return updatedEquipment;
  });
  console.log('incrementEquipmentPtr: ', currentEquipmentPtr + 1);
}

export function addEquipment(item, slot) {
  console.log('addEquipment: ', item, slot);

  setPlayerChEquipment((prevEquipment) => {
    const index = displayIndex();

    if (index >= 0 && index < MAX_PCS) {
      const updatedEquipment = [...prevEquipment];
      updatedEquipment[displayIndex()].equipment[slot] = item;

      incrementEquipmentPtr(); // Assuming incrementEquipmentPtr is already updated to use playerChEquipment

      return updatedEquipment;
    }

    return prevEquipment;
  });
}

export function getStarterPackage() {
  const index = displayIndex();
  const playerEquipmentPtr = playerChEquipment[index]?.equipmentPtr ?? 0;
  const playerHP = playerChData[index]?.hp ?? 1;

  let i = playerHP - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('getStarterPackage Column, Row: ', index, starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], playerEquipmentPtr);

  const newEquipment = [...selectedPackage.equipment];
  const updatedEquipment = Array(10).fill(''); // Create an array of length 10 filled with empty strings

  // Fill updatedEquipment with newEquipment data if available
  newEquipment.forEach((item, idx) => {
    updatedEquipment[idx] = item;
  });

  setPlayerChEquipment((prevEquipment) => {
    const updatedPlayerEquipment = [...prevEquipment];
    updatedPlayerEquipment[index] = {
      ...updatedPlayerEquipment[index],
      equipment: updatedEquipment,
      equipmentPtr: updatedEquipment.length,
      // specialInformation: selectedPackage.specialInformation,
      // companion: selectedPackage.companion,
    };
    console.log('updatedPlayerEquipment: ', updatedPlayerEquipment);
    return updatedPlayerEquipment;
  });

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    console.log('Selected arcana: ', selectedArcana.name);
    addEquipment(selectedArcana.name, playerEquipmentPtr);
    console.log('Arcana added ', playerChEquipment[index]?.equipment, ' at ', playerEquipmentPtr);
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
  console.log('handleLeftClick: ', slot, playerChEquipment[displayIndex()].equipment, playerChEquipment[displayIndex()].equipmentPtr, ' Slot: ', selectedSlot());
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

function Equipment() {
  const equipment = playerChEquipment;
  console.log('Equipment: ', equipment);

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

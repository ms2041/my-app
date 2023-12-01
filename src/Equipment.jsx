import { getHighestAbility, equipmentToggle } from './Pc';
import { pcs, setPcs, pcIndex, companionIndex, displayIndex, updatePc, abilitiesFirst } from './Cast';
import { starterPackages, arcanum } from './oddpendium';
import { getRandomInt } from './generalUtils';
import EquipmentModal from './EquipmentModal';
import { createSignal } from 'solid-js';


const [showEquipmentModal, setShowEquipmentModal] = createSignal(false);
const [selectedItem, setSelectedItem] = createSignal(null);
const [selectedSlot, setSelectedSlot] = createSignal(null);

export function reorderEquipment() {
  setPcs((prevPcs) => {
    const newPcs = [...prevPcs];
    const currentPc = newPcs[displayIndex()];

    // Remove empty strings from the equipment array
    const filteredEquipment = currentPc.equipment.filter(item => item !== '');

    // Add empty strings to maintain a length of 10
    while (filteredEquipment.length < 10) {
      filteredEquipment.push('');
    }

    // Update the  character's equipment array
    newPcs[displayIndex()] = {
      ...currentPc,
      equipment: filteredEquipment,
    };

    return newPcs;
  });
}

function removeEquipment(slot) {
  setPcs((prevPcs) => {
    const newPcs = [...prevPcs];

    const index = displayIndex();

    if (index >= 0 && index < 8) {
      const { equipment } = newPcs[index];

      // Replace the item at the specified slot with an empty string
      equipment[slot] = '';

      newPcs[index] = {
        ...newPcs[index],
        equipment: equipment,
      };

      // Call reorderEquipment to ensure contiguous items
      console.log('removeEquipment: ', slot, pcs[displayIndex()].equipment);

      // Calculate the new equipmentPtr
      const newEquipmentPtr = equipment.filter(item => item !== '').length;

      newPcs[index] = {
        ...newPcs[index],
        equipmentPtr: newEquipmentPtr,
      };
    }

    return newPcs;
  });
}

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

// Increment the equipmentPtr for a specific player character
export function incrementEquipmentPtr() {
  updatePc(displayIndex(), { equipmentPtr: pcs[displayIndex()].equipmentPtr + 1 });
  console.log('incrementEquipmentPtr: ', pcs[displayIndex()].equipmentPtr);
}

export function addEquipment(item, slot) {
  console.log('addEquipment: ', item, slot);
  setPcs((prevPcs) => {
    const newPcs = [...prevPcs];

    if (displayIndex() >= 0 && displayIndex() < 8) {
      const updatedEquipment = [...newPcs[displayIndex()].equipment];
      updatedEquipment[slot] = item;
      
      newPcs[displayIndex()] = {
        ...newPcs[displayIndex()],
        equipment: updatedEquipment,
      };
    }
    incrementEquipmentPtr();
    return newPcs;
  });
}

export function getStarterPackage() {
  // Choose a starter package and initialise player characters with equipment.
  let i = pcs[displayIndex()].hp - 1;
  let j = getHighestAbility() - 3; // The range of the array is from 3 - 18.
  let selectedPackage = starterPackages[i][j];
  console.log('getStarterPackage Column, Row: ', displayIndex(), starterPackages.length, starterPackages[0].length, i, j, starterPackages[i][j], pcs[displayIndex()].equipmentPtr);

  const newEquipment = [...selectedPackage.equipment];
  updatePc(displayIndex(), { equipmentPtr: newEquipment.length });

  // Ensure the equipment array has a length of 10
  while (newEquipment.length < 10) {
    newEquipment.push(''); // Fill with empty strings
  }
  
  // Update player characters array with starter package.
  updatePc(displayIndex(), { equipment: newEquipment,
                                specialInformation: selectedPackage.specialInformation,
                                companion: selectedPackage.companion });

  if (selectedPackage.arcanum) {
    let selectedArcana = getArcana();
    console.log('Selected arcana: ', selectedArcana.name);
    addEquipment(selectedArcana.name, pcs[displayIndex()].equipmentPtr);
    console.log('Arcana added ', pcs[displayIndex()].equipment, ' at ', pcs[displayIndex()].equipmentPtr)
  }

  console.log('getStarterPackage called ', pcs[displayIndex()]);

  return starterPackages[i][j];
} 

// Add equipment to equipment array.
function selectEquipment(index) {
  console.log('selectEquipment: ', index);
  setSelectedItem(pcs[displayIndex()].equipment[index]);
  setShowEquipmentModal(true);
}

function handleLeftClick(slot) {
  setSelectedSlot(slot);
  console.log('handleLeftClick: ', slot, pcs[displayIndex()].equipment, pcs[displayIndex()].equipmentPtr, ' Slot: ', selectedSlot());
  if (pcs[displayIndex()].equipment[slot] === '') {
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
  
  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-base">
      {equipmentToggle()
        ? pcs[displayIndex()].equipment.map((equipmentItem, index) => (
            <div class=" rounded p-1 hover:text-blue-300 bg-neutral-800 cursor-pointer px-2" on:click={() => handleLeftClick(index)}>
              {equipmentItem || ''}
            </div>
          ))
        : pcs[displayIndex()].abilities.map((ability, index) => (
            <div class="bg-neutral-800 rounded p-1 cursor-not-allowed px-2">{ability}</div>
          ))
      }
      {showEquipmentModal() && (
        <EquipmentModal onClose={closeEquipmentModal} selectedSlot={[selectedSlot, setSelectedSlot]} />
      )}
    </div>
  );
}

export default Equipment;

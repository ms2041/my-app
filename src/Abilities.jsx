import { getHighestAbility, equipmentToggle } from './PlayerCh';
import { playerChAbilities, setPlayerChAbilities, playerChData, companionIndex, displayIndex} from './Cast';
import { starterPackages, arcanum, items } from './oddpendium';
import { getRandomInt } from './generalUtils';
import { subscribeToPlayerChAbilities } from './dbUtils';
import { createSignal, onMount } from 'solid-js';
import { MAX_ABILITIES_SLOTS, MAX_PLAYER_CHS, MAX_PLAYERS } from './constants';

import AbilitiesModal from './AbilitiesModal';


const [showAbilitiesModal, setShowAbilitiesModal] = createSignal(false);
const [selectedItem, setSelectedItem] = createSignal(null);
const [slotNumber, setSlotNumber] = createSignal(null);

// After an item is added or deleted, the Abilities array is reordered.
export function reorderAbilities() {
  setPlayerChAbilities((prevAbilities) => {
    const newAbilities = [...prevAbilities];
    const currentAbilities = newAbilities[displayIndex()];

    // Remove empty strings from the Abilities array
    const filteredAbilities = currentAbilities.ability.filter(item => item !== '');

    // Add empty strings to maintain a length of MAX_ABILITIES_SLOTS.
    while (filteredAbilities.length < MAX_ABILITIES_SLOTS) {
      filteredAbilities.push('');
    }

    // Update the character's Abilities array
    newAbilities[displayIndex()] = {
      ...currentAbilities,
      ability: filteredAbilities,
    };

    return newAbilities;
  });
}

function closeAbilitiesModal() {
  setShowAbilitiesModal(false);
}

// Remove an item from inventory identified by slot number.
function removeAbilities(slot) {
  setPlayerChAbilities((prevAbilities) => {
    const newAbilities = [...prevAbilities];

    const index = displayIndex();

    if (index >= 0 && index < MAX_PLAYERS) {
      const { ability } = newAbilities[index];

      // Replace the item at the specified slot with an empty string
      ability[slot] = '';

      newAbilities[index] = {
        ...newAbilities[index],
        ability: Abilities,
      };

      console.log('removeAbilities: ', slot, playerChAbilities[displayIndex()].ability);

      newAbilities[index] = {
        ...newAbilities[index],
      };
    }

    return newAbilities;
  });
}

function getArcana() {
  let item = arcanum[getRandomInt(arcanum.length)];
  console.log ('getArcana called ', item.name);
  return (item);
}

// Search items array for item that matches a itemName.
export function getItem(itemName) {
  console.log(`Searching for item: ${itemName}`);
  
  const foundItem = items.find(item => {
    // console.log(`Checking item: ${item.name}`);
    return item.name.toLowerCase() === itemName.toLowerCase();
  });

  if (foundItem) {
    console.log(`Item '${itemName}' found:`, foundItem);
    return foundItem;
  } else {
    console.log(`Item '${itemName}' not found.`);
    return null;
  }
}

// Calculate free slots available to see if item can be added.
export function freeSlots() {
  const index = displayIndex();
  let slotsSum = 0;
  for (let i = 0; i < playerChAbilities[index].ability.length; i++) {
    const item = getItem(playerChAbilities[index].ability[i]);
    if ((item != null) && (item.name != "")) {
      slotsSum = slotsSum + item.slots;
    }
  }
  console.log('freeSlots: ', MAX_ABILITIES_SLOTS - slotsSum);
  return (MAX_ABILITIES_SLOTS - slotsSum);
}

// Find next empty slot in the inventory and return it's pointer.
function getNextFreeSlot() {
  // Assume that the inventory is ordered.
  const abilityArray = playerChAbilities;
  const index = displayIndex();
  console.log('getNextFreeSlot: ', abilityArray, index);
  for (let i = 0; i < abilityArray.length; i++) {
    if (abilityArray[index].ability[i] === '') {
      console.log('getNextFreeSlot found: ', i);
      return i;
    }
  }
  console.log('getNextFreeSlot NOT found.');
  return(-1);
}

// Add an item to a player character's Abilities array.
export function addAbility(ability, slot) {
  console.log('addAbility: ', ability, slot);

  setPlayerChAbilities((prevAbilities) => {
    const index = displayIndex();

    if (index >= 0 && index < MAX_PLAYER_CHS) {
      const updatedAbilities = [...prevAbilities];
      const updatedPlayerAbilities = { ...updatedAbilities[index] }; // Create a copy of the player's Abilities object

      // Create a new copy of the Abilities array within the player's Abilities object
      const updatedAbilitiesArray = [...updatedPlayerAbilities.ability];
      updatedAbilitiesArray[slot] = ability; // Update the specific slot with the new item
      updatedPlayerAbilities.ability = updatedAbilitiesArray; // Update the Abilities array in the copied object

      updatedAbilities[index] = updatedPlayerAbilities; // Update the player's Abilities object in the main array
      return updatedAbilities; // Return the updated array
    }

    return prevAbilities; // Return previous state if no changes are made
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

  const newAbilities = [...selectedPackage.ability];
  const updatedAbilities = Array(MAX_ABILITIES_SLOTS).fill(''); // Create an array of length MAX_ABILITIES_SLOTS filled with empty strings

  // Fill updatedAbilities with newAbilities data if available
  newAbilities.forEach((ability, index) => {
    updatedAbilities[index] = ability;
  });

  // Fill PlayerChAbilities array from the starter package.
  setPlayerChAbilities((prevAbilities) => {
    const updatedPlayerAbilities = [...prevAbilities];
    updatedPlayerAbilities[index] = {
      ...updatedPlayerAbilities[index],
      ability: updatedAbilities,
      //characteristics: selectedPackage.characteristics,
      //companion: selectedPackage.companion,
    };
    console.log('companion value 1: ', index);
    // console.log('updatedPlayerAbilities: ', updatedPlayerAbilities);
    return updatedPlayerAbilities;
  });

  console.log('companion value 2: ', index);
  console.log('getStarterPackage called ', playerChAbilities[index]);
  return starterPackages[i][j];
}

// Add Abilities to Abilities array.
function selectAbilities(index) {
  console.log('selectAbilities: ', index);
  setSelectedItem(playerChAbilities[displayIndex()].ability[index]);
  setShowAbilitiesModal(true);
}

function handleLeftClick(slot) {
  setSlotNumber(slot);
  console.log('handleLeftClick: ', slot, displayIndex(), playerChAbilities[displayIndex()].ability, ' Slot: ', slotNumber());
  if (playerChAbilities[displayIndex()].ability[slot] === '') {
    setSelectedItem(null); // Reset selected item when selecting an empty slot
    setShowAbilitiesModal(true);
    selectAbilities(slot);
  } else {
    removeAbilities(slot);
    reorderAbilities();
  }
}

export function handlePlayerChAbilitiesUpdate(updatedData) {
  console.log('handlePlayerChAbilitiesUpdate called ', updatedData);
  console.log('data payload: ', updatedData.new);
  const newData = [...playerChData]; // Create a copy of the current playerChData store
  let index = updatedData.new.id - 1;

  setPlayerChAbilities((prevData) => {
    return prevData.map((item, i) => {
      if (i === index) {
        return {
          id: updatedData.new.id,
          ability: updatedData.new.ability,
        };
      }
      return item;
    });
  });
}

// Abilities component.
function Abilities() {
  const abilities = playerChAbilities;
  console.log('Abilities: ', abilities);

  onMount(() => {

    // Subscribe to player_ch_data updates when the component mounts
    const unsubscribe = subscribeToPlayerChAbilities(handlePlayerChAbilitiesUpdate);

    // To unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  });

  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-base">
      {abilities[displayIndex()] && abilities[displayIndex()].ability && (
        abilities[displayIndex()].ability.map((abilityEntry, slot) => (
          <div class="rounded p-1 hover:text-blue-300 bg-neutral-800 cursor-pointer px-2" on:click={() => handleLeftClick(slot)}>
            {abilityEntry || ''}
          </div>
        ))
      )}
      {showAbilitiesModal() && (
        <AbilitiesModal onClose={closeAbilitiesModal} slotNumber={[slotNumber, setSlotNumber]}/>
      )}
    </div>
  );
}

export default Abilities;

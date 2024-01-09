/* PlayerCh component encapsulates player data which includes attributes, money, state and position */
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getStarterPackage } from './Equipment';
import { getRandomInt, getRandom3d6} from './generalUtils';
import {
  updatePlayerChProps,
  subscribeToPlayerChData,
  subscribeToPlayerChState } from './dbUtils';
import { starterPackages, arcanum, names, companions } from './oddpendium';
import {
  updatePlayerCh,
  playerChIndex,
  setPlayerChIndex,
  companionIndex,
  setCompanionIndex,
  displayIndex,
  setDisplayIndex,
  playerChData,
  setPlayerChData,
  playerChAbilities,
  playerChEquipment,
  playerChMoney,
  playerChState,
  setPlayerChState,
  playerChPosition
} from './Cast';
import { GENERATED_PLAYER_INDEX, GENERATED_COMPANION_INDEX, MAX_PLAYER_CHS } from './constants';

import Equipment from './Equipment';
import Abilities from './Abilities';
import Money from './Money'
import PlayerChModal from './PlayerChModal';

const [showPlayerChModal, setshowPlayerChModal] = createSignal(false);

const [equipmentToggle, setEquipmentToggle] = createSignal(true);
export { equipmentToggle, setEquipmentToggle };

function toggleEquipmentDisplay() {
  if (equipmentToggle()) {
    setEquipmentToggle(false);
  } else {
    setEquipmentToggle(true);
  }
  console.log('toggleEquipmentDisplay: ', equipmentToggle());
}

let item = {
  name: '',
  bulky: Boolean,
  category: 'normal',
  number: 0,
  description: '',
  damage: 0,
  armour: 0,
  cost: 0
}

function getPcName() {
  return(names[getRandomInt(names.length)]);
}

// Used in character generation.
export function getHighestAbility() {
  const { str, dex, wil } = playerChData[displayIndex()];
  return Math.max(str, dex, wil);
}

// Toggle between player character index and companion index
function displayCompanionToggle() {
  console.log('indices before displayCompanionToggle: ', displayIndex(), playerChIndex());
  if (playerChData[displayIndex()].companion) {
    if (displayIndex() == playerChIndex()) {
      setDisplayIndex(companionIndex());
    } else {
      setDisplayIndex(playerChIndex());
    }
  }
  console.log('indices after displayCompanionToggle: ', displayIndex(), playerChIndex());
}

function handleNameClick() {
  setshowPlayerChModal(true);
}

// Returns the companion object matching companionName.
function getCompanion(companionName) {
  const companion = companions.find((companionElement) => companionElement.companion === companionName);
  console.log('getCompanion: ', companionName, companion)
  return companion || null;
}

// Returns an object defined by companionProperty and extracted from an array of companions.
function extractCompanionInfo(companionProperty, companionObject) {
  const extractedInfo = {};

  // Generate object based on companionProperty
  switch (companionProperty) {
    case 'data':
      extractedInfo.classification = companionObject.classification;
      extractedInfo.category = companionObject.category;
      extractedInfo.name = companionObject.name;
      extractedInfo.str = companionObject.str;
      extractedInfo.dex = companionObject.dex;
      extractedInfo.wil = companionObject.wil;
      extractedInfo.hp = companionObject.hp;
      extractedInfo.characteristics = companionObject.characteristics;
      extractedInfo.companion = 'this';
      break;
    case 'abilities':
      extractedInfo.ability = companionObject.ability;
      break;
    case 'equipment':
      extractedInfo.equipment = companionObject.equipment;
      break;
    case 'money':
      extractedInfo.shillings = companionObject.shillings;
      extractedInfo.pennies = companionObject.pennies;
      extractedInfo.guilders = companionObject.guilders;
      break;
    case 'state':
      extractedInfo.condition = companionObject.condition;
      break;
    case 'position':
      extractedInfo.x = companionObject.x;
      extractedInfo.y = companionObject.y;
      extractedInfo.active = companionObject.active;
      break;
    default:
      console.error('Invalid companionProperty:', companionProperty);
  }

  return extractedInfo;
}

// Generates playerCh arrays from the companion object.
function generateCompanion(atIndex) {
  const newCompanion = getCompanion(playerChData[displayIndex()].companion);
  console.log('generateCompanion at index: ', atIndex, companionIndex());
  // Split companion into the separate tables of playerCh.
  updatePlayerCh(companionIndex(), 'data', extractCompanionInfo('data', newCompanion));
  updatePlayerCh(companionIndex(), 'abilities', extractCompanionInfo('abilities', newCompanion));
  updatePlayerCh(companionIndex(), 'equipment', extractCompanionInfo('equipment', newCompanion));
  updatePlayerCh(companionIndex(), 'money', extractCompanionInfo('money', newCompanion));
  updatePlayerCh(companionIndex(), 'state', extractCompanionInfo('state', newCompanion));
  updatePlayerCh(companionIndex(), 'position', extractCompanionInfo('position', newCompanion));
  console.log('generateCompanion:', companionIndex(), newCompanion, playerChData);
}

// Generate random player name and attributes.
export function generatePlayerChData() {
  const newPlayerChData = {
    classification: 'playerCh',
    category: '',
    name: getPcName(),
    str: getRandom3d6(),
    dex: getRandom3d6(),
    wil: getRandom3d6(),
    hp: getRandomInt(6) + 1,
  }
  return(newPlayerChData);
}

export function generatePlayerChAbilities() {
  const newPlayerChAbilities = {
    ability: ['', '', '', '', '', '', '', '', '', ''],
  }
  return(newPlayerChAbilities);
}

export function generatePlayerChEquipment() {
  const newPlayerChEquipment = {
    equipment: ['', '', '', '', '', '', '', '', '', ''],
  }
  return(newPlayerChEquipment);
}

export function generatePlayerChMoney() {
  const newPlayerChMoney = {
    shillings: 0,
    pennies: 0,
    guilders: 0,
  }
  return(newPlayerChMoney);
}

export function generatePlayerChState() {
  const newPlayerChState = {
    condition: 'inactive',
  }
  return(newPlayerChState);
}

export function generatePlayerChPosition() {
  const newPlayerChPosition = {
    x: 0,
    y: 0,
    active: false,
  }
  return(newPlayerChPosition);
}

function updatePlayerChDataProperty(index, propertyName, propertyValue) {
  setPlayerChData((prevData) => {
    const newData = [...prevData];
    if (index >= 0 && index < newData.length && newData[index].hasOwnProperty(propertyName)) {
      newData[index] = {
        ...newData[index],
        [propertyName]: propertyValue,
      };
    }
    return newData;
  });
}

// Called when the Roll button is clicked. Generates a player ch and companion if defined by starter package.
export function generatePlayerCh() {
  setDisplayIndex(GENERATED_PLAYER_INDEX); // playerChData[GENERATED_PLAYER_INDEX] is reserved for temp player character generation.
  setCompanionIndex(GENERATED_COMPANION_INDEX);

  // Use the updatePlayerCh function to update the player character at the specified index.
  updatePlayerCh(displayIndex(), 'data', generatePlayerChData());
  console.log('generatePlayerCh called. ', displayIndex(), playerChData[displayIndex()]);

  const starterPackage = getStarterPackage();
  const companionValue = starterPackage.companion;
  const characteristicsValue = starterPackage.characteristics;
  updatePlayerChDataProperty(displayIndex(), 'companion', companionValue);
  updatePlayerChDataProperty(displayIndex(), 'characteristics', characteristicsValue);

  console.log('Companion check: ', displayIndex(), companionIndex(), playerChData[displayIndex()].companion, playerChData[displayIndex()].characteristics);
  if (starterPackage.companion) {
    generateCompanion(displayIndex() + 1); // playerChData[1] is reserved for temporary companion generation.
  }
}

async function updateAttributes(index, propertiesToUpdate) {
  try {
    await updatePlayerChProps('player_ch_data', index, propertiesToUpdate);
  } catch (error) {
    console.error('Error updating an attribute in Supabase:', error.message);
  }
}

async function updateState(index, propertiesToUpdate) {
  try {
    await updatePlayerChProps('player_ch_state', index, propertiesToUpdate);
  } catch (error) {
    console.error('Error updating state in Supabase:', error.message);
  }
}

// Function to modify an attribute based on click type.
function modifyPcAttribute(attribute, increment) {
  const index = displayIndex();
  const currentValue = playerChData[index][attribute];
  
  // Make the necessary modification to the attribute value.
  const updatedValue = currentValue + increment;

  // Create an updatedProperties object with the changed attribute value.
  const updatedProperties = { ...playerChData[index], [attribute]: updatedValue };

  // Use the updatePlayer function to update the player at the specified index.
  updatePlayerCh(index, 'data', updatedProperties);
  console.log('modifyPcAttribute index:', index, 'playerIndex:', playerChIndex(), 'attribute:', attribute, 'updatedProperties:', updatedProperties);

  // Update supabase table.
  updateAttributes(index + 1, updatedProperties);
}

// Function to update an attribute based on click type
function updatePlayerData(attribute, increment) {
  const index = displayIndex();
  const currentValue = playerChData[index][attribute];
  
  // Make the necessary modification to the attribute value
  const updatedValue = currentValue + increment;

  // Create an updatedProperties object with the changed attribute value
  const updatedProperties = { ...playerChData[index], [attribute]: updatedValue };

  // Use the updatePlayer function to update the player at the specified index
  updatePlayerCh(index, 'data', updatedProperties);
  console.log('updatePlayerData: ', index, playerChIndex(),attribute, updatedProperties);
}

function closePlayerChModal() {
  setshowPlayerChModal(false);
}

export function handlePlayerChDataUpdate(updatedData) {
  console.log('handlePlayerChDataUpdate: ', updatedData.new);
  const newData = [...playerChData]; // Create a copy of the current playerChData store
  let index = updatedData.new.id - 1;

  setPlayerChData((prevData) => {
    return prevData.map((item, i) => {
      if (i === index) {
        return {
          id: updatedData.new.id,
          classification: updatedData.new.classification,
          category: updatedData.new.category,
          name: updatedData.new.name,
          str: updatedData.new.str,
          dex: updatedData.new.dex,
          wil: updatedData.new.wil,
          hp: updatedData.new.hp,
          characteristics: updatedData.new.characteristics,
          companion: updatedData.new.companion,
        };
      }
      return item;
    });
  });
}

export function handlePlayerChStateUpdate(updatedData) {
  console.log('handlePlayerChStateUpdate: ', updatedData);
  let index = updatedData.new.id - 1;

  setPlayerChState((prevData) => {
    return prevData.map((item, i) => {
      if (i === index) {
        return {
          id: updatedData.new.id,
          condition: updatedData.new.condition,
        };
      }
      return item;
    });
  });

}

function PlayerCh() {
  onMount(() => {

    // Subscribe to player_ch_data updates when the component mounts
    const dataUnsubscribe = subscribeToPlayerChData(handlePlayerChDataUpdate);
    const stateUnsubscribe = subscribeToPlayerChState(handlePlayerChStateUpdate);

    // To unsubscribe when the component unmounts
    return () => {
      dataUnsubscribe();
      stateUnsubscribe();
    };
  });

  return (
    <div class="w-full h-full grid grid-cols-18 grid-rows-5 gap-1 font-hultog-italic select-none">
      <div class="col-span-7 rounded cursor-pointer text-xl" onClick={handleNameClick}>{playerChData[displayIndex()].name}</div>
      <div class="col-span-1 rounded text-right cursor-pointer" onClick={displayCompanionToggle}>{playerChData[displayIndex()].companion ? '&' : null}</div> {/* '&' displayed if companion==true */}
      <div class="co-span-1 text-right hover:text-blue-300 cursor-pointer" on:click={() => toggleEquipmentDisplay()}>*</div>
      <div class="col-span-9 row-span-5 col-start-10">
      {equipmentToggle() ? <Equipment /> : <Abilities />}
      </div>
      <div class="col-span-8 row-start-2">
        <div class="grid grid-cols-6 select-none text-lg h-full tracking-widest text-blue-200 rounded">
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('str', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('str', -1); // Decrement on right-click
            }}>S{playerChData[displayIndex()].str}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('dex', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('dex', -1); // Decrement on right-click
            }}>D{playerChData[displayIndex()].dex}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('wil', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('wil', -1); // Decrement on right-click
            }}>W{playerChData[displayIndex()].wil}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('hp', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('hp', -1); // Decrement on right-click
          }}>H{playerChData[displayIndex()].hp}
          </div>
            <Money />
        </div>
      </div>
      <div class="col-span-8 row-start-3 rounded">{playerChData[displayIndex()].characteristics}</div>
      <div class="col-span-8 row-span-2 row-start-4 rounded">Haiku goes here!</div>
      {showPlayerChModal() && (
        <PlayerChModal onClose={closePlayerChModal} />
      )}
    </div>
  );
}
  
export default PlayerCh;
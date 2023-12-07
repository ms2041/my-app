import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getStarterPackage } from './Equipment';
import { getRandomInt, getRandom3d6} from './generalUtils';
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
  playerChAbilities,
  playerChEquipment,
  playerChMoney,
  playerChState,
  playerChPosition
} from './Cast';
import { MAX_PLAYER_CHS } from './constants';

import Equipment from './Equipment';
import Money from './Money'
import PlayerChModal from './PlayerChModal';

const [showPlayerChModal, setshowPlayerChModal] = createSignal(false);

const [equipmentToggle, setEquipmentToggle] = createSignal(true);
export { equipmentToggle, setEquipmentToggle };

function toggleEquipmentDisplay() {
  console.log('toggleEquipmentDisplay');
  setEquipmentToggle(prevValue => !prevValue);
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
  if (playerChData[displayIndex()].companion) {
    if (displayIndex() == playerChIndex()) {
      setDisplayIndex(companionIndex());
    } else {
      setDisplayIndex(playerChIndex());
    }
  }
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
      extractedInfo.int = companionObject.int;
      extractedInfo.wil = companionObject.wil;
      extractedInfo.hp = companionObject.hp;
      extractedInfo.specialInformation = companionObject.specialInformation;
      extractedInfo.companion = companionObject.companion;
      break;
    case 'abilities':
      extractedInfo.ability = companionObject.ability;
      break;
    case 'equipment':
      extractedInfo.equipment = companionObject.equipment;
      break;
    case 'equipment':
      extractedInfo.money = companionObject.money;
      break;
    case 'state':
      extractedInfo.condition = companionObject.condition;
      break;
    case 'position':
      extractedInfo.x = companionObject.x;
      extractedInfo.y = companionObject.y;
      extractedInfo.onScreen = companionObject.onScreen;
      break;
    default:
      console.error('Invalid companionProperty:', companionProperty);
  }

  return extractedInfo;
}

// Generates playerCh arrays from the companion object.
function generateCompanion() {
  const newCompanion = getCompanion(playerChData[displayIndex()].companion);
  // Split companion into the separate tables of playerCh.
  updatePlayerCh(companionIndex(), 'data', extractCompanionInfo('data', newCompanion));
  updatePlayerCh(companionIndex(), 'abilities', extractCompanionInfo('abilities', newCompanion));
  updatePlayerCh(companionIndex(), 'equipment', extractCompanionInfo('equipment', newCompanion));
  updatePlayerCh(companionIndex(), 'money', extractCompanionInfo('money', newCompanion));
  updatePlayerCh(companionIndex(), 'state', extractCompanionInfo('state', newCompanion));
  updatePlayerCh(companionIndex(), 'position', extractCompanionInfo('position', newCompanion));
  console.log('generateCompanion:', newCompanion);
}

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
    abilities: ['', '', '', '', '', '', '', '', '', ''],
  }
  return(newPlayerChAbilities);
}

export function generatePlayerChEquipment() {
  const newPlayerChEquipment = {
    equipment: ['', '', '', '', '', '', '', '', '', ''],
    equipmentPtr: 0,
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
    onscreen: false,
  }
  return(newPlayerChPosition);
}

export function generatePlayerCh() {
  setDisplayIndex(0); // playerChData[0] is reserved for temp player character generation.

  // Use the updatePlayerCh function to update the player character at the specified index.
  updatePlayerCh(displayIndex(), 'data', generatePlayerChData());
  console.log('generatePlayerCh called. ', displayIndex(), playerChData[displayIndex()]);

  getStarterPackage();
  if (playerChData[displayIndex()].companion) {
    generateCompanion(displayIndex() + 1); // playerChData[1] is reserved for temporary companion generation.
  }
}

// Function to modify an attribute based on click type
function modifyPcAttribute(attribute, increment) {
  const index = displayIndex();
  const currentValue = playerChData[index][attribute];
  
  // Make the necessary modification to the attribute value
  const updatedValue = currentValue + increment;

  // Create an updatedProperties object with the changed attribute value
  const updatedProperties = { ...playerChData[index], [attribute]: updatedValue };

  // Use the updatePlayer function to update the player at the specified index
  updatePlayerCh(index, 'data', updatedProperties);
  console.log('modifyPcAttribute: ', index, attribute, updatedProperties);
}

function closePlayerChModal() {
  setshowPlayerChModal(false);
}


function PlayerCh() {
  return (
    <div class="w-full h-full grid grid-cols-18 grid-rows-5 gap-1 font-hultog-italic select-none">
      <div class="col-span-7 rounded cursor-pointer text-xl" onClick={handleNameClick}>{playerChData[displayIndex()].name}</div>
      <div class="col-span-1 rounded text-right cursor-pointer" onClick={displayCompanionToggle}>{playerChData[displayIndex()].companion ? '&' : null}</div> {/* '&' displayed if companion==true */}
      <div class="co-span-1 text-right hover:text-blue-300 cursor-pointer" on:click={() => toggleEquipmentDisplay()}>*</div>
      <div class="col-span-9 row-span-5 col-start-10">
        <Equipment />
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
      <div class="col-span-8 row-start-3 rounded">{playerChData[displayIndex()].specialInformation}</div>
      <div class="col-span-8 row-span-2 row-start-4 rounded">Haiku goes here!</div>
      {showPlayerChModal() && (
        <PlayerChModal onClose={closePlayerChModal} />
      )}
    </div>
  );
}
  
export default PlayerCh;
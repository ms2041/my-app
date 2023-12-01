/*
This component contains functions and data related to a player characters array.
Pcs can be directly managed or can be companions. The player characters array is
an array of MAX_PCS Pcs which is synchronised across all players.
The index is assigned by the server.
*/

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Equipment from './Equipment';
import Money from './Money'
import PcModal from './PcModal';
import { getStarterPackage } from './Equipment';
import { getRandomInt, getRandom3d6} from './generalUtils';
import { starterPackages, arcanum, names, companions } from './oddpendium';
import { pcs, setPcs, pc, setPc, updatePc, pcIndex, companionIndex, displayIndex, setDisplayIndex } from './Cast';
import { MAX_PCS } from './constants';

const [showPcModal, setShowPcModal] = createSignal(false);

const [money, setMoney] = createStore({
  shillings: '0',
  pennies: '0',
  guilders: '0',
});

const [equipmentToggle, setEquipmentToggle] = createSignal(true);
export { equipmentToggle, setEquipmentToggle };

function toggleEquipmentDisplay() {
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

export function getHighestAbility() {
  const { str, dex, wil } = pcs[displayIndex()];
  return Math.max(str, dex, wil);
}

// Function to toggle between player character index and companion index
function displayCompanionToggle() {
  if (pcs[displayIndex()].companion) {
    if (displayIndex() == pcIndex()) {
      setDisplayIndex(companionIndex());
    } else {
      setDisplayIndex(pcIndex());
    }
  }
}

function incrementDisplayIndex() {
  setDisplayIndex(prevIndex => prevIndex + 1);
}

function handleNameClick() {
  setShowPcModal(true);
}

function getCompanion(companionName) {
  const companion = companions.find((companion) => companion.companion === companionName);
  console.log('getCompanion: ', companionName, companion)
  return companion || null;
}

function generateCompanion() {
  const index = companionIndex();
  const newCompanion = getCompanion(pcs[displayIndex()].companion);
  updatePc(index, newCompanion);
  console.log('generateCompanion:', newCompanion);
}

export function generatePc() {
  const newPc = {
    id: 0,
    classification: 'pc',
    category: 'pc',
    name: getPcName(),
    str: getRandom3d6(),
    dex: getRandom3d6(),
    wil: getRandom3d6(),
    hp: getRandomInt(6) + 1,
    abilities: ['', '', '', '', '', '', '', '', '', ''],
    equipment: ['', '', '', '', '', '', '', '', '', '', '', ''],
    equipmentPtr: 0,
    companion: '',
    specialInformation: '',
    shillings: 0,
    pennies: 0,
    guilders: 0,
    onScreen: false,
    state: '',
    x: 0,
    y: 0,
  };

  setDisplayIndex(0); // pcs[0] is reserved for player character generation.

  // Use the updatePc function to update the player character at the specified index.
  updatePc(displayIndex(), newPc);
  console.log('updatePc called. ', displayIndex(), newPc, pcs[displayIndex()]);

  getStarterPackage();
  if (pcs[displayIndex()].companion) {
    generateCompanion(displayIndex() + 1); // pcs[1] is reserved for companion generation.
  }
}

export function savePc() {
  console.log('savePc called');
}

// Function to modify an attribute based on click type
function modifyPcAttribute(attribute, increment) {
  const index = displayIndex();

  // Create an object with the updated property
  const updatedProperties = { [attribute]: pcs[index][attribute] + increment };

  // Use the updatePlayer function to update the player at the specified index
  updatePc(index, updatedProperties);
  console.log('modifyPcAttribute: ', attribute, updatedProperties)

}

function modifyMoney(currency, amount) {
  setPcs((prevPcs) => {
    const newPcs = [...prevPcs];
    const index = displayIndex();

    if (index >= 0 && index < MAX_PCS) {
      const updatedPc = { ...newPcs[index] };

      if (currency === 'shillings') {
        updatedPc.shillings += amount;
      } else if (currency === 'pennies') {
        updatedPc.pennies += amount;
      } else if (currency === 'guilders') {
        updatedPc.guilders += amount;
      }

      newPcs[index] = updatedPc;
    }

    return newPcs;
  });
}

function handleCurrencyClick(event, currency) {
  event.preventDefault();

  if (event.buttons === 1) {
    // Left-click (buttons = 1)
    modifyMoney(currency, 1);
  } else if (event.buttons === 2) {
    // Right-click (buttons = 2)
    modifyMoney(currency, -1);
  }
}

function closePcModal() {
  setShowPcModal(false);
}


function Pc() {
  return (
    <div class="w-full h-full grid grid-cols-18 grid-rows-5 gap-1 font-hultog-italic select-none">
      <div class="col-span-7 rounded cursor-pointer text-xl" onClick={handleNameClick}>{pcs[displayIndex()].name}</div>
      <div class="col-span-1 rounded text-right cursor-pointer"onClick={displayCompanionToggle}>{pcs[displayIndex()].companion ? '&' : null}</div> {/* & displayed if companion==true */}
      <div class="co-span-1 text-right cursor-pointer" on:click={() => toggleEquipmentDisplay()}>*</div>
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
            }}>S{pcs[displayIndex()].str}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('dex', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('dex', -1); // Decrement on right-click
            }}>D{pcs[displayIndex()].dex}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('wil', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('wil', -1); // Decrement on right-click
            }}>W{pcs[displayIndex()].wil}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPcAttribute('hp', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPcAttribute('hp', -1); // Decrement on right-click
          }}>H{pcs[displayIndex()].hp}
          </div>
            <Money />
        </div>
      </div>
      <div class="col-span-8 row-start-3 rounded">{pcs[displayIndex()].specialInformation}</div>
      <div class="col-span-8 row-span-2 row-start-4 rounded">Haiku goes here!</div>
      {showPcModal() && (
        <PcModal onClose={closePcModal} />
      )}
    </div>
  );
}
  
export default Pc;
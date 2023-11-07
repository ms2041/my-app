/*
This component contains functions and data related to a players array.
Players can be directly managed or can be companions. The players array is
an array of 8 players which is synchronised across all players.
The index is assigned by the server.
*/

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Equipment from './Equipment';

import { starterPackages, arcanum, names } from './oddpendium';

const [money, setMoney] = createStore({
  shillings: '0',
  pennies: '0',
  guilders: '0',
});

// Global writable storing an array of players in game.
const [player, setPlayer] = createStore({
  id: 0,
  classification: '',
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: ['', '', '', '', '', '', '', '', '', ''],
  equipmentPtr: 0,
  companion: '',
  specialInformation: '',
  shillings: 0,
  pennies: 0,
  guilders: 0,
  onScreen: false,
  category: ''
});
export { player, setPlayer };

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

export const sobriquets =
  [
    'Lazy', 'Obsequious', 'Verbose', 'Luckless', 'Timeless', 'Harmless', 'Truculent', 'Unfaltering',
    'Sour', 'Quiescent', 'Doomed', 'Vile', 'Tactful', 'Affable', 'Stuffy', 'Lustful',
    'Frugal', 'Profane', 'Clumsy', 'Nimble', 'Pale', 'Timeworn', 'Farsighted', 'Reckless',
    'Overwhelmed', 'Sanguine', 'Immaculate', 'Red', 'Jumpy', 'Voiceless', 'Decrepit', 'Zealous',
    'Cold-Hearted', 'Incurable', 'Bundled', 'Hungry', 'Thoughtful', 'Reticent', 'Flawless', 'Knowing',
    'Humble', 'Impartial', 'Narrow', 'Eyeless', 'Ominous', 'Wily', 'Oily', 'Callous',
    'Laconic', 'Wakeful', 'Ever-late', 'Genuflecting', 'Serious', 'Unkempt', 'Ghostly', 'Idle',
    'Hairless', 'Earnest', 'Ruthless', 'Guileless', 'Violent', 'Kind', 'Undeterred', 'Odorous',
    'Tender', 'Shaky', 'Jinxed', 'Unreliable', 'Strange', 'Penniless', 'Vexing', 'Quick',
    'Malformed', 'Downhearted', 'Orphaned', 'Apathetic', 'Filthy', 'Tireless', 'Obliging', 'Loquacious',
    'Tall', 'Numb', 'Sickly', 'Stern', 'Trusting', 'Three-thumbed', 'Faithless', 'Impulsive',
    'Quixotic', 'Cowardly', 'Mute', 'Quiet', 'Forgetful', 'Gloomy', 'Petulant', 'Jeweled',
    'Big', 'Innocent', 'Peaceful', 'Dowdy', 'Tiny', 'Underdog', 'Expressionless', 'Uncaring',
    'Inscrutable', 'Prickly', 'Boastful', 'Odiferous', 'Icy', 'Dependable', 'Vulgar', 'Unblushing',
    'Simple', 'Impetuous', 'Blessed', 'Remorseless', 'Cool-Headed', 'Yawning', 'Obscene', 'Abiding',
    'Sorrowful', 'Impatient', 'Onerous', 'Happy', 'Forsaken', 'Obstinate', 'Backstabbing', 'Blunt',
    'Devious', 'Mysterious', 'Observant', 'Aching', 'Regal', 'Furious', 'Thankful', 'Forgotten',
    'Fecund', 'Rueful', 'Handsome', 'Unlikely', 'Wise', 'Impossible', 'Noxious', 'Despondent',
    'Bright-eyed', 'Unhappy', 'Scarred', 'Obedient', 'Tiresome', 'Mindful', 'Zestless', 'Gracious',
    'Hasty', 'Foolish', 'Odious', 'Toothy', 'Long-winded', 'Clueless', 'Horrid', 'Compassionate',
    'Vast', 'Indifferent', 'Greying', 'Shrewd', 'Careful', 'Unadorned', 'Prankish', 'Chained',
    'Abrasive', 'Bloodthirsty', 'Unnerving', 'Portly', 'Outlandish', 'Meek', 'Vengeful', 'Breathless',
    'Lovely', 'Reliable', 'Jealous', 'Languid', 'Yielding', 'Demure', 'Quarrelsome', 'Festering',
    'Mischievous', 'Neglectful', 'Blighted', 'Tardy', 'Jaunty', 'Careless', 'Drowsy', 'Towering'
  ]

// Random number functions.
function getRandomInt(max) {  
  return Math.floor(Math.random() * max);
}

function getRandom3d6() {
  return (getRandomInt(6) + 1 + getRandomInt(6) + 1 + getRandomInt(6) + 1);
}

function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}

function getHighestAbility() {
  const { str, dex, wil } = player;
  return Math.max(str, dex, wil);
}

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

function getStarterPackage() {
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

export function generatePlayer() {
  setPlayer({
    id: 1,
    classification: 'player',
    name: getPlayerName(),
    str: getRandom3d6(),
    dex: getRandom3d6(),
    wil: getRandom3d6(),
    hp: getRandomInt(6) + 1,
    equipment: ['', '', '', '', '', '', '', '', '', '', '', ''],
    equipmentPtr: 0,
    shillings: 0,
    pennies: 0,
    guilders: 0,
    onScreen: false,
    category: 'player'
  });

  getStarterPackage();

  console.log('generatePlayer called. ', player.name);
}

export function savePlayer() {
  console.log('savePlayer called', player);

}

// Function to modify an attribute based on click type
function modifyPlayerAttribute(attribute, increment) {
  setPlayer((prevPlayer) => {
    // Create a copy of the previous player object
    const updatedPlayer = { ...prevPlayer };

    // Check if the attribute exists in the player object
    if (attribute in updatedPlayer) {
      // Increment the attribute by the specified value
      updatedPlayer[attribute] += increment;
    }

    return updatedPlayer; // Return the updated player object
  });
}

function modifyMoney(currency, amount) {
  setPlayer((prevPlayer) => {
    const updatedPlayer = { ...prevPlayer };

    if (currency === 'shillings') {
      updatedPlayer.shillings += amount;
    } else if (currency === 'pennies') {
      updatedPlayer.pennies += amount;
    } else if (currency === 'guilders') {
      updatedPlayer.guilders += amount;
    }

    return updatedPlayer;
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

function Player() {
  return (
    <div class="w-full h-full grid grid-cols-18 grid-rows-5 gap-1">
      <div class="col-span-7 bg-neutral-800 rounded">{player.name}</div>
      <div class="col-span-1 bg-neutral-800 rounded text-right">{player.companion ? '&' : null}</div> {/* & displayed if companion==true */}
      <div class="col-span-9 row-span-5 col-start-10">
        <Equipment />
      </div>
      <div class="col-span-8 row-start-2">
        <div class="grid grid-cols-6 select-none text-lg h-full tracking-widest text-blue-200 bg-neutral-800 rounded">
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('str', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('str', -1); // Decrement on right-click
            }}>S{player.str}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('dex', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('dex', -1); // Decrement on right-click
            }}>D{player.dex}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('wil', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('wil', -1); // Decrement on right-click
            }}>W{player.wil}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('hp', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('hp', -1); // Decrement on right-click
          }}>H{player.hp}
          </div>
          <div class="flex">
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'shillings')}>&fnof;{player.shillings}</span>
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'pennies')}>/{player.pennies}</span>
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'guilders')}>/{player.guilders}</span>
          </div>
        </div>
      </div>
      <div class="col-span-8 row-start-3 bg-neutral-800 rounded">{player.specialInformation}</div>
      <div class="col-span-8 row-span-2 row-start-4 bg-neutral-800 rounded">Haiku goes here!</div>
    </div>
  );
}
  
export default Player;
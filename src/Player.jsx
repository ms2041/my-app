/*
This component contains functions and data related to a players array.
Players can be directly managed or can be companions. The players array is
an array of 8 players which is synchronised across all players.
The index is assigned by the server.
*/

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Equipment from './Equipment';
import { getStarterPackage } from './Equipment';
import { getRandomInt, getRandom3d6} from './utils';
import { starterPackages, arcanum, names, companions } from './oddpendium';
import { players, setPlayers, updatePlayer, playerIndex, companionIndex, displayIndex, setDisplayIndex } from './Cast';

const [money, setMoney] = createStore({
  shillings: '0',
  pennies: '0',
  guilders: '0',
});

const [player, setPlayer] = createStore({
  id: 0,
  classification: '',
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  abilities: ['', '', '', '', '', '', '', '', '', ''],
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

function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}

export function getHighestAbility() {
  const { str, dex, wil } = players[displayIndex()];
  return Math.max(str, dex, wil);
}

// Function to toggle between player index and companion index
function toggleDisplayIndex() {
  if (players[displayIndex()].companion) {
    if (displayIndex() == playerIndex()) {
      setDisplayIndex(companionIndex());
    } else {
      setDisplayIndex(playerIndex());
    }
  }
}

function getCompanion(companionName) {
  const companion = companions.find((companion) => companion.companion === companionName);
  console.log('getCompanion: ', companionName, companion)
  return companion || null;
}

function generateCompanion() {
  const index = companionIndex();
  const newCompanion = getCompanion(players[displayIndex()].companion);
  updatePlayer(index, newCompanion);
  console.log('generateCompanion:', newCompanion);
}

export function generatePlayer() {
  const index = displayIndex();
  const newPlayer = {
    id: 1,
    classification: 'player',
    name: getPlayerName(),
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
    category: 'player'
  };

  // Use the updatePlayer function to update the player at the specified index
  updatePlayer(index, newPlayer);
  console.log('updatePlayer called. ', index, newPlayer, players[index]);

  getStarterPackage();
  if (players[index].companion) {
    generateCompanion();
  }
}

export function savePlayer() {
  console.log('savePlayer called', player);

}

// Function to modify an attribute based on click type
function modifyPlayerAttribute(attribute, increment) {
  const index = displayIndex();

  // Create an object with the updated property
  const updatedProperties = { [attribute]: players[index][attribute] + increment };

  // Use the updatePlayer function to update the player at the specified index
  updatePlayer(index, updatedProperties);
  console.log('modifyPlayerAttribute: ', attribute, updatedProperties)

}

function modifyMoney(currency, amount) {
  setPlayers((prevPlayers) => {
    const newPlayers = [...prevPlayers];
    const index = displayIndex();

    if (index >= 0 && index < 8) {
      const updatedPlayer = { ...newPlayers[index] };

      if (currency === 'shillings') {
        updatedPlayer.shillings += amount;
      } else if (currency === 'pennies') {
        updatedPlayer.pennies += amount;
      } else if (currency === 'guilders') {
        updatedPlayer.guilders += amount;
      }

      newPlayers[index] = updatedPlayer;
    }

    return newPlayers;
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
    <div class="w-full h-full grid grid-cols-18 grid-rows-5 gap-1 font-hultog-italic select-none">
      <div class="col-span-7 rounded bg-neutral-800 cursor-pointer">{players[displayIndex()].name}</div>
      <div class="col-span-1 rounded text-right bg-neutral-800 cursor-pointer"onClick={toggleDisplayIndex}>{players[displayIndex()].companion ? '&' : null}</div> {/* & displayed if companion==true */}
      <div class="co-span-1 text-right cursor-pointer" on:click={() => toggleEquipmentDisplay()}>*</div>
      <div class="col-span-9 row-span-5 col-start-10">
        <Equipment />
      </div>
      <div class="col-span-8 row-start-2">
        <div class="grid grid-cols-6 select-none text-lg h-full tracking-widest text-blue-200 rounded">
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('str', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('str', -1); // Decrement on right-click
            }}>S{players[displayIndex()].str}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('dex', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('dex', -1); // Decrement on right-click
            }}>D{players[displayIndex()].dex}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('wil', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('wil', -1); // Decrement on right-click
            }}>W{players[displayIndex()].wil}
          </div>
          <div class="hover:text-blue-300 cursor-pointer"
            on:click={() => modifyPlayerAttribute('hp', 1)} // Increment on left-click
            on:contextmenu={(e) => {
              e.preventDefault();
              modifyPlayerAttribute('hp', -1); // Decrement on right-click
          }}>H{players[displayIndex()].hp}
          </div>
          <div class="flex">
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'shillings')}>&fnof;{players[displayIndex()].shillings}</span>
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'pennies')}>/{players[displayIndex()].pennies}</span>
            <span class="hover:text-blue-300 cursor-pointer" 
              on:mousedown={(e) => handleCurrencyClick(e, 'guilders')}>/{players[displayIndex()].guilders}</span>
          </div>
        </div>
      </div>
      <div class="col-span-8 row-start-3 rounded">{players[displayIndex()].specialInformation}</div>
      <div class="col-span-8 row-span-2 row-start-4 rounded">Haiku goes here!</div>
    </div>
  );
}
  
export default Player;
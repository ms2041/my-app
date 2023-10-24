/*
This component contains functions and data related to a players array.
Players can be directly managed or can be companions. The players array is
an array of 8 players which is synchronised across all players.
The index is assigned by the server.
*/

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { starterPackages, arcanum, names } from './oddpendium';

// Can the stats store be removed?
const [stats, setStats] = createStore({
  str: '10',
  dex: '10',
  wil: '10',
  hp: '1',
});

const [money, setMoney] = createStore({
  shillings: '0',
  pennies: '0',
  guilders: '0',
});

// Global writable storing an array of players in game.
let player = {
  id: 0,
  classification: '',
  name: '',
  str: 0,
  dex: 0,
  wil: 0,
  hp: 0,
  equipment: ['', '', '', '', '', '', '', '', '', '', '', ''],
  equipmentPtr: 0,
  companion: '',
  specialInformation: '',
  shillings: 0,
  pennies: 0,
  guilders: 0,
  onScreen: false,
  category: ''
};

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

export function getPlayerName() {
  return(names[getRandomInt(names.length)]);
}

export function generatePlayer() {
  player.id = 1;
  player.classification = 'player';
  player.name = getPlayerName();
  player.str = getRandom3d6();
  player.dex = getRandom3d6();
  player.wil = getRandom3d6();
  player.hp = getRandomInt(6) + 1;
  player.equipment = ['', '', '', '', '', '', '', '', '', '', '', ''];
  player.equipmentPtr = 0;
  player.shillings = 0;
  player.pennies = 0;
  player.guilders = 0;
  player.onScreen = false;
  player.category = 'player';

  setStats("str", player.str);
  setStats("dex", player.dex);
  setStats("wil", player.wil);
  setStats("hp", player.hp);
  console.log('stats: ', stats);
  // updateAbilities(player);
  // getStarterPackage(player);
  // myPlayer.set(player);
  return player;
}

export function savePlayer() {
  console.log('savePlayer called', player);

}

// Function to modify a stat attribute based on click type
const modifyStat = (attribute, increment) => {
  setStats(attribute, (prevValue) => String(parseInt(prevValue, 10) + increment));
  console.log("modifyStat called: ", attribute, increment);
};

// Function to modify a stat attribute based on click type
const modifyMoney = (attribute, increment) => {
  setMoney(attribute, (prevValue) => String(parseInt(prevValue, 10) + increment));
};

function Equipment() {
  return (
    <div class="grid grid-cols-7 select-none text-xl text-blue-200">
      <div class="hover:text-blue-300 cursor-pointer"
        on:click={() => modifyStat('str', 1)} // Increment on left-click
        on:contextmenu={(e) => {
          e.preventDefault();
          modifyStat('str', -1); // Decrement on right-click
        }}>S{stats.str}
        </div>
        <div class="hover:text-blue-300 cursor-pointer"
          on:click={() => modifyStat('dex', 1)} // Increment on left-click
          on:contextmenu={(e) => {
            e.preventDefault();
            modifyStat('dex', -1); // Decrement on right-click
          }}>D{stats.dex}
        </div>
        <div class="hover:text-blue-300 cursor-pointer"
          on:click={() => modifyStat('wil', 1)} // Increment on left-click
          on:contextmenu={(e) => {
            e.preventDefault();
            modifyStat('wil', -1); // Decrement on right-click
          }}>W{stats.wil}
        </div>
        <div class="hover:text-blue-300 cursor-pointer"
          on:click={() => modifyStat('hp', 1)} // Increment on left-click
          on:contextmenu={(e) => {
            e.preventDefault();
            modifyStat('hp', -1); // Decrement on right-click
        }}>H{stats.hp}
        </div>
        <div class="hover:text-blue-300 cursor-pointer"
          on:click={() => modifyMoney('shillings', 1)} // Increment on left-click
          on:contextmenu={(e) => {
            e.preventDefault();
            modifyMoney('shillings', -1); // Decrement on right-click
          }}>&fnof;{money.guilders}/{money.shillings}/{money.pennies}
        </div>
        <div></div>
        <div></div>
      </div>
    );
  }
  
  export default Equipment;
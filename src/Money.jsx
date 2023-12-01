import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getRandomInt, getRandom3d6} from './generalUtils';
import { pcs, setPcs, pc, setPc, updatePc, pcIndex, companionIndex, displayIndex, setDisplayIndex } from './Cast';
import { MAX_PCS } from './constants';
import { fetchMoney } from './testHarness';

const [playerChMoney, setPlayerChMoney] = createStore([]);

async function initializePlayerChMoney() {
  const data = await fetchMoney(); // Fetch data from Supabase
  setPlayerChMoney(data); // Set the fetched data to the store
  console.log('initializePlayerChMoney: ', playerChMoney[4].shillings);
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



function Money() {
  
  onMount(() => {
    initializePlayerChMoney(); // Call the function to initialize the store with fetched data
  });
  
  return(
    <div class="flex">
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'shillings')}>&fnof;{pcs[displayIndex()].shillings}</span>
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'pennies')}>/{pcs[displayIndex()].pennies}</span>
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'guilders')}>/{pcs[displayIndex()].guilders}</span>
    </div>
  );
}
  
export default Money;
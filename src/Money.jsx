import { createSignal, onMount } from 'solid-js';
import { playerChMoney, setPlayerChMoney, displayIndex, setDisplayIndex } from './Cast';
import { subscribeToPlayerChMoney } from './dbUtils';
import { MAX_PLAYER_CHS } from './constants';

function updateMoney(currency, amount) {
  setPlayerChMoney((prevPlayerChMoney) => {
    const newPlayerChMoney = [...prevPlayerChMoney];
    const index = displayIndex();

    if (index >= 0 && index < MAX_PLAYER_CHS) {
      const updatedMoney = { ...newPlayerChMoney[index] };

      if (currency === 'shillings') {
        updatedMoney.shillings += amount;
      } else if (currency === 'pennies') {
        updatedMoney.pennies += amount;
      } else if (currency === 'guilders') {
        updatedMoney.guilders += amount;
      }

      newPlayerChMoney[index] = updatedMoney;
    }
    console.log('updateMoney: ', playerChMoney, 'newPlayerMoney: ', newPlayerChMoney)
    return newPlayerChMoney;
  });
}

function handleCurrencyClick(event, currency) {
  event.preventDefault();
  console.log('handleCurrencyClick: ', event, currency);
  if (event.buttons === 1) {
    // Left-click (buttons = 1)
    updateMoney(currency, 1);
  } else if (event.buttons === 2) {
    // Right-click (buttons = 2)
    updateMoney(currency, -1);
  }
}

export function handlePlayerChMoneyUpdate(updateData) {
  console.log('handlePlayerChMoneyUpdate called');
}


function Money() {

  onMount(() => {

    // Subscribe to player_ch_data updates when the component mounts
    const unsubscribe = subscribeToPlayerChMoney(handlePlayerChMoneyUpdate);

    // To unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  });

  return (
    <div class="flex">
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'shillings')}>&fnof;{playerChMoney[displayIndex()].shillings}</span>
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'pennies')}>/{playerChMoney[displayIndex()].pennies}</span>
      <span class="hover:text-blue-300 cursor-pointer" 
        on:mousedown={(e) => handleCurrencyClick(e, 'guilders')}>/{playerChMoney[displayIndex()].guilders}</span>
    </div>
  );
}
  
export default Money;

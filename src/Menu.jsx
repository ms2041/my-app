import { generatePlayer } from './Player';
import { testFetch, testUpdate } from './dbUtils';
import { players, playerIndex } from './Cast';

function Menu() {
  return (
    <div class="flex flex-row-reverse pl- text-sm tracking-widest font-phosphorus-tribromide">
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => testFetch()}>Add</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => testUpdate(playerIndex(), players[playerIndex()])}>Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayer()}>Roll</div>
    </div>
  );
}

export default Menu;

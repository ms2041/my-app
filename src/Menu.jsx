import { generatePc } from './Pc';
import { readFromDb, writeToDb, writeXY, readXY } from './dbUtils';
import { setPlayerChMoney, getPlayerChMoney, setAb, readAb } from './testHarness';
import { pcs, pc, pcIndex, displayIndex } from './Cast';
import { generatePlayerCh } from './PlayerCh';

function Menu() {
  console.log('Menu clicked: ', pc);
  return (
    <div class="flex flex-row-reverse pl- text-sm tracking-widest font-phosphorus-tribromide">
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => readFromDb()}>Add</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => writeToDb(pcs[displayIndex()])}>Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePc()}>Roll</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => setAb()}>setAb</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => readAb()}>readAb</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => setPlayerChMoney()}>WriteM</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => getPlayerChMoney()}>ReadM</div>
    </div>
  );
}

export default Menu; 

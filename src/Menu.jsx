import { fetchPlayerChProps, writeXY, readXY } from './dbUtils';
import { setAb, readAb } from './testHarness';
import { playerChData, displayIndex, playerChEquipment, savePlayerCh, goHome } from './Cast';
import { generatePlayerCh } from './PlayerCh';

// Debug functions
function getData() {
  console.log('getData: ', playerChData);
}

function getEqt() {
  console.log('getEqt: ', playerChEquipment);
}

function Menu() {
  return (
    <div class="flex flex-row-reverse pl- text-sm tracking-widest font-phosphorus-tribromide">
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => goHome()}>Home</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => savePlayerCh()}>Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayerCh()}>Roll</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => setAb()}>setAb</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => getData()}>gData</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => getEqt()}>gEqt</div>
    </div>
  );
}

export default Menu; 

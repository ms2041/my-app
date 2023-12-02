import { generatePc } from './Pc';
import { readFromDb, writeToDb, writeXY, readXY } from './dbUtils';
import { setAb, readAb } from './testHarness';
import { pcs, displayIndex, playerChEquipment } from './Cast';
import { generatePlayerCh } from './PlayerCh';

function getEqt() {
  console.log('getEqt: ', playerChEquipment[0].equipment, displayIndex());
}

function Menu() {
  return (
    <div class="flex flex-row-reverse pl- text-sm tracking-widest font-phosphorus-tribromide">
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => readFromDb()}>Add</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => writeToDb(pcs[displayIndex()])}>Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayerCh()}>Roll</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => setAb()}>setAb</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => readAb()}>rdAb</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => getEqt()}>rdEqt</div>
    </div>
  );
}

export default Menu; 

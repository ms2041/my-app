import { generatePlayers } from './Player';

function Menu() {
  return (
    <div class="flex flex-row-reverse pl- text-sm tracking-widest font-phosphorus-tribromide">
      <div class="pl-6 hover:text-blue-300 cursor-pointer">Add</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer">Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayers()}>Roll</div>
    </div>
  );
}

export default Menu;

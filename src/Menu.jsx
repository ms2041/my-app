import { generatePlayer } from './Actor';

function Menu() {
  return (
    <div class="flex flex-row-reverse pl- text-sm">
      <div class="pl-6 hover:text-blue-300 cursor-pointer">Quit</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer">Save</div>
      <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayer()}>Roll</div>
    </div>
  );
}

export default Menu;

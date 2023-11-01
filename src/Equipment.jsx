import { player, setPlayer } from './Player';

function Equipment() {
  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-xs">
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[0]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[1]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[2]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[3]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[4]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[5]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[6]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[7]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[8]}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer">{player.equipment[9]}</div>
    </div>
  );
}

export default Equipment;

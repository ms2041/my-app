import { player, setPlayer } from './Player';

function Equipment(props) {
  
  function handleLeftClick(index) {
    console.log('handleLeftClick: ', index, player.equipment, player.equipmentPtr);
    if (player.equipment[index] === '') {
      addEquipment(index);
    }
  }

  // Add equipment to equipment array.
  function addEquipment(index) {
    console.log('addEquipment: ', index);
  }

  return (
    <div class="grid grid-cols-2 grid-rows-5 h-full gap-1 text-xs">
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
        on:click={() => handleLeftClick(0)}>{player.equipment[0] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(1)}>{player.equipment[1] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(2)}>{player.equipment[2] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(3)}>{player.equipment[3] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(4)}>{player.equipment[4] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(5)}>{player.equipment[5] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(6)}>{player.equipment[6] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(7)}>{player.equipment[7] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(8)}>{player.equipment[8] || ''}</div>
      <div class="bg-neutral-800 rounded p-1 hover:text-blue-300 cursor-pointer"
      on:click={() => handleLeftClick(9)}>{player.equipment[9] || ''}</div>
    </div>
  );
}

export default Equipment;

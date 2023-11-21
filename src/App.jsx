import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import stage from './assets/ui/polaroid-positive.svg';
import Menu from './Menu';
import Player from './Player';
import { players, setPlayers } from './Cast';
import EquipmentModal from './EquipmentModal';

// Supabase related.
import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";
import { supabase } from './supabase';

function App() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');

  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      {/* Stage */}
      <div class="z-0 w-[896px] h-[1092px] flex justify-center bg-neutral-900">
        {/* Map Window */}
        <div class="z-10 relative top-[50px] w-[796px] h-[796px] rounded-2xl bg-neutral-200">
        </div>
      </div>
        <div class="absolute w-[796px] h-[1092px] grid grid-cols-18 grid-rows-22 gap-1 justify-end"> {/* Usable Stage */}
        <div class="col-span-18"></div>
        <div class="col-span-18 row-start-2 text-center p-4 font-marta tracking-widest font-bold text-xl">{title()}</div> {/* Title or Scene */}
        <div class="col-span-18 row-span-14 row-start-3 flex items-center justify-center"> {/* Centre everything in map */}
          <div class="text-center font-hultog-italic text-lg">MAP IS CENTRED</div>
        </div> 
        <div class="col-span-18 row-start-17"></div> {/* Blank row */}
        <div class="col-span-18 col-start-18 row-start-18 font-cascadia text-white text-right rounded p-1 select-none">
          <Menu />
        </div>
        <div class="col-span-18 col-start-1 row-span-3 row-start-19 font-cascadia rounded text-white">
          <Player player={players[playerIndex]}/>
        </div>
        <div class="col-span-18 col-start-1 row-start-22"></div> {/* Blank row */}
      </div>
    </div>
  );
}

export default App;

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Cast from './Cast';
import Map from './Map';
import Menu from './Menu';
import PlayerCh from './PlayerCh';

// Supabase related.
import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";
import { supabase } from './supabase';

function App() {
  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      {/* Stage */}
      <div class="z-0 w-[896px] h-[1092px] flex justify-center rounded-2xl bg-neutral-900">
        {/* Map Window */}
        <Map />
      </div>
        <div class="absolute w-[796px] h-[1092px] grid grid-cols-18 grid-rows-22 justify-end"> {/* Usable Stage */}
        <div class="col-span-18"></div>
        <div class="col-span-18 row-start-2"></div>
        <div class="col-span-18 row-start-3"></div>
        <div class="col-span-18 row-span-14 row-start-4 flex items-center justify-center"> {/* Centre everything in map */}
          <div class="text-center font-hultog-italic text-lg text-amber-50">MAP IS CENTRED</div>
        </div> 
        <div class="col-span-18 col-start-18 row-start-18 font-cascadia text-amber-50 text-right rounded p-1 select-none">
          <Menu />
        </div>
        <div class="col-span-18 col-start-1 row-span-3 row-start-19 font-cascadia rounded text-amber-50">
          <PlayerCh />
        </div>
        <div class="col-span-18 col-start-1 row-start-22"></div> {/* Blank row */}
      </div>
    </div>
  );
}

export default App;

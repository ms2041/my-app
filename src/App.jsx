import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import stage from './assets/ui/polaroid-positive.svg';
import Menu from './Menu';
import Player from './Player';
import { players, setPlayers } from './Cast';

function App() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');
  const [name, setName] = createSignal('Seven Against Thebes');
  const [specialInfo, setSpecialInfo] = createSignal('Prosthetic leg');

  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      <svg class="absolute w-[896px] h-[1092px] z-0 flex items-center justify-center">
        {/* Stage */}
        <rect class="stage" />

        {/* Map Window */}
        <rect class="map-window flex items-center justify-center" y="50" x="50" rx="10"></rect>
      </svg>
        <div class="absolute w-[796px] h-[1092px] grid grid-cols-18 grid-rows-22 gap-1 justify-end" z-10> {/* Usable Stage */}
        <div class="col-span-18"></div>
        <div class="col-span-18 row-start-2 text-center p-4 font-marta tracking-widest font-bold text-xl">{title()}</div> {/* Title or Scene */}
        <div class="col-span-18 row-span-14 row-start-3">map</div> 
        <div class="col-span-18 row-start-17"></div> {/* Blank row */}
        <div class="col-span-18 col-start-18 row-start-18 font-cascadia text-white text-right bg-neutral-800 rounded p-1 select-none">
          <Menu />
        </div>
        <div class="col-span-18 col-start-1 row-span-3 row-start-19 font-cascadia bg-neutral-200 rounded text-white">
          <Player player={players[playerIndex]}/>
        </div>
        <div class="col-span-18 col-start-1 row-start-22"></div> {/* Blank row */}
      </div>
    </div>
  );
}

export default App;

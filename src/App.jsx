import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import stage from './assets/ui/polaroid-positive.svg';
import Menu from './Menu';
import Player from './Player';

function App() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');
  const [name, setName] = createSignal('Seven Against Thebes');
  const [specialInfo, setSpecialInfo] = createSignal('Prosthetic leg');

  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      <img class="w-[896px]" src={stage} /> {/* 896px width stage for iMac screen */}
      <div class="absolute w-[796px] h-[1092px] grid grid-cols-18 grid-rows-22 gap-1 justify-end"> {/* Usable Stage */}
        <div class="bg-neutral-800 col-span-18">1</div>
        <div class="col-span-18 row-start-2 text-center p-4 font-marta tracking-widest font-bold text-xl">{title()}</div> {/* Title or Scene */}
        <div class="col-span-18 row-span-14 row-start-3">map</div> 
        <div class="col-span-18 row-start-17"></div>
        <div class="col-span-18 col-start-18 row-start-18 font-cascadia text-white text-right bg-neutral-800 rounded p-1">
          <Menu />
        </div>
        <div class="col-span-18 col-start-1 row-span-3 row-start-19 font-cascadia bg-neutral-200 rounded text-white">
          <Player />
        </div>
        <div class="col-span-18 col-start-1 row-start-22"></div> {/* Blank row */}
      </div>
    </div>
  );
}

export default App;

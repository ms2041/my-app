import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Cast from './Cast';

function Map() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');

  return (
    <div class="z-10 relative top-[0px] w-[896px] h-[846px] grid grid-cols-18 grid-rows-17 rounded-t-2xl bg-neutral-800">
      <div class="col-span-18 pb-0 row-start-1 text-center p-4 font-marta tracking-widest font-bold text-amber-50 text-xl">{title()}</div> {/* Title or Scene */}
      <div class="col-span-18 row-start-2 text-center p-4 font-hultog-italic tracking-widest font-bold text-base">
        <Cast />
      </div>
    </div>
  );
}

export default Map;
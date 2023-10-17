import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import stage from './assets/ui/polaroid-positive.svg';

function App() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');
  const [name, setName] = createSignal('Seven Against Thebes');
  const [specialInfo, setSpecialInfo] = createSignal('Prosthetic leg');
  const [stats, setStats] = createStore({
    str: '15',
    dex: '10',
    wil: '09',
    hp: '02',
  });
  const [money, setMoney] = createStore({
    ag: '00',
    au: '00',
    cu: '00',
  });


  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      <img class="w-[896px]" src={stage} />
      <div class="absolute w-[796px] h-[1092px] grid grid-cols-2 grid-rows-22 gap-1 justify-end ">
        <div class="col-span-2">1</div>
        <div class="col-span-2 row-start-2 text-center p-4 font-tinos text-xl">{title()}</div> {/* Title or Scene */}
        <div class="col-span-2 row-span-14 row-start-3">map</div>
        <div class="col-span-2 row-start-17"></div>
        <div class="row-start-18 font-cascadia text-white">{name()}</div>
        <div class="col-start-2 row-start-18 font-cascadia text-white text-right">Roll  Save  Quit</div>
        <div class="col-start-1 row-start-19 font-cascadia text-white">
          <div class="grid grid-cols-8">
            <div>S{stats.str}</div>
            <div>D{stats.dex}</div>
            <div>W{stats.wil}</div>
            <div>H{stats.hp}</div>
            <div>S{money.ag}</div>
            <div>G{money.au}</div>
            <div>C{money.cu}</div>
            <div></div>
          </div>
        </div>
        <div class="row-span-3 col-start-2 row-start-19font-cascadia text-white">equipment</div>
        <div class="col-start-1 row-start-20 font-cascadia text-white">{specialInfo()}</div>
        <div class="col-start-1 row-start-21 font-cascadia text-white">Seven warriors strong, Against Thebes they march along, Fate's cruel twist prolongs.</div>
        <div class="col-span-2 col-start-1 row-start-22"></div>
      </div>
    </div>
  );
}

export default App;

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { generatePlayer } from './actorStore';
import stage from './assets/ui/polaroid-positive.svg';

function App() {
  const [title, setTitle] = createSignal('THE UNFATHOMABLE UNDERWORLD');
  const [name, setName] = createSignal('Seven Against Thebes');
  const [specialInfo, setSpecialInfo] = createSignal('Prosthetic leg');
  const [stats, setStats] = createStore({
    str: '15',
    dex: '10',
    wil: '9',
    hp: '2',
  });
  const [money, setMoney] = createStore({
    shillings: '0',
    pennies: '0',
    guilders: '0',
  });

  // Function to modify a stat attribute based on click type
  const modifyStat = (attribute, increment) => {
    setStats(attribute, (prevValue) => String(parseInt(prevValue, 10) + increment));
    console.log("modifyStat called: ", attribute, increment);
  };

  // Function to modify a stat attribute based on click type
  const modifyMoney = (attribute, increment) => {
    setMoney(attribute, (prevValue) => String(parseInt(prevValue, 10) + increment));
  };

  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      <img class="w-[896px]" src={stage} />
      <div class="absolute w-[796px] h-[1092px] grid grid-cols-2 grid-rows-22 gap-1 justify-end ">
        <div class="col-span-2">1</div>
        <div class="col-span-2 row-start-2 text-center p-4 font-tinos text-xl">{title()}</div> {/* Title or Scene */}
        <div class="col-span-2 row-span-14 row-start-3">map</div> 
        <div class="col-span-2 row-start-17"></div>
        <div class="row-start-18 font-cascadia text-white">{name()}</div>
        <div class="col-start-2 row-start-18 font-cascadia text-white text-right">
          <div class="flex flex-row-reverse pl-">
            <div class="pl-6 hover:text-blue-300 cursor-pointer">Quit</div>
            <div class="pl-6 hover:text-blue-300 cursor-pointer">Save</div>
            <div class="pl-6 hover:text-blue-300 cursor-pointer" on:click={() => generatePlayer()}>Roll</div>
          </div>
        </div>
        <div class="col-start-1 row-start-19 font-cascadia text-white">
          <div class="grid grid-cols-8 select-none">
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyStat('str', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyStat('str', -1); // Decrement on right-click
              }}>St{stats.str}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyStat('dex', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyStat('dex', -1); // Decrement on right-click
              }}>Dx{stats.dex}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyStat('wil', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyStat('wil', -1); // Decrement on right-click
              }}>Ws{stats.wil}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyStat('hp', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyStat('hp', -1); // Decrement on right-click
              }}>Hp{stats.hp}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyMoney('shillings', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyMoney('shillings', -1); // Decrement on right-click
              }}>Sh{money.shillings}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyMoney('pennies', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyMoney('pennies', -1); // Decrement on right-click
              }}>Pn{money.pennies}
            </div>
            <div class="hover:text-blue-300 cursor-pointer"
              on:click={() => modifyMoney('guilders', 1)} // Increment on left-click
              on:contextmenu={(e) => {
                e.preventDefault();
                modifyMoney('guilders', -1); // Decrement on right-click
              }}>Gu{money.guilders}
            </div>
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

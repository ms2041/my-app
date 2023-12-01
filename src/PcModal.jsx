import { createSignal } from 'solid-js';
import { generatePc } from './Pc';

function PcModal({onClose}) {

  return (
    <div class="fixed top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-md w-128 h-128">
      <div class="flex justify-end">
        <button class="text-gray-500 hover:text-slate-700" onClick={onClose}>
          Close
        </button>
      </div>
      <h1 class="text-gray-800 font-hultog-italic font-bold text-center mb-8 mt-2">
        PC CAST LIST
      </h1>
      {/* Roll and Save buttons container */}
      <div class="flex justify-center">
        {/* Roll and Save buttons */}
        <div class="flex space-x-4">
          {/* Roll button */}
          <button class="text-gray-500 hover:text-slate-700" on:click={() => generatePc()}>
            Roll
          </button>
          {/* Save button */}
          <button class="text-gray-500 hover:text-slate-700" /* Add your onClick handler */>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PcModal;
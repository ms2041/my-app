import { createSignal } from 'solid-js';
import { playerChAbilities, setPlayerChAbilities, displayIndex } from './Cast';

function AbilitiesModal({ onClose, selectedSlot: [selectedSlot, setSelectedSlot] }) {
  const [selectedAbilitySlot, setSelectedAbilitySlot] = createSignal(selectedSlot);
  const [abilityName, setAbilityName] = createSignal('');
  const [abilityDescription, setAbilityDescription] = createSignal('');

  // Function to reset fields to empty strings
  const resetFields = () => {
    setAbilityName('');
    setAbilityDescription('');
  };

  // Function to save ability name to playerChAbilities array
  const saveAbility = () => {
    if (selectedAbilitySlot() !== null) {
      const index = selectedAbilitySlot();
      const updatedAbilities = [...playerChAbilities]; // Shallow copy the array
      updatedAbilities[displayIndex()].ability[index] = abilityName();
      console.log('saveAbility: ', index, abilityName(), ' updatedAbilities', updatedAbilities);
      setPlayerChAbilities(updatedAbilities);
    }
  };

  return (
    <div class="fixed top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-md w-128 h-128">
      <div class="flex justify-end">
        <button class="text-gray-500 hover:text-slate-700" onClick={onClose}>
          Close
        </button>
      </div>
      <h1 class="text-gray-800 font-hultog-italic font-bold text-center mb-4 mt-2">
        ADD ABILITY TO SLOT {selectedAbilitySlot() !== null ? selectedAbilitySlot() : 'None'}
      </h1>
      <div class="w-80 mx-auto">
        <div class="grid gap-2">
          <label class="text-gray-500">Name</label>
          <input
            type="text"
            class="text-gray-500 bg-gray-100 rounded px-2 py-1 w-full focus:outline-none focus:ring focus:border-blue-400"
            value={abilityName()}
            onInput={(e) => setAbilityName(e.target.value)}
          />
        </div>
        <div class="grid gap-2">
          <label class="text-gray-500">Description</label>
          <textarea
            class="text-gray-500 bg-gray-100 rounded px-2 py-1 w-full resize-none focus:outline-none focus:ring focus:border-blue-400"
            rows="3"
            value={abilityDescription()}
            onInput={(e) => setAbilityDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* Cancel and Save buttons container */}
      <div className="flex justify-center mt-8">
        {/* Cancel and Save buttons */}
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-slate-700" onClick={resetFields}>
            Cancel
          </button>
          <button className="text-gray-500 hover:text-slate-700" onClick={saveAbility}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AbilitiesModal;

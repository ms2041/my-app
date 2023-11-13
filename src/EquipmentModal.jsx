import { createSignal } from 'solid-js';

function EquipmentModal({ onClose, selectedItem }) {
  // Add your modal content here. This is just a basic example.
  return (
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md w-128 h-128">
      <div class="flex justify-end">
        <button class="text-gray-500 hover:text-gray-700" onClick={onClose}>
          Close
        </button>
      </div>
      <div>
        {/* Add your modal content here */}
        Selected Item: {selectedItem}
      </div>
    </div>
  );
}

export default EquipmentModal;

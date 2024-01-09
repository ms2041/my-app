import { createSignal } from 'solid-js';
import { items } from './oddpendium.jsx';
import { addEquipment, reorderEquipment, freeSlots } from './Equipment.jsx';
import { playerChEquipment } from './Cast.jsx';

function EquipmentModal({ onClose, selectedSlot: [selectedSlot, setSelectedSlot] }) {
  const [reactiveSelectedSlot, setReactiveSelectedSlot] = createSignal(selectedSlot);
  const [hoveredCategory, setHoveredCategory] = createSignal(null);
  const [hoveredItem, setHoveredItem] = createSignal(null);
  const [selectedItem, setSelectedItem] = createSignal(null);

  const uniqueCategories = Array.from(new Set(items.map(item => item.category)));

  // Function to find the items index when an item is clicked
  function findEquipmentRecord(clickedItem) {
    const slot = items.findIndex(item => item === clickedItem);
    console.log('findEquipmentRecord: ', slot, items[slot].name);
    return slot;
  }

  return (
    <div class="fixed top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-md w-128 h-128">
      <div class="flex justify-end">
        <button class="text-gray-500 hover:text-slate-700" onClick={onClose}>
          Close
        </button>
      </div>
      <h1 class="text-gray-800 font-hultog-italic font-bold text-center mb-8 mt-2">
        SELECT ITEM TO EQUIP SLOT {reactiveSelectedSlot() !== null ? reactiveSelectedSlot() : 'None'}
      </h1>
      <div class="fixed left-[24%]">
        <div class="grid grid-cols-2 gap-4 rounded p-1">
          <div class="text-gray-500 cursor-pointer">
            {/* Display categories */}
            <ol class="list-decimal pl-4">
              {uniqueCategories.map(category => (
                <li
                  onMouseEnter={() => setHoveredCategory(category)}
                  classList={{ 'text-blue-400': hoveredCategory() === category }}
                >
                  {category}
                </li>
              ))}
            </ol>
          </div>
          <div class="text-gray-500">
            {/* Display items for the hovered category */}
            {hoveredCategory() && (
              <ol class="list-decimal pl-4">
                {items
                  .filter(item => item.category === hoveredCategory())
                  .map(item => (
                    <li
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => {
                        setSelectedItem(item); // Update the selected item
                        console.log('Modal add equipment: ', item.name, item.slots, 'free slots:', freeSlots());
                        if (freeSlots() >= item.slots) {
                          addEquipment(item.name, selectedSlot());
                          reorderEquipment();
                          onClose();
                        } else {
                          // Need to implement an alert here.
                          console.log('Not enough equipment slots to add.');
                        }
                      }}
                      classList={{
                        'text-blue-400 cursor-pointer': hoveredItem() === item,
                        'text-sky-950': selectedItem() === item,
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentModal;

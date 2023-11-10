import { createSignal, onCleanup } from 'solid-js';

function EquipmentModal() {
  const [showModal, setShowModal] = createSignal(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Use onCleanup to remove event listeners when the component unmounts
  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const addEquipment = (item) => {
    // Implement your addEquipment logic here
    console.log('Adding equipment:', item);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>

      {showModal() && (
        <div class="modal">
          <div class="modal-content">
            <span class="close" onClick={closeModal}>
              &times;
            </span>
            <CategoriesList addEquipment={addEquipment} />
          </div>
        </div>
      )}
    </>
  );
}

function CategoriesList({ addEquipment }) {
  // This function should return the equipment array from the player
  const getEquipment = () => {
    // Implement your getEquipment logic here
    return [];
  };

  const categories = Array.from(
    new Set(items.map((item) => item.category))
  );

  return (
    <div>
      {categories.map((category) => (
        <div>
          <strong>{category}</strong>
          <ItemsList
            category={category}
            items={items.filter((item) => item.category === category)}
            addEquipment={addEquipment}
          />
        </div>
      ))}
    </div>
  );
}

function ItemsList({ category, items, addEquipment }) {
  return (
    <ul>
      {items.map((item) => (
        <li onClick={() => addEquipment(item)}>
          {item.name} - {item.cost}
        </li>
      ))}
    </ul>
  );
}

export default EquipmentModal;

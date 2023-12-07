import { generatePlayerCh } from './PlayerCh';
import { playerChData } from './Cast.jsx'; // Replace './Cast.jsx' with the correct path

function PlayerChModal({ onClose }) {
  // Helper function to get the name or '-'
  const getNameOrDash = (index) => {
    const name = playerChData[index]?.name || '-';
    return name === '' ? '-' : name;
  };

  const column1Indices = [2, 4, 6, 8, 10, 12, 14, 16];
  const column2Indices = [3, 5, 7, 9, 11, 13, 15, 17];

  // Function to add player character to scene based on index
  const addPlayerChToScene = (index) => {
    // Your logic to add player character to the scene using the index
    console.log(`Adding player character with index ${index} to the scene`);
  };

  return (
    <div className="fixed top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-md w-128 h-128">
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-slate-700" onClick={onClose}>
          Close
        </button>
      </div>
      <h1 className="text-gray-800 font-hultog-italic font-bold text-center mb-8 mt-2">
        PLAYERS LIST
      </h1>
      {/* Display playerChData names in two columns */}
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        {/* First column */}
        <div className="ml-[45%]">
          {column1Indices.map((index) => (
            <div key={index} onClick={() => addPlayerChToScene(index)} style={{ cursor: 'pointer' }}>
              {getNameOrDash(index)}
            </div>
          ))}
        </div>
        {/* Second column */}
        <div className="ml-2">
          {column2Indices.map((index) => (
            <div key={index} onClick={() => addPlayerChToScene(index)} style={{ cursor: 'pointer' }}>
              {getNameOrDash(index)}
            </div>
          ))}
        </div>
      </div>
      {/* Roll and Save buttons container */}
      <div className="flex justify-center mt-8">
        {/* Roll and Save buttons */}
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-slate-700" onClick={() => generatePlayerCh()}>
            Roll
          </button>
          <button className="text-gray-500 hover:text-slate-700" /* Add your onClick handler */>
            Save
          </button>
          <button className="text-gray-500 hover:text-slate-700" >
            Add
          </button>
          <button className="text-gray-500 hover:text-slate-700" >
            Remove
          </button>

        </div>
      </div>
    </div>
  );
}

export default PlayerChModal;

import { createSignal, Show } from 'solid-js';
import Login from './Login';
import App from './App';

export const [isPlayer, setIsPlayer] = createSignal(null); // Change the initial value to null
export const [isLoggedIn, setIsLoggedIn] = createSignal(false);

function Start() {
  const handlePlayerClick = () => {
    setIsPlayer(true);
  };

  const handleRefereeClick = () => {
    setIsPlayer(false);
  };

  const handleLogin = () => {
    // Perform login logic here (authentication, validation, etc.)
    // For demonstration purposes, assume successful login
    setIsLoggedIn(true);
    let loggedIn = isLoggedIn();
    console.log('handleLogin from Start.jsx : ', loggedIn)
  };

  const handleLinkClick = (player) => {
    // Logic to handle setting isPlayer signal
    if (player) {
      handlePlayerClick();
    } else {
      handleRefereeClick();
    }
  };

  return (
    <div class="relative h-screen flex items-center justify-center bg-black">
      {/* Start Screen */}
      <Show when={isPlayer() == null}>
        <div class="z-0 w-[896px] h-[1092px] flex justify-center items-center bg-neutral-900">
          <div class="z-10 text-white">
            {/* Player Link */}
            <div class="text-center p-4 font-marta tracking-widest font-bold text-xl">
              <a href="#" onClick={() => handleLinkClick(true)}>Player</a>
            </div>
            {/* Referee Link */}
            <div class="text-center p-4 font-marta tracking-widest font-bold text-xl">
              <a href="#" onClick={() => handleLinkClick(false)}>Referee</a>
            </div>
          </div>
        </div>
      </Show>

      {/* Show Login component based on isPlayer signal and isLoggedIn */}
      <Show when={isPlayer() !== null && !isLoggedIn()}>
        <Login role={isPlayer() ? "player" : "referee"} onLogin={handleLogin} />
      </Show>
      <Show when={isPlayer() && isLoggedIn()}>
        <App />
      </Show>
    </div>
  );
}

export default Start;

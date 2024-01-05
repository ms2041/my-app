import { createSignal } from 'solid-js';
import { isLoggedIn, setIsLoggedIn } from './Start';
import { supabase } from './supabase.js';

export const [email, setEmail] = createSignal('');
export const [otp, setOtp] = createSignal('');
export const [loading, setLoading] = createSignal(false);
export const [showOtpForm, setShowOtpForm] = createSignal(false); // New signal to control OTP form visibility
const [waitingResponse, setWaitingResponse] = createSignal(false);

function Login() {
  const handleLogin = async () => {
    try {
      setLoading(true);
      setWaitingResponse(true); // Show loading message
      
      // Send login email to Supabase
      const { error } = await supabase.auth.signInWithOtp({
        email: email(),
      });

      if (error) throw error;
      
      setShowOtpForm(true); // Display the OTP form and Verify OTP button
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
      setWaitingResponse(false); // Show loading message
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      
      // Send the OTP for verification
      const { error } = await supabase.auth.verifyOtp({
        email: email(),
        token: otp(),
        type: 'email'
      });

      if (error) throw error;
      
      // alert('OTP Verified!');
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="font-hultog-italic absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <form class="max-w-xl mx-auto shadow-md rounded px-4 py-6 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            class="max-w text-xl rounded py-2 px-3 text-gray-700"
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          class={`text-white text-base hover:text-blue-300 py-2 px-4 rounded focus:outline-none
            ${loading() || waitingResponse() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleLogin}
          disabled={loading() || waitingResponse()}
        >
          {waitingResponse() ? 'Sending...' : 'Log In'}
        </button>
        {showOtpForm() && ( // Conditionally render the OTP form and Verify OTP button
          <div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                One-Time Password
              </label>
              <input
                class="max-w text-xl rounded py-2 px-3 text-gray-700"
                id="otp"
                type="text"
                placeholder="Enter your OTP"
                value={otp()}
                onInput={(e) => setOtp(e.target.value)}
              />
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="text-white text-base hover:text-blue-300 py-2 px-4 rounded focus:outline-none"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;

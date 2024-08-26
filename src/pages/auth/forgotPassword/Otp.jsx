import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp, generateOtp } from "../../../store/slices/forgotPasswordSlice";

function Otp() {
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector((state) => state.forgotPassword.email);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(verifyOtp({ email, otp }));
        if (response?.payload?.success) {
            navigate('/auth/forgot-password/new-password');
        }
    };

    const handleResendOtp = async () => {
        const response = await dispatch(generateOtp({ email }));
        if (response?.payload?.success) {
            setTimeLeft(600);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-900">Enter OTP</h2>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="otp">
                            OTP
                        </label>
                        <input
                            className="shadow-md border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            id="otp"
                            name="otp"
                            type="text"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-4 mb-6">
                        <p className="text-gray-700 text-sm font-medium">
                            Time remaining: {formatTime(timeLeft)}
                        </p>
                        <button
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
                            type="submit"
                        >
                            Verify OTP
                        </button>
                        <button
                            className={`${
                                timeLeft > 0
                                    ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out`}
                            type="button"
                            onClick={handleResendOtp}
                            disabled={timeLeft > 0}
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Otp;

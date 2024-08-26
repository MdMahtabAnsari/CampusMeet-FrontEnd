import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/slices/forgotPasswordSlice";

function NewPassword() {
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const response = await dispatch(resetPassword({ password:password }));
        
        if (response?.payload?.success) {
            navigate('/auth/login');
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">New Password</h2>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow-md border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                            id="password"
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-required="true"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                                isSubmitting ? "cursor-not-allowed opacity-50" : "hover:scale-105 hover:from-blue-600 hover:to-blue-800"
                            }`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Reset Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPassword;

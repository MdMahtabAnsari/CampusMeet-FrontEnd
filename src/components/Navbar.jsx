import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import friendsLogo from "../assets/friends.png"; // Add your friends logo here
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../store/slices/authSlice";
import socket from "../api/socketIoClient";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { isConnected } = useSelector((state) => state.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response.payload.success) {
      navigate("/");
    } else {
      console.log("Error logging out");
    }
  };

  // Update navbar when user state changes
  useEffect(() => {
    if (isConnected) {
      socket.on("updatedProfile", (data) => {
        dispatch(updateUserData(data));
      });
    }
    return () => {
      socket.off("updatedProfile");
    };
  }, [isConnected, dispatch]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo and CampsMeet */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
              <span className="font-semibold text-xl tracking-tight">
                CampsMeet
              </span>
            </Link>
          </div>

          {/* Right side: Friends button and other buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && (
              <Link to="/friends">
                <img src={friendsLogo} alt="Friends" className="h-8 w-8" />
              </Link>
            )}
            {isLoggedIn ? (
              <>
                <Link to="/users/profile">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-gray-800 font-medium">
                      {user.name}
                    </span>
                  </div>
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col space-y-4">
          {isLoggedIn && (
            <Link to="/friends">
              <img src={friendsLogo} alt="Friends" className="h-8 w-8" />
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <Link to="/users/profile">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </div>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-center"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { updateUser } from "../store/slices/userSlice";
import { updateUserData } from "../store/slices/authSlice";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState({
    image: null,
    name: "",
    email: "",
    phone: "",
  });

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    } else if (user) {
      setUserData({
        image: user.image,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      setImagePreview(user.image);
    }
  }, [isLoggedIn, user, navigate]);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    if (userData.image) {
      formData.append("image", userData.image);
    }
    try {
      const response = await dispatch(updateUser(formData));
      if (response.payload?.success) {
        dispatch(updateUserData(response.payload.data));
      }

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
          <div className="flex flex-col items-center">
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <img
                    src={imagePreview} // Default image if none is selected
                    alt="User"
                    className="w-32 h-32 rounded-full border-4 border-gray-300 mb-6 cursor-pointer transition-transform transform hover:scale-105"
                  />
                </label>
              </>
            ) : (
              <img
                src={imagePreview} // Default image if none is set
                alt="User"
                className="w-32 h-32 rounded-full border-4 border-gray-300 mb-6"
              />
            )}

            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="text-3xl font-semibold mb-4 border-b border-gray-300 px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="text-lg mb-4 border-b border-gray-300 px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="text-lg mb-6 border-b border-gray-300 px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Phone Number"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold mb-4">{userData.name}</h2>
                <p className="text-lg text-gray-700 mb-4">{userData.email}</p>
                <p className="text-lg text-gray-700 mb-6">{userData.phone}</p>
              </>
            )}

            {isEditing ? (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleEditClick}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

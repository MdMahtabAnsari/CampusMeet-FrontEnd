import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const [image, setImage] = useState(null);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: null
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSignUpData({
        ...signUpData,
        image: file
      });
    } else {
      setImage(null);
    }
  };


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', signUpData.name);
    formData.append('email', signUpData.email);
    formData.append('phone', signUpData.phone);
    formData.append('password', signUpData.password);
    formData.append('image', signUpData.image);
    console.log(formData.forEach((value, key) => {
      console.log(key, value);
    }));
    const response = await dispatch(signUp(formData));
    // console.log(response);
    if (response?.payload?.success) {
      console.log('User signed up successfully');
      navigate('/auth/login');
    }


  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign up for an account</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              id="image"
              name='image'
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 h-32 w-32 object-cover rounded-full mx-auto"
              />
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name='name'
              value={signUpData.name}
              onChange={handleFieldChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              name='email'
              value={signUpData.email}
              onChange={handleFieldChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name='phone'
              value={signUpData.phone}
              onChange={handleFieldChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              value={signUpData.password}
              onChange={handleFieldChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

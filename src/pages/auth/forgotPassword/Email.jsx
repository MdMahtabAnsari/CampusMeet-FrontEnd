import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { generateOtp } from "../../../store/slices/forgotPasswordSlice"



function Email() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setEmailError('Email is required.')
      return
    }
    const response = await dispatch(generateOtp({ email }))
    if (response?.payload?.success) {
      navigate('/auth/forgot-password/otp')
    }


    setEmailError('')
    // Handle the form submission here (e.g., send a request to the server)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Forgot Password</h2>
          {emailError && <p className="text-red-600 text-sm mb-4 font-medium">{emailError}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Email

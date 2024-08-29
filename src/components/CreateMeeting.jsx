import { Link } from "react-router-dom";
function CreateMeeting() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/meetings/create/one-v-one">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl hover:bg-purple-50 transition-transform transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
              {/* Icon */}
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 10l-6 6-6-6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Create 1 on 1 Meeting
            </h3>
            <p className="text-gray-500 text-center">
              Create a personal single person meeting.
            </p>
          </div>
        </Link>
        <Link to="/meetings/create/one-v-many">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl hover:bg-purple-50 transition-transform transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
              {/* Icon */}
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h16v16H4V4z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Create Video Conference
            </h3>
            <p className="text-gray-500 text-center">
              Invite multiple persons to the meeting.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreateMeeting;

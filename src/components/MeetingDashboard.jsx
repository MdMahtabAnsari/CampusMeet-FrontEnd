import { Link } from "react-router-dom";

const MeetingDashboard = () => {
  const cards = [
    {
      title: "Create Meeting",
      description: "Create a new meeting and invite people.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      ),
      link: "/meetings",
    },
    {
      title: "My Meetings",
      description: "View your created meetings.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V4a4 4 0 118 0v3M5 10h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V12a2 2 0 012-2z"
          />
        </svg>
      ),
      link: "/status/creator",
    },
    {
      title: "Meetings",
      description: "View the meetings that you are invited to.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V4a4 4 0 118 0v3m2 9h.01M12 17h.01M12 14.5v.01M12 10h.01M6 12h.01M18 12h.01M6 16h.01M18 16h.01"
          />
        </svg>
      ),
      link: "/status/participant",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {cards.map((card) => (
          <Link to={card.link} key={card.title}>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-4 text-blue-500">{card.icon}</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {card.title}
              </h2>
              <p className="text-gray-600 text-center">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MeetingDashboard;

const meetings = [
    {
        name: 'Project Kickoff',
        description: 'Initial meeting to discuss project scope and timelines. This description is intentionally long to demonstrate how the text truncation and tooltip functionality work when dealing with large text content. It should be truncated if it exceeds the container width.',
        participants: ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Karl', 'Laura', 'Mallory', 'Nathan', 'Olivia', 'Peggy', 'Quentin', 'Ruth', 'Steve', 'Trudy', 'Ursula', 'Victor', 'Walter', 'Xander', 'Yvonne', 'Zach'],
        status: 'Upcoming',
        date: '2024-08-20',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
    },
    {
        name: 'Weekly Standup',
        description: 'Weekly meeting to update on project progress.',
        participants: ['Alice', 'Bob'],
        status: 'Upcoming',
        date: '2024-08-21',
        startTime: '09:00 AM',
        endTime: '09:30 AM',
    },
    // Add more meetings as needed
];

const UpcomingMeeting = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Upcoming Meetings</h1>
            <div className="space-y-4">
                {meetings.map((meeting, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{meeting.name}</h2>
                        <p className="text-gray-700 mb-2">
                            <strong>Description:</strong> {meeting.description}
                        </p>
                        <div className="mb-2">
                            <strong>Participants:</strong>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {meeting.participants.map((participant, idx) => (
                                    <span key={idx} className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 shadow-sm">
                                        {participant}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700 mb-2">
                            <strong>Status:</strong> {meeting.status}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Date:</strong> {meeting.date}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Start Time:</strong> {meeting.startTime}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>End Time:</strong> {meeting.endTime}
                        </p>
                        {/* <div className="flex space-x-2 mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Join
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                Edit
                            </button>
                            
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                Cancel

                            </button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMeeting;

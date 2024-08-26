import React, { useState } from 'react';

const participantsList = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Prince',
  'Evan Green',
  'Frank White',
  'Grace Lee',
  'Hannah Adams',
  'Ian Miller',
  'Jack Taylor',
  'Kelly Walker',
  'Laura Harris',
  'Mike Evans',
  'Nina Scott',
  'Oscar Thomas',
  'Paul Nelson',
  'Quinn Adams',
  'Rita Hall',
  'Steve Clark',
  'Tina Young',
  'Ursula Wright',
  'Victor King',
  'Wendy Martinez',
  'Xander Robinson',
  'Yvonne Lewis',
  'Zachary Harris'
];

const OneVOne = () => {
  const [formData, setFormData] = useState({
    meetingName: '',
    description: '',
    participants: '',
    meetingDate: '',
    startTime: '',
    endTime: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredParticipants = participantsList.filter(participant =>
    participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true); // Open the dropdown when typing
  };

  const handleSelect = (participant) => {
    setFormData({
      ...formData,
      participants: participant
    });
    setSearchTerm(participant);
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Meeting Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="meetingName" className="block text-sm font-medium text-gray-700">Meeting Name</label>
            <input
              type="text"
              id="meetingName"
              name="meetingName"
              value={formData.meetingName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              placeholder="Add a brief description..."
            />
          </div>

          <div className="relative dropdown">
            <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Participants</label>
            <input
              type="text"
              id="search"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              onClick={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg">
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map(participant => (
                    <div
                      key={participant}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelect(participant)}
                    >
                      {participant}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500">No participants found</div>
                )}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700">Meeting Date (DD/MM/YYYY)</label>
            <input
              type="text"
              id="meetingDate"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time (HH MM AM/PM)</label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="HH MM AM/PM"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time (HH MM AM/PM)</label>
              <input
                type="text"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="HH MM AM/PM"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OneVOne;

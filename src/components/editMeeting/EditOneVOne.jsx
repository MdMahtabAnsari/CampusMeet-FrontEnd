import{ useState } from "react";

const EditOneVOne = () => {
    const meeting = {
        title: "One vs One Meeting",
        description: "This is a one vs one meeting",
        participant: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            image: "path-to-john-image.jpg",
        },
        date: "01/01/2022",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
    };
  const [title, setTitle] = useState(meeting.title || "");
  const [description, setDescription] = useState(meeting.description || "");
  const [selectedParticipant, setSelectedParticipant] = useState(meeting.participant || null);
  const [availableParticipants, setAvailableParticipants] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", image: "path-to-john-image.jpg" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", image: "path-to-jane-image.jpg" },
  ]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(meeting.date || "");
  const [startTime, setStartTime] = useState(meeting.startTime || "");
  const [endTime, setEndTime] = useState(meeting.endTime || "");

  const selectParticipant = (participant) => {
    setSelectedParticipant(participant);
    setAvailableParticipants(availableParticipants.filter(p => p.id !== participant.id));
  };

  const removeParticipant = () => {
    setAvailableParticipants([...availableParticipants, selectedParticipant]);
    setSelectedParticipant(null);
  };

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.name.toLowerCase().includes(search.toLowerCase()) ||
    participant.email.toLowerCase().includes(search.toLowerCase()) ||
    participant.phone.includes(search)
  );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit One vs One Meeting</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Participant</label>
        {selectedParticipant ? (
          <div className="flex justify-between items-center border border-gray-300 rounded-md p-2 mb-2">
            <div className="flex items-center">
              <img
                src={selectedParticipant.image}
                alt={selectedParticipant.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{selectedParticipant.name} ({selectedParticipant.email})</span>
            </div>
            <button
              className="text-red-500"
              onClick={removeParticipant}
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <div className="border border-gray-300 rounded-md max-h-40 overflow-y-auto">
              {filteredParticipants.map(participant => (
                <div
                  key={participant.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectParticipant(participant)}
                >
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{participant.name} ({participant.email})</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD/MM/YYYY"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="HH:MM AM/PM"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">End Time</label>
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="HH:MM AM/PM"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        className="w-full p-2 bg-blue-500 text-white rounded-md"
        onClick={() => console.log({ title, description, selectedParticipant, date, startTime, endTime })}
      >
        Update Meeting
      </button>
    </div>
  );
};

export default EditOneVOne;

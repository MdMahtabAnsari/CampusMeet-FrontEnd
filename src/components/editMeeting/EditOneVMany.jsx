import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/slices/friendSlice";


const EditOneVMany = () => {
 

  const [title, setTitle] = useState(initialMeetingData.title || "");
  const [description, setDescription] = useState(initialMeetingData.description || "");
  const [participants, setParticipants] = useState(initialMeetingData.participants || []);
  const [availableParticipants, setAvailableParticipants] = useState(initialMeetingData.availableParticipants || []);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(initialMeetingData.date || "");
  const [startTime, setStartTime] = useState(initialMeetingData.startTime || "");
  const [endTime, setEndTime] = useState(initialMeetingData.endTime || "");

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
    setAvailableParticipants(availableParticipants.filter(p => p.id !== participant.id));
  };

  const removeParticipant = (id) => {
    const participant = participants.find(p => p.id === id);
    setAvailableParticipants([...availableParticipants, participant]);
    setParticipants(participants.filter(p => p.id !== id));
  };

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.name.toLowerCase().includes(search.toLowerCase()) ||
    participant.email.toLowerCase().includes(search.toLowerCase()) ||
    participant.phone.includes(search)
  );

  const handleSave = () => {
    // Logic to save the edited meeting data
    console.log({ title, description, participants, date, startTime, endTime });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit One vs Many Meeting</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Participants</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or phone"
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        <div className="border border-gray-300 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
          {filteredParticipants.map(participant => (
            <div
              key={participant.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => addParticipant(participant)}
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
        {participants.length > 0 && (
          <div className="mt-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
            {participants.map(participant => (
              <div
                key={participant.id}
                className="flex justify-between items-center border border-gray-300 rounded-md p-2 mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{participant.name} ({participant.email})</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => removeParticipant(participant.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD/MM/YYYY"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="HH:MM AM/PM"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">End Time</label>
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="HH:MM AM/PM"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditOneVMany;

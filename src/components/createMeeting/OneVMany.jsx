import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/slices/friendSlice";
import { createMeeting } from "../../store/slices/creatorMeetingSlice";

const OneVMany = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFriends() {
      try {
        await dispatch(getFriends());
        setAvailableParticipants(friends);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFriends();
  }, []);

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
    setAvailableParticipants(
      availableParticipants.filter((p) => p._id !== participant._id)
    );
  };

  const removeParticipant = (id) => {
    const participant = participants.find((p) => p._id === id);
    setAvailableParticipants([...availableParticipants, participant]);
    setParticipants(participants.filter((p) => p._id !== id));
  };

  const filteredParticipants = availableParticipants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(search.toLowerCase()) ||
      participant.email.toLowerCase().includes(search.toLowerCase()) ||
      participant.phone.includes(search)
  );

  const handleCreateMeeting = async () => {
    const data = {
      title: title,
      description: description,
      type: "Group",
      participants: participants.map((p) => p._id),
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
    try {
      const response = await dispatch(createMeeting(data));
      if (response?.payload?.data) {
        console.log("Meeting created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create a Meeting</h2>

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
            <label className="block text-gray-700">Participants</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <div className="border border-gray-300 rounded-md max-h-40 overflow-y-auto">
              {filteredParticipants.map((participant) => (
                <div
                  key={participant._id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addParticipant(participant)}
                >
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>
                    {participant.name} ({participant.email})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            {participants.length > 0 && (
              <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto">
                {participants.map((participant) => (
                  <div
                    key={participant._id}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={participant.image}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>
                        {participant.name} ({participant.email})
                      </span>
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => removeParticipant(participant._id)}
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
            onClick={handleCreateMeeting}
          >
            Create Meeting
          </button>
        </div>
      )}
      {isLoading && (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create a Meeting</h2>
          <p className="text-center">Loading...</p>
        </div>
      )}
    </>
  );
};

export default OneVMany;

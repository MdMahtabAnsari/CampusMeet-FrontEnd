import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/slices/friendSlice";
import { getMeetingById } from "../../store/slices/creatorMeetingSlice";
import { useParams,useNavigate } from "react-router-dom";
import { updateMeeting } from "../../store/slices/creatorMeetingSlice";

const EditOneVMany = () => {
 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {meetingId} = useParams();
  const friends = useSelector(state => state.friends.friends);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getFriends());
        setAvailableParticipants(friends);
        const response = await dispatch(getMeetingById(meetingId));
        if(response?.payload?.data) {
          const { title, description, participants, date, startTime, endTime } = response.payload.data;
          setTitle(title);
          setDescription(description);
          setParticipants(participants);
          setDate(date);
          setStartTime(startTime);
          setEndTime(endTime);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate(-1);
      }
    }
    fetchData();
  }, []);



  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
    setAvailableParticipants(availableParticipants.filter(p => p._id !== participant._id));
  };

  const removeParticipant = (id) => {
    const participant = participants.find(p => p._id === id);
    setAvailableParticipants([...availableParticipants, participant]);
    setParticipants(participants.filter(p => p._id !== id));
  };

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.name.toLowerCase().includes(search.toLowerCase()) ||
    participant.email.toLowerCase().includes(search.toLowerCase()) ||
    participant.phone.includes(search)
  );

  const handleUpdateMeeting = async() => {
    const data = {
      title: title,
      description: description,
      participants: participants.map(participant => participant._id),
      date: date,
      startTime: startTime,
      endTime: endTime,
      type: "Group"
    };
    try{
      await dispatch(updateMeeting({meetingId:meetingId,meetingData:data}));
     
    }
    catch(error){
      console.log(error);
    }

  };

  return (
    <>
    {!isLoading && (
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
              key={participant._id}
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
                key={participant._id}
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
        onClick={handleUpdateMeeting}
      >
        Update Meeting
      </button>
    </div>
    )}
    {isLoading && (
      <div className="flex items-center justify-center h-40">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8V4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    )}
    </>
  );
};

export default EditOneVMany;

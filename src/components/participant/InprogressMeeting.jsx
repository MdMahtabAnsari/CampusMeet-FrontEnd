import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getInProgressMeetings,
  jointMeeting,
} from "../../store/slices/participantMeetingSlice";
import { useNavigate } from "react-router-dom";

const InprogressMeeting = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const meetings = useSelector(
    (state) => state?.participantMeeting?.inProgressMeetings
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(getInProgressMeetings());
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const selectedMeetings = meetings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const pageCount = Math.ceil(meetings.length / ITEMS_PER_PAGE);

  const handleJoin = async (meetingId) => {
    try {
      const response = await dispatch(jointMeeting(meetingId));
      if (response.payload?.success) {
        navigate(`/meetings/participant/join/${meetingId}`);
        console.log("Join meeting");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Inprogress Meetings</h1>
          {meetings.length === 0 && (
            <p className="text-gray-700">No inprogress meetings found</p>
          )}
          {meetings.length > 0 && (
            <div className="space-y-4">
              {selectedMeetings?.map((meeting) => (
                <div
                  key={meeting._id}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {meeting.title}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {meeting?.description}
                  </p>
                  <div className="mb-2">
                    <strong>Creator:</strong>
                    <div className="mt-1 flex items-center gap-1">
                      <img
                        src={meeting.createdBy?.image}
                        alt={meeting.createdBy?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <p>{meeting.createdBy?.name}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Participants:</strong>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {meeting?.participants?.map((participant) => (
                        <div
                          key={participant._id}
                          className="flex items-center gap-1"
                        >
                          <img
                            src={participant?.image}
                            alt={participant?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <p>{participant?.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>Status:</strong> {meeting?.status}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Date:</strong> {meeting?.date}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Start Time:</strong> {meeting?.startTime}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>End Time:</strong> {meeting?.endTime}
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-sm hover:bg-blue-600"
                      onClick={() => handleJoin(meeting?._id)}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex justify-center mt-8"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active text-blue-600"}
            />
          )}
        </div>
      )}
      {isLoading && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      )}
    </>
  );
};

export default InprogressMeeting;

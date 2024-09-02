import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingMeetings } from "../../store/slices/participantMeetingSlice";
import ReactPaginate from "react-paginate";

const UpcomingMeeting = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const meetings = useSelector(
    (state) => state?.participantMeeting?.upcomingMeetings
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        await dispatch(getUpcomingMeetings());
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const ITEMS_PER_PAGE = 10;
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentMeetings = meetings.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(meetings.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Upcoming Meetings</h1>
          {meetings?.length === 0 && (
            <p className="text-gray-700">No upcoming meetings found</p>
          )}
          {meetings?.length > 0 && (
            <div className="space-y-4">
              {currentMeetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {meeting?.title}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {meeting?.description}
                  </p>
                  <div className="mb-2">
                    <strong>Creator:</strong>
                    <div className="mt-1 flex items-center gap-1">
                      <img
                        src={meeting?.createdBy?.image}
                        alt={meeting?.createdBy?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <p>{meeting?.createdBy?.name}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>Participants:</strong>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {meeting?.participants?.map((participant) => (
                        <div
                          key={participant?._id}
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
                </div>
              ))}
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"flex justify-center mt-8"}
                  pageClassName={"mx-1"}
                  pageLinkClassName={
                    "px-3 py-1 border rounded hover:bg-gray-200"
                  }
                  previousClassName={"mx-1"}
                  previousLinkClassName={
                    "px-3 py-1 border rounded hover:bg-gray-200"
                  }
                  nextClassName={"mx-1"}
                  nextLinkClassName={
                    "px-3 py-1 border rounded hover:bg-gray-200"
                  }
                  breakClassName={"mx-1"}
                  breakLinkClassName={"px-3 py-1 border rounded"}
                  activeClassName={"bg-blue-500 text-white"}
                />
              )}
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      )}
    </>
  );
};

export default UpcomingMeeting;

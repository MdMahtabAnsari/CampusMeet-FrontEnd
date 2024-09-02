import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getCancelledMeetings } from "../../store/slices/participantMeetingSlice";

const CancelledMeeting = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const meetings = useSelector(
    (state) => state?.participantMeeting?.cancelledMeetings
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(getCancelledMeetings());
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = meetings.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(meetings?.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Cancelled Meetings</h1>
          {meetings?.length === 0 && (
            <p className="text-gray-700">No cancelled meetings found</p>
          )}
          {meetings?.length > 0 && (
            <div className="space-y-4">
              {currentItems.map((meeting) => (
                <div
                  key={meeting?._id}
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
            </div>
          )}

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={
                "pagination flex flex-wrap space-x-2 justify-center sm:justify-end"
              }
              pageClassName={"page-item"}
              pageLinkClassName={
                "page-link px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100"
              }
              previousLinkClassName={
                "px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100"
              }
              nextLinkClassName={
                "px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100"
              }
              activeClassName={"bg-blue-500 text-white"}
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

export default CancelledMeeting;

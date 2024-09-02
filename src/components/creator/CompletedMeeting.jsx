import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getCompletedMeetings } from "../../store/slices/creatorMeetingSlice";

const CompletedMeeting = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const meetings = useSelector(
    (state) => state?.creatorMeeting?.completedMeetings
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCompletedMeetings());
        if (!response?.payload?.success) {
          throw response?.payload?.message;
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const meetingsPerPage = 10;

  // Calculate the number of pages
  const pageCount = Math.ceil(meetings?.length / meetingsPerPage);

  // Get current meetings
  const currentMeetings = meetings?.slice(
    currentPage * meetingsPerPage,
    (currentPage + 1) * meetingsPerPage
  );

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6">Completed Meetings</h1>
          {meetings.length === 0 && (
            <p className="text-gray-700">No completed meetings found</p>
          )}
          {meetings?.length > 0 && (
            <div className="space-y-4">
              {currentMeetings?.map((meeting) => (
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
          <div className="mt-6">
            {pageCount > 1 && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center space-x-2"}
                pageClassName={"page-item"}
                pageLinkClassName={
                  "px-3 py-1 border rounded-lg hover:bg-gray-200"
                }
                previousLinkClassName={
                  "px-3 py-1 border rounded-lg hover:bg-gray-200"
                }
                nextLinkClassName={
                  "px-3 py-1 border rounded-lg hover:bg-gray-200"
                }
                breakLinkClassName={"px-3 py-1 border rounded-lg"}
                activeClassName={"bg-blue-500 text-white"}
              />
            )}
          </div>
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

export default CompletedMeeting;

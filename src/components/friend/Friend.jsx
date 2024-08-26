import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getFriends, unfriend } from "../../store/slices/friendSlice";

const Friend = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [friendsPerPage] = useState(10); // Number of friends to show per page, set a default value
  const dispatch = useDispatch();
  const friendsData = useSelector((state) => state.friends.friends);

  const friendsLength = friendsData?.length;

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getFriends());
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [friendsLength, dispatch]);

  const handleUnfriend = async (_id) => {
    try {
      await dispatch(unfriend(_id));
    } catch (err) {
      setError(err);
    }
  };

  // Pagination logic
  const offset = currentPage * friendsPerPage;
  const currentFriends = friendsData?.slice(offset, offset + friendsPerPage);
  const pageCount = Math.ceil(friendsLength / friendsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {!isLoading && !error && (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Friends List</h1>
          {currentFriends?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentFriends.map((friend) => (
                  <div
                    key={friend._id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                  >
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{friend.name}</h3>
                      <p className="text-gray-600">{friend.email}</p>
                      <p className="text-gray-600">{friend.phone}</p>
                    </div>
                    <button
                      onClick={() => handleUnfriend(friend._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Unfriend
                    </button>
                  </div>
                ))}
              </div>
              {pageCount>1&&(<ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center mt-8"}
                pageClassName={"mx-1"}
                pageLinkClassName={"px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200"}
                previousLinkClassName={"px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200"}
                nextLinkClassName={"px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200"}
                breakLinkClassName={"px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200"}
                activeClassName={"bg-blue-500 text-white"}
              />)}
            </div>
          ) : (
            <p className="text-gray-500">No friends available.</p>
          )}
        </div>
      )}
      {isLoading && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {error && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
    </>
  );
};

export default Friend;

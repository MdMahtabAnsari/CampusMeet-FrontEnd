import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getNonFriends, sendFriendRequest } from "../../store/slices/friendSlice";

function AddFriends() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const nonFriends = useSelector((state) => state.friends.nonFriends);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(getNonFriends());
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSendRequest = async (_id) => {
        try {
            await dispatch(sendFriendRequest(_id));
        } catch (err) {
            setError(err);
        }
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentNonFriends = nonFriends?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(nonFriends?.length / itemsPerPage);

    return (
        <>
            {!isLoading && (
                <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Add Friends</h1>
                    {currentNonFriends?.length > 0 ? (
                        currentNonFriends.map((request) => (
                            <div key={request._id} className="p-3 sm:p-4 bg-white rounded shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <img
                                        src={request.image}
                                        alt={request.name}
                                        className="w-12 h-12 sm:w-12 sm:h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold">{request.name}</h2>
                                        <p className="text-sm text-gray-500">{request.email}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button className="text-green-500 font-semibold hover:underline" onClick={() => handleSendRequest(request._id)}>Send Request</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No friend requests available.</p>
                    )}

                    {pageCount > 1&&(<ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex justify-center mt-4"}
                        activeClassName={"active bg-blue-500 text-white px-3 py-1 rounded"}
                        pageClassName={"px-3 py-1 cursor-pointer"}
                        previousClassName={"px-3 py-1 cursor-pointer"}
                        nextClassName={"px-3 py-1 cursor-pointer"}
                        disabledClassName={"text-gray-500 cursor-not-allowed"}
                    />)
                    }

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
}

export default AddFriends;

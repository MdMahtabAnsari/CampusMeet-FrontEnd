import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { getSentFriendRequests, cancelFriendRequest } from '../../store/slices/friendSlice';

function SentRequest() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const sentRequests = useSelector((state) => state.friends.sentFriendRequests);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getSentFriendRequests());
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const requestsPerPage = 10;

    // Calculate the current requests to show
    const offset = currentPage * requestsPerPage;
    const currentRequests = sentRequests.slice(offset, offset + requestsPerPage);
    const pageCount = Math.ceil(sentRequests.length / requestsPerPage);

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handelCancelRequest = async (_id) => {
        try {
            await dispatch(cancelFriendRequest(_id));
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            {!isLoading &&(
                <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Sent Requests</h1>
                    {currentRequests.length > 0 ? (
                        <>
                            {currentRequests.map((request) => (
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
                                        <button className="text-red-500 font-semibold hover:underline" onClick={() => handelCancelRequest(request._id)}>Cancel</button>
                                    </div>
                                </div>
                            ))}

                            {pageCount>1&&(<ReactPaginate
                                previousLabel={'← Previous'}
                                nextLabel={'Next →'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination flex flex-wrap space-x-2 justify-center sm:justify-end mt-6'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100'}
                                previousLinkClassName={'px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100'}
                                nextLinkClassName={'px-2 py-1 sm:px-3 sm:py-2 border rounded text-blue-500 hover:bg-blue-100'}
                                activeClassName={'bg-blue-500 text-white'}
                                ariaLabel={'Pagination'}
                                role={'navigation'}
                            />)}
                        </>
                    ) : (
                        <p className="text-gray-500">No friend requests available.</p>
                    )}
                </div>
            )}
            {isLoading && (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="loader">Loading...</div>
                </div>
            )}
            {error && (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <p className="text-red-500">Failed to load sent requests: {error.message}</p>
                </div>
            )}
        </>
    );
}

export default SentRequest;

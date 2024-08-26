import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../../components/friend/Friend";
import FriendRequest from "../../components/friend/FriendRequest";
import SentRequest from "../../components/friend/SentRequest";
import AddFriends from "../../components/friend/AddFriends";
import Navbar from "../../components/Navbar";

const FriendPage = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth/login');
        }
    }, [isLoggedIn, navigate]);

    const [friendType, setFriendType] = useState('friendRequest');

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Friends</h1>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <button
                        aria-pressed={friendType === 'friendRequest'}
                        className={`mb-2 sm:mb-0 px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
                        ${friendType === 'friendRequest' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                        onClick={() => setFriendType('friendRequest')}
                    >
                        Friend Request
                    </button>
                    <button
                        aria-pressed={friendType === 'friend'}
                        className={`mb-2 sm:mb-0 px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
                        ${friendType === 'friend' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                        onClick={() => setFriendType('friend')}
                    >
                        Friends
                    </button>
                    <button
                        aria-pressed={friendType === 'sentRequest'}
                        className={`mb-2 sm:mb-0 px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
                        ${friendType === 'sentRequest' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                        onClick={() => setFriendType('sentRequest')}
                    >
                        Sent Requests
                    </button>
                    <button
                        aria-pressed={friendType === 'addFriends'}
                        className={`mb-2 sm:mb-0 px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
                        ${friendType === 'addFriends' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                        onClick={() => setFriendType('addFriends')}
                    >
                        Add Friends
                    </button>
                </div>
                <div className="mt-6">
                    {friendType === 'friendRequest' && <FriendRequest />}
                    {friendType === 'friend' && <Friend />}
                    {friendType === 'sentRequest' && <SentRequest />}
                    {friendType === 'addFriends' && <AddFriends />}
                </div>
            </div>
        </>
    );
};

export default FriendPage;

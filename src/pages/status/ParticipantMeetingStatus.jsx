import { useState,useEffect } from "react"
import CompletedMeeting from "../../components/participant/CompletedMeeting"
import UpcomingMeeting from "../../components/participant/UpcomingMeeting"
import InprogressMeeting from "../../components/participant/InprogressMeeting"
import CancelledMeeting from "../../components/participant/CancelledMeeting"
import Navbar from "../../components/Navbar"
import { useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"

function ParticipantMeetingStatus() {
    const {isLoggedIn} = useSelector(state => state?.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth/login')
        }
    }, [])

    const [meetingStatus, setMeetingStatus] = useState("upcoming")



    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6 sm:p-8">

            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Participant Meeting Status</h1>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <button
                    aria-pressed={meetingStatus === 'upcoming'}
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
            ${meetingStatus === 'upcoming' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                    onClick={() => setMeetingStatus('upcoming')}
                >
                    Upcoming
                </button>

                <button
                    aria-pressed={meetingStatus === 'inprogress'}
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
            ${meetingStatus === 'inprogress' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                    onClick={() => setMeetingStatus('inprogress')}
                >
                    Inprogress
                </button>

                <button
                    aria-pressed={meetingStatus === 'completed'}
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
            ${meetingStatus === 'completed' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                    onClick={() => setMeetingStatus('completed')}
                >
                    Completed
                </button>

                <button
                    aria-pressed={meetingStatus === 'cancelled'}
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300 ease-in-out
            ${meetingStatus === 'cancelled' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                    onClick={() => setMeetingStatus('cancelled')}
                >
                    Cancelled
                </button>
            </div>

            {meetingStatus === 'upcoming' && <UpcomingMeeting />}
            {meetingStatus === 'inprogress' && <InprogressMeeting />}
            {meetingStatus === 'completed' && <CompletedMeeting />}
            {meetingStatus === 'cancelled' && <CancelledMeeting />}
        </div>
        </>




    )
}

export default ParticipantMeetingStatus
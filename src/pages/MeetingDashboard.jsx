import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateMeeting from '../components/CreateMeeting';
import Navbar from '../components/Navbar';

function MeetingDashboard() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/auth/login');
        }
    },[]);
  return (
    <>
    <Navbar />
   <CreateMeeting />
   </>
  )
}

export default MeetingDashboard
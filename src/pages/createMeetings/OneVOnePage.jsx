import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OneVOne from "../../components/createMeeting/OneVOne"
import Navbar from "../../components/Navbar"

function OneVOnePage() {
    const { isLoggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth/login')
        }
    }, [])

    return (
        <>
            <Navbar />
            <OneVOne />
        </>
    )
}

export default OneVOnePage
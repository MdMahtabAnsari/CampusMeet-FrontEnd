import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import OneVMany from "../../components/createMeeting/OneVMany"
import Navbar from "../../components/Navbar"
function OneVManyPage() {
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
    <OneVMany />
    </>
  )
}

export default OneVManyPage
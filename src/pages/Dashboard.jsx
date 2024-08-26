import Hero from "../components/Hero"
import MeetingDashboard from "../components/MeetingDashboard"
import Navbar from "../components/Navbar"
import About from "../components/About"
import { useSelector } from "react-redux"



function Dashboard() {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      {
        isLoggedIn ? (
          <MeetingDashboard />
        ) : (
          <>
          <Hero />
          <About />
          </>
        )
      }
    </>
  )
}

export default Dashboard
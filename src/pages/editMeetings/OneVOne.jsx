import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EditOneVOne from "../../components/editMeeting/EditOneVOne";

const EditOneVOnePage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoggedIn) {
          await dispatch(logout());
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    }
    fetchData();
  }, [isLoggedIn, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <EditOneVOne />
    </>
  );
};

export default EditOneVOnePage;

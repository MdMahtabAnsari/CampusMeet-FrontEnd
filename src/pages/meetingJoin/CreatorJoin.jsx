import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingByIdAndStatus } from "../../store/slices/creatorMeetingSlice";

function CreatorJoin() {
  const [isLoading, setIsLoading] = useState(true);
 
  const [meeting, setMeeting] = useState(null);
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          getMeetingByIdAndStatus({ meetingId, status: "in-progress" })
        );
        if (response.payload?.success) {
          setMeeting(response.payload?.data);
        } else {
          navigate("/status/creator");
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!isLoading && meeting && (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
          <div className="w-full h-full">
            <JitsiMeeting
              domain={import.meta.env.VITE_JITSI_DOMAIN}
              roomName={`${meetingId}${meeting.title}`}
              configOverwrite={{
                disableDeepLinking: true,
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                enableWelcomePage: false,
                // prejoinPageEnabled: false,
                disableInviteFunctions: true,
              }}
              interfaceConfigOverwrite={{
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_POWERED_BY: false,
                SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                DEFAULT_LOGO_URL: "",
                DEFAULT_WELCOME_PAGE_LOGO_URL: "",
                JITSI_WATERMARK_LINK: "",
                BRAND_WATERMARK_LINK: "",
                MOBILE_APP_PROMO: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                SHOW_DEEP_LINKING_IMAGE: false,
              }}
              userInfo={{
                displayName: user.name, // Replace with the user's display name
                email: user.email, // Replace with the user's email address (optional)

                // Add a custom avatar URL
                avatar: user.image,
              }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100%";
                iframeRef.style.width = "100%";
              }}
              onReadyToClose={() => {
                navigate("/status/creator");
              }}
            />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
      
    </>
  );
}

export default CreatorJoin;

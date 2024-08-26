import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingByIdAndStatus } from "../../store/slices/creatorMeetingSlice";

function CreatorJoin() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meeting, setMeeting] = useState(null);
    const { meetingId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getMeetingByIdAndStatus({ meetingId, status: 'in-progress' }));
                if (response.payload?.success) {
                    setMeeting(response.payload?.data);
                }
                else {
                    navigate('/meeting/in-progress');
                }
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }
        , [dispatch, meetingId, navigate]);



    return (
        <>
            {!isLoading && meeting && (
                <JitsiMeeting
                    domain="localhost"
                    roomName={meeting._id + meeting.title}
                    userInfo={{
                        displayName: user.name,
                        email: user.email,
                    }}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        startWithVideoMuted: true,
                        enableWelcomePage: false,
                        disableDeepLinking: true,
                        disableInviteFunctions: true,
                        enableClosePage: false,
                        enableNoisyMicDetection: true,
                        enableNoisyMicDetectionTitle: "Your mic is making noise",
                        enableNoisyMicDetectionDescription: "Please mute your mic to stop the noise",
                        enableDisplayNameInStats: true,
                        enableCalendarIntegration: false,
                        enableFeaturesBasedOnToken: false,
                        disableThirdPartyRequests: true,
                        enableP2P: true,
                        p2p: {
                            enabled: true,
                            preferH264: true,
                            disableH264: true,
                            useStunTurn: true,
                        },
                        resolution: 720,
                        constraints: {
                            video: {
                                height: {
                                    ideal: 720,
                                    max: 720,
                                    min: 180,
                                },
                                width: {
                                    ideal: 1280,
                                    max: 1280,
                                    min: 320,
                                },
                            },
                        },
                        enableLipSync: true,
                        enableTalkWhileMuted: true,
                        enableLayerSuspension: true,
                        enableFollowMe: true,
                        enableInsecureRoomNameWarning: true,
                        enableVideoBackgroundBlur: true,
                        enableVideoBackgroundBlurSharing: true,
                        enableTileView: true,
                       

                    }}

                    interfaceConfigOverwrite={{
                        filmStripOnly: false,
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        DEFAULT_REMOTE_DISPLAY_NAME: "Fellow Creator",
                        SETTINGS_SECTIONS: ['devices', 'language'],
                        TOOLBAR_ALWAYS_VISIBLE: false,
                        JITSI_WATERMARK_LINK: 'https://meet.jit.si',
                        SHOW_BRAND_WATERMARK: false,
                        SHOW_POWERED_BY: false,
                        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                        TOOLBAR_BUTTONS: [
                            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                            'security'
                        ],
                        LOCAL_THUMBNAIL_RATIO: 16 / 9,
                        REMOTE_THUMBNAIL_RATIO: 16 / 9,
                        DEFAULT_BACKGROUND: '#f0f0f0',
                        
                        
                        
                    }}

                    onReadyToClose={() => {
                        navigate('/meeting/in-progress');
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = '100vh';
                        iframeRef.style.width = '100%';
                    }}
                />
            )}
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-2xl">Loading...</p>
                </div>
            )}
            {error && (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-2xl text-red-500">{error.toString()}</p>
                </div>
            )}
        </>
    );
}

export default CreatorJoin;

'use client';
import { usePoseLandmarker } from '@/hooks/usePoseLandMarker';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useWebcam } from '@/hooks/useWebcam';
import { Button } from '@/components/ui/button';
import { PoseCanvas } from '@/components/AI/PoseDetection';

export const PoseLandmarkerComponent = () => {
    const { poseLandmarker, error: poseError } = usePoseLandmarker();
    const {
        videoRef,
        isWebcamOn,
        error: webcamError,
        enableWebcam,
    } = useWebcam();
    const { isConnected, pushUpCount, sendLandmarks } = useWebSocket();

    const handleLandmarksDetected = (landmarks: any) => {
        sendLandmarks(landmarks);
    };

    return (
        <div className="relative w-[500px] h-[400px] border-2 rounded-xl flex justify-center items-center overflow-hidden">
            <video
                ref={videoRef}
                className={`${
                    isWebcamOn ? 'block' : 'hidden'
                } absolute w-full h-full`}
                autoPlay
                playsInline
            />

            <PoseCanvas
                videoRef={videoRef}
                poseLandmarker={poseLandmarker}
                onLandmarksDetected={handleLandmarksDetected}
                isWebcamOn={isWebcamOn}
            />

            {!isWebcamOn && (
                <Button
                    className="absolute"
                    onClick={enableWebcam}
                    disabled={!isConnected}
                >
                    Give Access
                </Button>
            )}

            <div className="absolute bottom-5 text-white">
                Push-up Count: {pushUpCount}
            </div>

            {(webcamError || poseError) && (
                <div className="absolute top-5 text-red-500">
                    {webcamError || poseError}
                </div>
            )}

            {!isConnected && (
                <div className="absolute top-5 text-yellow-500">
                    Connecting to server...
                </div>
            )}
        </div>
    );
};
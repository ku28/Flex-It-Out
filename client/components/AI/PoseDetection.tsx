'use client';
import { useState, useEffect, useRef } from 'react';
import { drawPose } from '@/components/AI/drawPose';
import {
    PoseLandmarker,
    PoseLandmarkerResult,
} from '@mediapipe/tasks-vision';

interface PoseCanvasProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    poseLandmarker: PoseLandmarker | null;
    onLandmarksDetected: (landmarks: any) => void;
    isWebcamOn: boolean;
}

export const PoseCanvas = ({
    videoRef,
    poseLandmarker,
    onLandmarksDetected,
    isWebcamOn,
}: PoseCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        if (!isWebcamOn || !poseLandmarker) return;

        let animationFrameId: number;
        const ctx = canvasRef.current?.getContext('2d');

        const handleVideoMetadataLoaded = () => {
            setIsVideoReady(true);
        };

        const processFrame = async () => {
            if (
                !videoRef.current ||
                !poseLandmarker ||
                !ctx ||
                !canvasRef.current
            )
                return;

            const video = videoRef.current;

            if (
                !isVideoReady ||
                video.videoWidth <= 0 ||
                video.videoHeight <= 0
            ) {
                return;
            }

            // Set canvas dimensions to match video dimensions
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;

            const results: PoseLandmarkerResult =
                await poseLandmarker.detectForVideo(
                    video,
                    performance.now()
                );

            ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            if (results.landmarks.length > 0) {
                drawPose(ctx, results.landmarks[0]);
                onLandmarksDetected(results.landmarks[0]);
            }

            animationFrameId = requestAnimationFrame(processFrame);
        };

        videoRef.current?.addEventListener(
            'loadedmetadata',
            handleVideoMetadataLoaded
        );

        processFrame();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            videoRef.current?.removeEventListener(
                'loadedmetadata',
                handleVideoMetadataLoaded
            );
        };
    }, [
        videoRef,
        poseLandmarker,
        isWebcamOn,
        onLandmarksDetected,
        isVideoReady,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute w-full h-full object-cover ${
                isWebcamOn ? 'block' : 'hidden'
            }`}
        />
    );
};

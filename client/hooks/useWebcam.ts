'use client';
import { useEffect, useRef, useState } from 'react';

export const useWebcam = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null); // To store the stream

    const enableWebcam = async () => {
        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {
            setError('Webcam not supported on this device/browser');
            return;
        }

        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
                setStream(newStream);
                setIsWebcamOn(true);
            }
        } catch (error) {
            setError('Failed to access webcam');
            console.error(error);
        }
    };

    const disableWebcam = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setIsWebcamOn(false);
        }
    };


    useEffect(() => {
        return () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [stream]);

    return {
        videoRef,
        isWebcamOn,
        error,
        enableWebcam,
        disableWebcam,
    };
};
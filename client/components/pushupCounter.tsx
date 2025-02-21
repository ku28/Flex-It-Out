'use client';
import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

export function PushupCounter() {
    const [isRecording, setIsRecording] = useState(false);
    const [count, setCount] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsRecording(true);
                // Here you would implement the AI detection logic
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                />
                {!isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={startRecording}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            <Camera className="w-5 h-5" />
                            <span>Start Recording</span>
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4 text-center">
                <p className="text-3xl font-bold">Count: {count}</p>
            </div>
        </div>
    );
}

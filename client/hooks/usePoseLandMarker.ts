'use client';
import { useState, useEffect } from 'react';
import {
    FilesetResolver,
    PoseLandmarker,
} from '@mediapipe/tasks-vision';

export const usePoseLandmarker = () => {
    const [poseLandmarker, setPoseLandmarker] =
        useState<PoseLandmarker | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializePoseLandmarker = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
                );
                const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                        baseOptions: {
                            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                            delegate: 'GPU'
                        },
                        runningMode: 'VIDEO',
                        numPoses: 1,
                    });

                setPoseLandmarker(poseLandmarker);
            } catch (err) {
                setError('Failed to initialize PoseLandmarker');
                console.error(err);
            }
        };

        initializePoseLandmarker();

        return () => {
            setPoseLandmarker(null);
        };
    }, []);

    return { poseLandmarker, error };
};

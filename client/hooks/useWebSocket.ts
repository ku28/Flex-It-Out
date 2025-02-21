'use client';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from '@/lib/auth';

interface WebSocketMessage {
    type: string;
    count?: number;
}

export const useWebSocket = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [pushUpCount, setPushUpCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const connectWebSocket = () => {
        if (socketRef.current) {
            socketRef.current.close(); // Ensure any existing WebSocket is closed before creating a new one
        }

        socketRef.current = new WebSocket(API_URL);

        socketRef.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket connected');
            setError(null);
        };

        socketRef.current.onmessage = (event) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data);
                if (data.type === 'pushup_detected' && data.count) {
                    setPushUpCount(
                        (prev) => prev + (data.count as number) || 0
                    );
                }
            } catch (error) {
                console.error(
                    'Error parsing WebSocket message:',
                    error
                );
            }
        };

        socketRef.current.onerror = (err) => {
            console.error('WebSocket error:', err);
            setError('WebSocket connection error');
        };

        socketRef.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket disconnected');
            setError('WebSocket disconnected');
            // Optionally implement reconnection here:
            setTimeout(() => {
                console.log('Reconnecting WebSocket...');
                connectWebSocket();
            }, 5000);
        };
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            socketRef.current?.close(); // Clean up WebSocket on component unmount
        };
    }, []);

    const sendLandmarks = (landmarks: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify({
                    type: 'pushup',
                    landmarks,
                })
            );
        } else {
            console.warn('WebSocket is not open');
        }
    };

    return {
        isConnected,
        pushUpCount,
        sendLandmarks,
        error, // Expose error state to display error messages in the UI
    };
};
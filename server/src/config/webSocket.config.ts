import WebSocket, { WebSocketServer } from 'ws';
import { detectPushUp } from '@/utils/detectPushup.js';
import { Server as HttpServer } from 'http';

interface ParsedData {
    type: string;
    landmarks?: any;
}

let wss: WebSocketServer;

export const initializeWebSocket = (server: HttpServer): WebSocketServer => {
    wss = new WebSocketServer({ server });

    wss.on('connection', (ws: WebSocket) => {
        console.log('New WebSocket connection');

        ws.on('message', (data: WebSocket.RawData) => {
            try {
                const parsedData: ParsedData = JSON.parse(data.toString());

                if (parsedData.type === 'pushup' && parsedData.landmarks) {
                    const pushUpDetected = detectPushUp(parsedData.landmarks);
                    if (pushUpDetected) {
                        ws.send(
                            JSON.stringify({
                                type: 'pushup_detected',
                                count: 1,
                            })
                        );
                    }
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });

    return wss;
};

export const getWss = (): WebSocketServer => wss;
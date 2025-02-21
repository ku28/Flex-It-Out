'use client';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';

const POSE_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 7],  // Right arm
    [0, 4], [4, 5], [5, 6], [6, 8],  // Left arm
    [9, 10], [11, 12],  // Shoulders
    [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],  // Left leg
    [12, 14], [14, 16], [16, 18], [16, 20], [16, 22]   // Right leg
];

export const drawPose = (ctx: CanvasRenderingContext2D, landmarks: NormalizedLandmark[]) => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    // Draw Landmarks (dots)
    landmarks.forEach((landmark) => {
        const x = landmark.x * ctx.canvas.width;
        const y = landmark.y * ctx.canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw Connections (lines)
    ctx.strokeStyle = "lime"; // Skeleton color
    ctx.lineWidth = 3;
    POSE_CONNECTIONS.forEach(([startIdx, endIdx]) => {
        const start = landmarks[startIdx];
        const end = landmarks[endIdx];

        if (start && end) {
            const x1 = start.x * ctx.canvas.width;
            const y1 = start.y * ctx.canvas.height;
            const x2 = end.x * ctx.canvas.width;
            const y2 = end.y * ctx.canvas.height;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    });
};

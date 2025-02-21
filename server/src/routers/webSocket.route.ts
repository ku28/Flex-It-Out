import { Router } from 'express';
import { getWss } from '@/config/webSocket.config.js';
import { ExerciseCount } from '@/models/ExerciseCount.js';

const router = Router();

router.get('/status', (req, res) => {
    const wss = getWss();
    return res.json({
        clients: wss.clients.size,
        status: 'active',
    });
});

router.post('/pushups/config', (req, res) => {
    return res.json({ message: 'Configuration updated' });
});

// WebSocket event handling
const wss = getWss();
if (wss) {
    wss.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('exercise-count', async (data: { userId: string, count: number }) => {
            try {
                await ExerciseCount.create({
                    userId: data.userId,
                    exerciseType: 'pushup',
                    count: data.count
                });

                // Emit updated leaderboard
                const leaderboard = await getLeaderboard();
                wss.clients.forEach(client => {
                    if (client.readyState === client.OPEN) {
                        client.send(JSON.stringify({ event: 'leaderboard-update', data: leaderboard }));
                    }
                });
            } catch (error) {
                console.error('Error saving exercise count:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

// Function to get leaderboard
async function getLeaderboard() {
    return await ExerciseCount.aggregate([
        {
            $group: {
                _id: '$userId',
                totalCount: { $sum: '$count' }
            }
        },
        { $sort: { totalCount: -1 } },
        { $limit: 10 }
    ]);
}

export default router;
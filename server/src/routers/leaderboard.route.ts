import { Router } from 'express';
import { ExerciseCount } from '@/models/ExerciseCount.js';

const router = Router();

router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await ExerciseCount.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalCount: { $sum: '$count' }
                }
            },
            { $sort: { totalCount: -1 } },
            { $limit: 10 }
        ]);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

export default router;
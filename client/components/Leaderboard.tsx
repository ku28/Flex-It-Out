"use client";

import { useEffect, useState } from 'react';
import { Card } from './ui/card';

declare global {
    interface Window {
        socket: any;
    }
}

interface LeaderboardEntry {
    _id: string;
    totalCount: number;
}

export function Leaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        // Initial fetch
        fetchLeaderboard();

        // Ensure socket is available
        if (window.socket) {
            const socket = window.socket;

            // Listen for real-time updates
            socket.on('leaderboard-update', (data: LeaderboardEntry[]) => {
                setEntries(data);
            });

            return () => {
                socket.off('leaderboard-update');
            };
        }
    }, []);

    const fetchLeaderboard = async () => {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setEntries(data);
    };

    return (
        <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <div className="space-y-2">
                {entries.map((entry, index) => (
                    <div key={entry._id} className="flex justify-between items-center">
                        <span>#{index + 1} User {entry._id}</span>
                        <span className="font-bold">{entry.totalCount} Push-ups</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
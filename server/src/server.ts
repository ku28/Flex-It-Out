import app from '@/app.js';
import { connectDb } from '@/config/db.config.js';
import env from '@/config/validateEnv.config.js';
import http from 'http';
import { initializeWebSocket } from '@/config/webSocket.config.js';

const PORT = env.PORT || 4000;

const server = http.createServer(app);

initializeWebSocket(server);

await connectDb();
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

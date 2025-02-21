import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
import { cleanEnv, str, email, testOnly } from 'envalid';

const env = cleanEnv(process.env, {
    MONGODB_URI: str({
        devDefault: testOnly('mongodb://localhost:27017'),
    }),
    PORT: str({ default: '4000' }),
    JWT_SECRET: str({ example: 'randomString' }),
    GOOGLE_CLIENT_ID: str({ example: 'your-google-app-client-id' }),
    tokenExpiration: str({ default: '7d' }),
    FRONTEND_URL: str({
        default: 'http://localhost:3000',
    }),
    ADMIN_EMAIL: email({ default: 'admin@example.com' }),
    NODE_ENV: str({
        choices: ['development', 'test', 'production', 'staging'],
        default: 'development',
    }),
}, {
    reporter: ({ errors }) => {
        if (Object.keys(errors).length > 0) console.error('Invalid env variables:', Object.keys(errors));
    }
});

export default env;
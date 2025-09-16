import express from 'express';
import cors from 'cors';
import authRoutes from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "MangaFlow!",
        version: "1.0.0",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login",
            protected: "GET /api/auth/protected"
        }
    });
});

app.use('/api/auth', authRoutes);

export default app;

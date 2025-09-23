import express from 'express';
import cors from 'cors';
import authRoutes from './routes/routes.js';
import bookRoutes from './routes/bookRoutes.js';

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
            protected: "GET /api/auth/protected",

            getAllBooks: "GET /api/books",
            getBook: "GET /api/books/:id",
            createBook: "POST /api/books",
            updateBook: "PUT /api/books/:id",
            deleteBook: "DELETE /api/books/:id"
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

export default app;

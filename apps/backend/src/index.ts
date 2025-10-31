import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';
import cors from 'cors';

export * from './validations/index.js';
export * from './utils/auth.js';
export * from './services/class-service.js'
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
apiRouter(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

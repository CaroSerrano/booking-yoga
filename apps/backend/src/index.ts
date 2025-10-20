import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
apiRouter(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

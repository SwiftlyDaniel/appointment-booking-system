import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error('Error caught in the server middleware:', err.message);
	res.status(500).json({ error: 'Internal server error' });
});

app.use((req: Request, res: Response) => {
	res.status(404).json({ error: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
}

export default app;
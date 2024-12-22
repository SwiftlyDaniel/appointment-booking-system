import { Router, Request, Response } from 'express';
import { getAvailableSlots, bookSlot } from './db';

const router = Router();

router.get('/', (res: Response) => {
	res.send('Appointment Booking API');
});

router.get('/slots', async (req: Request, res: Response) => {
	try {
		const date = req.query.date as string;
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(date)) {
			res.status(400).json({ error: 'Date must be in the format YYYY-MM-DD' });
		} else if (!date) {
			res.status(400).json({ error: 'Date is required' });
		} else {
			const slots = await getAvailableSlots(date);
			res.json(slots);
		}
	} catch (error) {
		res.status(500).json({ error: error instanceof Error ? error.message : error });
	}
});

router.post('/slots/:slotId/book', async (req: Request, res: Response) => {
	try {
		const slotId = parseInt(req.params.slotId);
		const name = req.body.name as string;
		if (isNaN(slotId)) {
			res.status(400).json({ error: 'Slot ID must be a number' });
		} else if (!slotId || !name) {
			res.status(400).json({ error: 'Slot ID and name are required' });
		} else {
			const slot = await bookSlot(slotId, name);
			res.json(slot);
		}
	} catch (error) {
		res.status(500).json({ error: error instanceof Error ? error.message : error });
	}
});

export default router;
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface Slot {
	id: number;
	start_date: string;
	booked: boolean;
}

export const getAvailableSlots = async (date: string): Promise<Slot[]> => {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateRegex.test(date)) {
		throw new Error('Date must be in the format YYYY-MM-DD');
	}

	const result = await pool.query(
		'SELECT id, start_date, booked FROM slots WHERE start_date::date = $1 ORDER BY start_date',
		[date]
	);
	return result.rows;
};

export const bookSlot = async (slotId: number, name: string): Promise<Slot> => {
	const checkResult = await pool.query(
		'SELECT booked FROM slots WHERE id = $1',
		[slotId]
	);

	if (checkResult.rows.length === 0) {
		throw new Error('Slot not found');
	}

	if (checkResult.rows[0].booked) {
		throw new Error('Slot is already booked');
	}

	const result = await pool.query(
		'UPDATE slots SET booked = true, booked_by = $1 WHERE id = $2 RETURNING id, start_date, booked',
		[name, slotId]
	);

	return result.rows[0];
};
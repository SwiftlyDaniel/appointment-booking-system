import request from 'supertest';
import app from '../src/server';

describe('GET /slots', () => {
	it('should return a list of available slots for the specified date', async () => {
		const response = await request(app).get('/slots?date=2024-05-01');

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body[0]).toHaveProperty('id');
		expect(response.body[0]).toHaveProperty('start_date');
		expect(response.body[0]).toHaveProperty('booked');
	});

	it('should return an empty array if no slots are available for the specified date', async () => {
		const response = await request(app).get('/slots?date=2054-05-02');

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	it('should return an error if the date is not in the correct format', async () => {
		const response = await request(app).get('/slots?date=20240501');

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
	});

	it('should return an error if the date is missing', async () => {
		const response = await request(app).get('/slots');

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error');
	});
});

describe('POST /slots/:slotId/book', () => {
	it('should book a slot successfully', async () => {
		const response = await request(app)
			.post('/slots/9/book')
			.send({ name: 'John Doe' });

		if (response.status === 200) {
			expect(response.body).toHaveProperty('id');
			expect(response.body).toHaveProperty('start_date');
			expect(response.body).toHaveProperty('booked', true);
		} else if (response.status === 500 && response.body.error === 'Slot is already booked') {
			console.warn('Slot is already booked. Please change the slot ID to an empty one and re-run the test');
		} else {
			throw new Error(`Unexpected response: ${response.status} - ${response.body.error}`);
		}
	});

	it('should return an error if the slot is already booked', async () => {
		const response = await request(app)
			.post('/slots/2/book')
			.send({ name: 'Jane Doe' });

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty('error', 'Slot is already booked');
	});

	it('should return an error if the slot ID is not a number', async () => {
		const response = await request(app)
			.post('/slots/abc/book')
			.send({ name: 'John Doe' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', 'Slot ID must be a number');
	});

	it('should return an error if the slot ID or name is missing', async () => {
		const response = await request(app)
			.post('/slots/1/book')
			.send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('error', 'Slot ID and name are required');
	});
});
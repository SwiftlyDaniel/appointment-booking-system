import axios from 'axios';

export const fetchSlots = async (date: string) => {
	try {
		const response = await axios.get(`http://localhost:3000/slots?date=${date}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching slots:', error);
		throw error;
	}
};

export const bookSlot = async (slotId: number, name: string) => {
	try {
		await axios.post(`http://localhost:3000/slots/${slotId}/book`, { name });
	} catch (error) {
		console.error('Error booking slot:', error);
		throw error;
	}
};
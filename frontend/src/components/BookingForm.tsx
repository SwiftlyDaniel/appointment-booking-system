import React from 'react';
import SlotButton from './SlotButton';

interface Slot {
	id: number;
	start_date: string;
	booked: boolean;
}

interface BookingFormProps {
	date: string;
	setDate: (date: string) => void;
	handleFetchSlots: (date: string) => void;
	slots: Slot[];
	setSelectedSlot: (slot: Slot | null) => void;
	setIsModalOpen: (isOpen: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
	date,
	setDate,
	handleFetchSlots,
	slots,
	setSelectedSlot,
	setIsModalOpen,
}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg w-96" role="form" aria-labelledby="booking-form-title">
			<h1 id="booking-form-title" className="text-2xl font-bold mb-4">Booking</h1>
			<div className="mb-4 flex items-end gap-2">
				<label htmlFor="booking-date" className="shrink-0 text-gray-700 text-lg font-semibold">Date</label>
				<input
					id="booking-date"
					type="date"
					value={date}
					onChange={(e) => {
						setDate(e.target.value);
						handleFetchSlots(e.target.value);
					}}
					className="px-2 border border-gray-300 rounded w-full"
					aria-required="true"
				/>
			</div>
			{slots.length > 0 && (
				<p className="text-gray-700 text-lg font-semibold mb-2">Pick a slot</p>
			)}
			<div className="grid grid-cols-3 gap-4 mb-4" role="list" aria-label="Available Slots">
				{slots.map((slot) => (
					<SlotButton
						key={slot.id}
						slot={slot}
						onClick={() => {
							if (!slot.booked) {
								setSelectedSlot(slot);
								setIsModalOpen(true);
							}
						}}
						aria-label={`Slot at ${new Date(slot.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
					/>
				))}
			</div>
		</div>
	);
};

export default BookingForm;
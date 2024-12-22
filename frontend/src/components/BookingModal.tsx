import React from 'react';

interface BookingModalProps {
	selectedSlot: {
		id: number;
		start_date: string;
	};
	name: string;
	setName: (name: string) => void;
	bookSlot: () => void;
	closeModal: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ selectedSlot, name, setName, bookSlot, closeModal }) => {
	const formattedDate = new Date(selectedSlot.start_date).toLocaleDateString('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
	const formattedTime = new Date(selectedSlot.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<div className="w-80 rounded-lg bg-white p-6" role="document">
				<h2 id="modal-title" className="text-xl font-bold mb-4">Book this slot?</h2>
				<div className="mb-4 flex items-end gap-2">
					<label className="shrink-0 text-base font-semibold text-gray-700" htmlFor="name">
						Your Name:
					</label>
					<input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
						className="px-2 border border-gray-300 rounded w-full"
						aria-required="true"
					/>
				</div>
				<div className='mb-4' id="modal-description">
					<p><strong>Date:</strong> <time dateTime={selectedSlot.start_date}>{formattedDate}</time></p>
					<p><strong>Time:</strong> <time dateTime={selectedSlot.start_date}>{formattedTime}</time></p>
					<p><strong>Duration:</strong> 60 minutes</p>
				</div>
				<div className="flex gap-2 justify-center">
					<button
						onClick={closeModal}
						className="py-2 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
						aria-label="Cancel"
					>
						Cancel
					</button>
					<button
						onClick={bookSlot}
						className="py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-24"
						aria-label="Book Slot"
					>
						Book Slot
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;
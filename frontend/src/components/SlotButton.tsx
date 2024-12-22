import React from 'react';

interface SlotButtonProps {
	slot: {
		id: number;
		start_date: string;
		booked: boolean;
	};
	onClick: () => void;
}

const SlotButton: React.FC<SlotButtonProps> = ({ slot, onClick }) => {
	const formattedTime = new Date(slot.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	return (
		<button
			onClick={onClick}
			className={`p-2 rounded-lg text-white ${slot.booked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
			disabled={slot.booked}
			aria-label={`Slot at ${formattedTime}`}
			aria-disabled={slot.booked}
		>
			<time dateTime={slot.start_date}>{formattedTime}</time>
		</button>
	);
};

export default SlotButton;
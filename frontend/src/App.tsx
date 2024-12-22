import React, { useState, useEffect } from 'react';
import { fetchSlots, bookSlot } from './services/api';
import BookingForm from './components/BookingForm';
import BookingModal from './components/BookingModal';

interface Slot {
  id: number;
  start_date: string;
  booked: boolean;
}

const App: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    handleFetchSlots(today);
  }, []);

  const handleFetchSlots = async (date: string) => {
    try {
      const slots = await fetchSlots(date);
      setSlots(slots);
			console.log(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;

    try {
      await bookSlot(selectedSlot.id, name);
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === selectedSlot.id ? { ...slot, booked: true } : slot
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <BookingForm
        date={date}
        setDate={setDate}
        handleFetchSlots={handleFetchSlots}
        slots={slots}
        setSelectedSlot={setSelectedSlot}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && selectedSlot && (
        <BookingModal
          selectedSlot={selectedSlot}
          name={name}
          setName={setName}
          bookSlot={handleBookSlot}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
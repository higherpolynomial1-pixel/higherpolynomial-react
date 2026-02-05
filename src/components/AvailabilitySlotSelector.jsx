import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const AvailabilitySlotSelector = ({ courseId, onSelect }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${courseId}/doubt-slots`);
                if (response.ok) {
                    const data = await response.json();
                    setSlots(data.slots || []);
                }
            } catch (error) {
                console.error("Failed to fetch slots", error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) fetchSlots();
    }, [courseId]);

    const handleSelect = (id) => {
        setSelectedId(id);
        onSelect(id);
    };

    if (loading) return <div className="text-gray-400 text-sm animate-pulse">Loading available slots...</div>;

    if (slots.length === 0) return (
        <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg text-orange-700 text-sm">
            No availability slots found for this course. Please contact the admin or try again later.
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
            {slots.map(slot => {
                const startDate = new Date(slot.start_time);
                const endDate = new Date(slot.end_time);
                const isSelected = selectedId === slot.id;

                return (
                    <div
                        key={slot.id}
                        onClick={() => handleSelect(slot.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar size={14} className={isSelected ? "text-blue-600" : "text-gray-400"} />
                            <span className={`text-sm font-bold ${isSelected ? "text-blue-900" : "text-gray-700"}`}>
                                {startDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className={isSelected ? "text-blue-600" : "text-gray-400"} />
                            <span className={`text-xs font-semibold ${isSelected ? "text-blue-700" : "text-gray-500"}`}>
                                {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AvailabilitySlotSelector;

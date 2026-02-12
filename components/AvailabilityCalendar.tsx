
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarStatus } from '../types';

interface AvailabilityCalendarProps {
  availability: Record<string, CalendarStatus>;
  onDateSelect?: (date: string) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ availability, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  const offset = firstDayOfMonth(year, month);
  const totalDays = daysInMonth(year, month);

  // Padding
  for (let i = 0; i < offset; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 border border-slate-50"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const status = availability[dateStr] || CalendarStatus.AVAILABLE;
    
    let bgColor = 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100';
    if (status === CalendarStatus.BOOKED) bgColor = 'bg-rose-100 text-rose-800 cursor-not-allowed';
    if (status === CalendarStatus.HELD) bgColor = 'bg-amber-100 text-amber-800';

    days.push(
      <button
        key={d}
        disabled={status === CalendarStatus.BOOKED}
        onClick={() => onDateSelect?.(dateStr)}
        className={`h-10 text-xs font-medium border border-white transition-colors flex items-center justify-center rounded-sm ${bgColor}`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-200">
        <h3 className="font-semibold text-slate-800 text-sm">{monthNames[month]} {year}</h3>
        <div className="flex space-x-1">
          <button onClick={prevMonth} className="p-1.5 hover:bg-white rounded-md transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-white rounded-md transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="p-2 grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="text-[10px] font-bold text-slate-400 text-center py-1">{day}</div>
        ))}
        {days}
      </div>
      <div className="p-4 border-t border-slate-100 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm"></div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Available</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-rose-100 border border-rose-300 rounded-sm"></div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Booked</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm"></div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Option</span>
        </div>
      </div>
    </div>
  );
};

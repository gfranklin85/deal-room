'use client';

import { useState, useEffect } from 'react';
import { differenceInSeconds, isPast, parseISO } from 'date-fns';

interface CountdownTimerProps {
  deadline: string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(deadline: string): TimeRemaining {
  const deadlineDate = parseISO(deadline);

  if (isPast(deadlineDate)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = differenceInSeconds(deadlineDate, new Date());

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isExpired: false };
}

export default function CountdownTimer({ deadline, className = '' }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(deadline)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (timeRemaining.isExpired) {
    return (
      <div className={`flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm text-red-800 ${className}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Deadline passed</span>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeRemaining;

  return (
    <div className={`flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-800 ${className}`}>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        <span className="font-medium">Deadline:</span>{' '}
        {days > 0 && <span>{days}d </span>}
        {(days > 0 || hours > 0) && <span>{hours}h </span>}
        {(days === 0) && <span>{minutes}m </span>}
        {(days === 0 && hours === 0) && <span>{seconds}s</span>}
      </span>
    </div>
  );
}

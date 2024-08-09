import { FC, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const CountdownTimer: FC<{
  endDate: Dayjs;
  onCountdownComplete: () => void;
}> = ({ endDate, onCountdownComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = dayjs();
    const end = dayjs(endDate);
    const duration = dayjs.duration(end.diff(now));
    const minutes = Math.floor(duration.asMinutes());
    const seconds = duration.seconds();

    if (minutes === 0 && seconds === 0) {
      onCountdownComplete();
    }

    return { minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [endDate]);

  return (
    <div>
      <h1>
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </h1>
    </div>
  );
};

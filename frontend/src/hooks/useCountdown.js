import {
  useEffect,
  useState,
} from "react";

function calculateTimeLeft(
  targetDate
) {
  const targetTime =
    new Date(
      targetDate
    ).getTime();

  const now =
    Date.now();

  const difference =
    targetTime - now;

  if (
    Number.isNaN(targetTime) ||
    difference <= 0
  ) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ended: true,
    };
  }

  return {
    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (difference / 1000) %
        60
    ),

    ended: false,
  };
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] =
    useState(() =>
      calculateTimeLeft(
        targetDate
      )
    );

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setTimeLeft(
          calculateTimeLeft(
            targetDate
          )
        );
      }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [targetDate]);

  return timeLeft;
}

export default useCountdown;
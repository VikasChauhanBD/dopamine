import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const TARGET_DATE = "2027-09-05T00:00:00";

function getTimeRemaining(targetDate) {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    completed: difference === 0,
  };
}

function CountdownTimer({
  title = "The Man Burns In",
  targetDate = TARGET_DATE,
  buttonText = "Come Home to BRC",
  buttonLink = "/",
}) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    const updateTimer = () => {
      setTime(getTimeRemaining(targetDate));
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <div className="countdown-content">
          <h2 className="countdown-title">{title}</h2>

          {time.completed ? (
            <p className="countdown-completed">The countdown has ended!</p>
          ) : (
            <div
              className="countdown-timer"
              role="timer"
              aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
            >
              <div className="countdown-unit">
                <span className="countdown-number">
                  {String(time.days).padStart(2, "0")}
                </span>
                <span className="countdown-label">Days</span>
              </div>

              <span className="countdown-separator">:</span>

              <div className="countdown-unit">
                <span className="countdown-number">
                  {String(time.hours).padStart(2, "0")}
                </span>
                <span className="countdown-label">Hours</span>
              </div>

              <span className="countdown-separator">:</span>

              <div className="countdown-unit">
                <span className="countdown-number">
                  {String(time.minutes).padStart(2, "0")}
                </span>
                <span className="countdown-label">Minutes</span>
              </div>

              <span className="countdown-separator">:</span>

              <div className="countdown-unit">
                <span className="countdown-number">
                  {String(time.seconds).padStart(2, "0")}
                </span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          )}

          <a className="countdown-button" href={buttonLink}>
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default CountdownTimer;

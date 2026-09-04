import {
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import styles from "./WinnerSlider.module.css";

const announcements = [
  {
    id: 1,
    user: "VE****21",
    prize: "iPhone 15 Pro",
  },
  {
    id: 2,
    user: "VE****83",
    prize: "Apple Watch",
  },
  {
    id: 3,
    user: "VE****54",
    prize: "AirPods Pro",
  },
  {
    id: 4,
    user: "VE****92",
    prize: "₹2,000 Amazon Voucher",
  },
];

function WinnerSlider() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const next = () => {
    setActiveIndex(
      (current) =>
        (current + 1) %
        announcements.length
    );
  };

  const previous = () => {
    setActiveIndex(
      (current) =>
        current === 0
          ? announcements.length - 1
          : current - 1
    );
  };

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const interval =
      window.setInterval(() => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            announcements.length
        );
      }, 5000);

    return () =>
      window.clearInterval(interval);
  }, [paused]);

  const winner =
    announcements[activeIndex];

  return (
    <section
      className={styles.section}
      aria-label="Previous winner announcements"
    >
      <div className="container">
        <div
          className={styles.slider}
          onMouseEnter={() =>
            setPaused(true)
          }
          onMouseLeave={() =>
            setPaused(false)
          }
        >
          <div className={styles.label}>
            <span className={styles.icon}>
              <Trophy size={17} />
            </span>

            <div>
              <small>
                WINNER SPOTLIGHT
              </small>

              <strong>
                Reward moments
              </strong>
            </div>
          </div>

          <div
            className={styles.message}
            aria-live="polite"
          >
            <span className={styles.dot} />

            <p key={winner.id}>
              <strong>
                {winner.user}
              </strong>{" "}
              won{" "}
              <b>
                {winner.prize}
              </b>
            </p>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous winner"
            >
              <ChevronLeft size={17} />
            </button>

            <span>
              {activeIndex + 1}/
              {announcements.length}
            </span>

            <button
              type="button"
              onClick={next}
              aria-label="Next winner"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Demonstration winner data shown for
          frontend development.
        </p>
      </div>
    </section>
  );
}

export default WinnerSlider;
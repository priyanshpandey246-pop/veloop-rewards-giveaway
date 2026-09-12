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

function WinnerSlider({
  winners = [],
}) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [paused, setPaused] =
    useState(false);

  const count =
    winners.length;

  const next = () => {
    if (!count) {
      return;
    }

    setActiveIndex(
      (current) =>
        (current + 1) %
        count
    );
  };

  const previous = () => {
    if (!count) {
      return;
    }

    setActiveIndex(
      (current) =>
        current === 0
          ? count - 1
          : current - 1
    );
  };

  useEffect(() => {
    if (
      paused ||
      count <= 1
    ) {
      return undefined;
    }

    const interval =
      window.setInterval(
        () => {
          setActiveIndex(
            (current) =>
              (current + 1) %
              count
          );
        },
        5000
      );

    return () =>
      window.clearInterval(
        interval
      );
  }, [paused, count]);

  if (!count) {
    return null;
  }

  const safeIndex =
    activeIndex < count
      ? activeIndex
      : 0;

  const winner =
    winners[safeIndex];

  return (
    <section
      className={
        styles.section
      }
      aria-label="Previous winner announcements"
    >
      <div className="container">
        <div
          className={
            styles.slider
          }
          onMouseEnter={() =>
            setPaused(true)
          }
          onMouseLeave={() =>
            setPaused(false)
          }
        >
          <div
            className={
              styles.label
            }
          >
            <span
              className={
                styles.icon
              }
            >
              <Trophy
                size={17}
              />
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
            className={
              styles.message
            }
            aria-live="polite"
          >
            <span
              className={
                styles.dot
              }
            />

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

          <div
            className={
              styles.controls
            }
          >
            <button
              type="button"
              onClick={
                previous
              }
              aria-label="Previous winner"
            >
              <ChevronLeft
                size={17}
              />
            </button>

            <span>
              {safeIndex + 1}/
              {count}
            </span>

            <button
              type="button"
              onClick={next}
              aria-label="Next winner"
            >
              <ChevronRight
                size={17}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WinnerSlider;
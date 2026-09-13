import useCountdown from "../../../hooks/useCountdown";
import styles from "./Countdown.module.css";

function pad(value) {
    return String(value).padStart(2, "0");
} 

function Countdown({ endDate }) {
    const {
        days,
        hours,
        minutes,
        seconds,
        ended,
    } = useCountdown(endDate);

    if (ended) {
        return (
            <span className={styles.ended}>
                Giveaway Ended
            </span>
        );
    }

    return (
        <div className={styles.timer}
        aria-label={`${days} days ${hours} hours ${minutes} minutes${seconds} seconds remaining`}
        >
            <div>
                <strong>{pad(days)}</strong>
                <span>Days</span>
            </div>

            <b>:</b>

            <div>
                <strong>{pad(hours)}</strong>
                <span>HRS</span>
            </div>

            <b>:</b>

            <div>
                <strong>{pad(minutes)}</strong>
                <span>MIN</span>
            </div>

            <b>:</b>

            <div>
                <strong>{pad(seconds)}</strong>
                <span>SEC</span>
            </div>
        </div>
    )
}

export default Countdown;



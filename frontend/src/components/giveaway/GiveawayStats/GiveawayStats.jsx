import {
  Clock3,
  Gift,
  Trophy,
  Users,
} from "lucide-react";

import Countdown from "../Countdown/Countdown";
import styles from "./GiveawayStats.module.css";

function GiveawayStats() {
  // Temporary frontend date.
  // Backend integration ke baad API se aayegi.
  const giveawayEndDate =
    "2026-09-05T23:59:59+05:30";

  return (
    <section
      className={styles.section}
      aria-label="Giveaway statistics"
    >
      <div className="container">
        <div className={styles.stats}>
          <div className={styles.item}>
            <div
              className={`${styles.icon} ${styles.purple}`}
            >
              <Gift size={21} />
            </div>

            <div>
              <span className={styles.label}>
                Total Giveaways
              </span>

              <div className={styles.valueRow}>
                <strong>24</strong>
                <small>Active</small>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div
              className={`${styles.icon} ${styles.blue}`}
            >
              <Users size={21} />
            </div>

            <div>
              <span className={styles.label}>
                Participants
              </span>

              <div className={styles.valueRow}>
                <strong>8.5K+</strong>
                <small>Users</small>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.item}>
            <div
              className={`${styles.icon} ${styles.green}`}
            >
              <Trophy size={21} />
            </div>

            <div>
              <span className={styles.label}>
                Prizes Won
              </span>

              <div className={styles.valueRow}>
                <strong>1.2K+</strong>
                <small>Rewards</small>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div
            className={`${styles.item} ${styles.countdownItem}`}
          >
            <div
              className={`${styles.icon} ${styles.gold}`}
            >
              <Clock3 size={21} />
            </div>

            <div>
              <span className={styles.label}>
                Giveaway Ends In
              </span>

              <Countdown
                endDate={giveawayEndDate}
              />
            </div>
          </div>
        </div>

        <p className={styles.demoNotice}>
          Demonstration statistics for frontend
          development.
        </p>
      </div>
    </section>
  );
}

export default GiveawayStats;
import {
  Clock3,
  Gift,
  Trophy,
  Users,
} from "lucide-react";

import Countdown from "../Countdown/Countdown";

import styles from "./GiveawayStats.module.css";

function GiveawayStats({
  giveaway,
}) {
  const prizeCount =
    giveaway?.prizes?.length ??
    0;

  const participants =
    giveaway?.participantsCount ??
    0;

  const totalWinnerSlots =
    giveaway?.prizes?.reduce(
      (total, prize) =>
        total +
        (prize.winnerCount || 0),
      0
    ) ?? 0;

  const isActive =
    giveaway?.status ===
    "ACTIVE";

  return (
    <section
      className={styles.section}
      aria-label="Giveaway statistics"
    >
      <div className="container">
        <div
          className={
            styles.stats
          }
        >
          <div
            className={
              styles.item
            }
          >
            <div
              className={`${styles.icon} ${styles.purple}`}
            >
              <Gift size={21} />
            </div>

            <div>
              <span
                className={
                  styles.label
                }
              >
                Available Prizes
              </span>

              <div
                className={
                  styles.valueRow
                }
              >
                <strong>
                  {prizeCount}
                </strong>

                <small>
                  Rewards
                </small>
              </div>
            </div>
          </div>

          <div
            className={
              styles.divider
            }
          />

          <div
            className={
              styles.item
            }
          >
            <div
              className={`${styles.icon} ${styles.blue}`}
            >
              <Users size={21} />
            </div>

            <div>
              <span
                className={
                  styles.label
                }
              >
                Participants
              </span>

              <div
                className={
                  styles.valueRow
                }
              >
                <strong>
                  {participants.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <small>
                  Entries
                </small>
              </div>
            </div>
          </div>

          <div
            className={
              styles.divider
            }
          />

          <div
            className={
              styles.item
            }
          >
            <div
              className={`${styles.icon} ${styles.green}`}
            >
              <Trophy
                size={21}
              />
            </div>

            <div>
              <span
                className={
                  styles.label
                }
              >
                Winner Slots
              </span>

              <div
                className={
                  styles.valueRow
                }
              >
                <strong>
                  {
                    totalWinnerSlots
                  }
                </strong>

                <small>
                  Configured
                </small>
              </div>
            </div>
          </div>

          <div
            className={
              styles.divider
            }
          />

          <div
            className={`${styles.item} ${styles.countdownItem}`}
          >
            <div
              className={`${styles.icon} ${styles.gold}`}
            >
              <Clock3
                size={21}
              />
            </div>

            <div>
              <span
                className={
                  styles.label
                }
              >
                {isActive
                  ? "Giveaway Ends In"
                  : "Giveaway Status"}
              </span>

              {isActive ? (
                <Countdown
                  endDate={
                    giveaway.endAt
                  }
                />
              ) : (
                <div
                  className={
                    styles.valueRow
                  }
                >
                  <strong>
                    {
                      giveaway.status
                    }
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiveawayStats;
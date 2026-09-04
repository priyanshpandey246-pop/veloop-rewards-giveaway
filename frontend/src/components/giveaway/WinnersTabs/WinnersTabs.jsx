import {
  CalendarDays,
  Clock3,
  Gift,
  History,
  Trophy,
} from "lucide-react";

import { useState } from "react";

import styles from "./WinnersTabs.module.css";

const previousWinners = [
  {
    id: "PW-001",
    user: "VE****82",
    prize: "iPhone 15 Pro",
    giveaway: "August Reward Rush",
    category: "1st Prize",
    date: "05 Aug 2026",
  },
  {
    id: "PW-002",
    user: "VE****91",
    prize: "Apple Watch",
    giveaway: "August Reward Rush",
    category: "2nd Prize",
    date: "05 Aug 2026",
  },
  {
    id: "PW-003",
    user: "VE****27",
    prize: "AirPods Pro",
    giveaway: "Summer Rewards",
    category: "3rd Prize",
    date: "22 Jul 2026",
  },
  {
    id: "PW-004",
    user: "VE****54",
    prize: "₹2,000 Amazon Voucher",
    giveaway: "Summer Rewards",
    category: "Reward Draw",
    date: "22 Jul 2026",
  },
];

function WinnersTabs() {
  const [activeTab, setActiveTab] =
    useState("current");

  // Temporary frontend state.
  // Backend will provide authoritative status later.
  const currentGiveawayStatus = "ACTIVE";

  return (
    <section
      id="winners"
      className={styles.section}
    >
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              REWARD HISTORY
            </span>

            <h2>
              Winners & Announcements
            </h2>

            <p>
              Follow the current giveaway status and
              explore winners from completed reward
              events.
            </p>
          </div>

          <div className={styles.privacy}>
            Winner IDs are masked to protect user
            privacy.
          </div>
        </div>

        <div className={styles.panel}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Giveaway winners"
          >
            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === "current"
              }
              className={
                activeTab === "current"
                  ? styles.activeTab
                  : ""
              }
              onClick={() =>
                setActiveTab("current")
              }
            >
              <Trophy size={16} />
              Winners
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === "previous"
              }
              className={
                activeTab === "previous"
                  ? styles.activeTab
                  : ""
              }
              onClick={() =>
                setActiveTab("previous")
              }
            >
              <History size={16} />
              Previous Winners
            </button>
          </div>

          {activeTab === "current" && (
            <div
              className={styles.tabContent}
              role="tabpanel"
            >
              {currentGiveawayStatus ===
              "ACTIVE" ? (
                <div
                  className={
                    styles.liveState
                  }
                >
                  <div
                    className={
                      styles.liveIcon
                    }
                  >
                    <Clock3 size={25} />
                  </div>

                  <div>
                    <div
                      className={
                        styles.statusBadge
                      }
                    >
                      <span />
                      GIVEAWAY LIVE
                    </div>

                    <h3>
                      Winners haven't been
                      finalized yet
                    </h3>

                    <p>
                      The current giveaway is
                      still open. Winners will
                      be announced only after
                      the giveaway ends and the
                      results are finalized.
                    </p>

                    <div
                      className={
                        styles.announcement
                      }
                    >
                      <Gift size={17} />

                      Winner announcement
                      coming after the
                      giveaway ends.
                    </div>
                  </div>
                </div>
              ) : (
                <p>
                  Finalized winners will
                  appear here.
                </p>
              )}
            </div>
          )}

          {activeTab === "previous" && (
            <div
              className={styles.tabContent}
              role="tabpanel"
            >
              <div
                className={
                  styles.previousHeader
                }
              >
                <div>
                  <h3>
                    Previous Winners
                  </h3>

                  <p>
                    Winners from completed
                    giveaway events.
                  </p>
                </div>

                <span>
                  Demo history
                </span>
              </div>

              <div
                className={
                  styles.winnerGrid
                }
              >
                {previousWinners.map(
                  (winner) => (
                    <article
                      className={
                        styles.winnerCard
                      }
                      key={winner.id}
                    >
                      <div
                        className={
                          styles.winnerTop
                        }
                      >
                        <div
                          className={
                            styles.avatar
                          }
                        >
                          <Trophy
                            size={17}
                          />
                        </div>

                        <div>
                          <span>
                            WINNER
                          </span>

                          <strong>
                            {
                              winner.user
                            }
                          </strong>
                        </div>

                        <span
                          className={
                            styles.verified
                          }
                        >
                          Finalized
                        </span>
                      </div>

                      <div
                        className={
                          styles.prize
                        }
                      >
                        <small>
                          WON
                        </small>

                        <strong>
                          {
                            winner.prize
                          }
                        </strong>
                      </div>

                      <div
                        className={
                          styles.details
                        }
                      >
                        <div>
                          <Gift
                            size={13}
                          />

                          <span>
                            {
                              winner.giveaway
                            }
                          </span>
                        </div>

                        <div>
                          <CalendarDays
                            size={13}
                          />

                          <span>
                            {
                              winner.date
                            }
                          </span>
                        </div>
                      </div>

                      <span
                        className={
                          styles.category
                        }
                      >
                        {
                          winner.category
                        }
                      </span>
                    </article>
                  )
                )}
              </div>

              <p className={styles.demoNote}>
                Demonstration winner records
                used during frontend
                development.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WinnersTabs;
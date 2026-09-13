import {
  CalendarDays,
  Clock3,
  Gift,
  History,
  Trophy,
} from "lucide-react";

import { useState } from "react";

import styles from "./WinnersTabs.module.css";

function formatDate(date) {
  if (!date) {
    return "—";
  }

  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function WinnersTabs({
  status,
  currentWinners = [],
  previousWinners = [],
  loading = false,
  error = "",
}) {
  const [activeTab, setActiveTab] =
    useState("current");

  const isLive =
    status === "ACTIVE";

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
              Follow the current giveaway
              status and explore winners
              from completed reward events.
            </p>
          </div>

          <div className={styles.privacy}>
            Winner IDs are masked to
            protect user privacy.
          </div>
        </div>

        <div className={styles.panel}>
          <div
            className={styles.tabs}
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab ===
                "current"
              }
              className={
                activeTab ===
                "current"
                  ? styles.activeTab
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "current"
                )
              }
            >
              <Trophy size={16} />
              Winners
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab ===
                "previous"
              }
              className={
                activeTab ===
                "previous"
                  ? styles.activeTab
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  "previous"
                )
              }
            >
              <History size={16} />
              Previous Winners
            </button>
          </div>

          {loading && (
            <div
              className={
                styles.tabContent
              }
            >
              <p>
                Loading winner
                information...
              </p>
            </div>
          )}

          {!loading && error && (
            <div
              className={
                styles.tabContent
              }
            >
              <p>{error}</p>
            </div>
          )}

          {!loading &&
            !error &&
            activeTab ===
              "current" && (
              <div
                className={
                  styles.tabContent
                }
                role="tabpanel"
              >
                {isLive ? (
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
                      <Clock3
                        size={25}
                      />
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
                        Winners haven't
                        been finalized yet
                      </h3>

                      <p>
                        Winners will be
                        announced after
                        the giveaway ends
                        and results are
                        finalized.
                      </p>

                      <div
                        className={
                          styles.announcement
                        }
                      >
                        <Gift
                          size={17}
                        />

                        Winner
                        announcement
                        coming after the
                        giveaway ends.
                      </div>
                    </div>
                  </div>
                ) : currentWinners
                    .length > 0 ? (
                  <div
                    className={
                      styles.winnerGrid
                    }
                  >
                    {currentWinners.map(
                      (winner) => (
                        <article
                          className={
                            styles.winnerCard
                          }
                          key={
                            winner.id
                          }
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
                                size={
                                  17
                                }
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
                          </div>

                          <div
                            className={
                              styles.prize
                            }
                          >
                            <small>
                              PRIZE
                            </small>

                            <strong>
                              {
                                winner.prizeId
                              }
                            </strong>
                          </div>

                          <div
                            className={
                              styles.details
                            }
                          >
                            <div>
                              <CalendarDays
                                size={
                                  13
                                }
                              />

                              <span>
                                {formatDate(
                                  winner.selectedAt
                                )}
                              </span>
                            </div>
                          </div>
                        </article>
                      )
                    )}
                  </div>
                ) : (
                  <div
                    className={
                      styles.liveState
                    }
                  >
                    <div>
                      <h3>
                        No finalized
                        winners yet
                      </h3>

                      <p>
                        Winner
                        information will
                        appear here when
                        available.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          {!loading &&
            !error &&
            activeTab ===
              "previous" && (
              <div
                className={
                  styles.tabContent
                }
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
                      Winners from
                      completed giveaway
                      events.
                    </p>
                  </div>
                </div>

                {previousWinners.length ===
                0 ? (
                  <div
                    className={
                      styles.liveState
                    }
                  >
                    <div>
                      <h3>
                        No previous
                        winners
                      </h3>

                      <p>
                        Previous winners
                        will appear after
                        a giveaway is
                        completed.
                      </p>
                    </div>
                  </div>
                ) : (
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
                          key={
                            winner.id
                          }
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
                                size={
                                  17
                                }
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
                              {
                                winner.status
                              }
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
                                size={
                                  13
                                }
                              />

                              <span>
                                {
                                  winner.giveaway
                                }
                              </span>
                            </div>

                            <div>
                              <CalendarDays
                                size={
                                  13
                                }
                              />

                              <span>
                                {formatDate(
                                  winner.date
                                )}
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
                )}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

export default WinnersTabs;



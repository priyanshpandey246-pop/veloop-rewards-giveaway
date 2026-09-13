import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Trophy,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import Countdown from "../Countdown/Countdown";

import {
  getStatusLabel,
} from "../../../utils/giveawayStatus";

import styles from "./GiveawayDetailHero.module.css";

function GiveawayDetailHero({
  giveaway,
}) {
  const isActive =
    giveaway.status === "ACTIVE";

  const isUpcoming =
    giveaway.status === "UPCOMING";

  const isEnded =
    giveaway.status === "ENDED";

  const isArchived =
    giveaway.status === "ARCHIVED";

  return (
    <section className={styles.section}>
      <div className="container">
        <Link
          to="/giveaways"
          className={styles.back}
        >
          <ArrowLeft size={16} />
          Giveaway Home
        </Link>

        <div className={styles.hero}>
          {/* Prize visual */}
          <div className={styles.visual}>
            <div
              className={styles.glow}
              aria-hidden="true"
            />

            <img
              src={giveaway.image}
              alt={giveaway.name}
            />
          </div>

          {/* Giveaway information */}
          <div className={styles.content}>
            <div className={styles.topBadges}>
              <span className={styles.exclusive}>
                EXCLUSIVE GIVEAWAY
              </span>

              <span
                className={`${styles.status} ${
                  styles[
                    giveaway.status.toLowerCase()
                  ] || ""
                }`}
              >
                <i />

                {getStatusLabel(
                  giveaway.status
                ).toUpperCase()}
              </span>
            </div>

            <h1>
              {giveaway.title}
            </h1>

            <p className={styles.description}>
              {giveaway.description}
            </p>

            {/* ACTIVE STATE */}
            {isActive && (
              <div className={styles.countdown}>
                <div
                  className={
                    styles.countdownLabel
                  }
                >
                  <Clock3 size={16} />

                  <span>
                    Ends in
                  </span>
                </div>

                <Countdown
                  endDate={giveaway.endAt}
                />
              </div>
            )}

            {/* UPCOMING STATE */}
            {isUpcoming && (
              <div className={styles.countdown}>
                <div
                  className={
                    styles.countdownLabel
                  }
                >
                  <Clock3 size={16} />

                  <span>
                    Starts in
                  </span>
                </div>

                <Countdown
                  endDate={giveaway.startAt}
                />
              </div>
            )}

            {/* ENDED STATE */}
            {isEnded && (
              <div className={styles.endedNotice}>
                This giveaway has ended.
                Finalized winner information
                is now available where
                applicable.
              </div>
            )}

            {/* ARCHIVED STATE */}
            {isArchived && (
              <div className={styles.endedNotice}>
                This giveaway is part of the
                VELOOP Rewards giveaway
                history. New participation is
                no longer available.
              </div>
            )}

            <div className={styles.meta}>
              <div>
                <Users size={17} />

                <span>
                  <strong>
                    {giveaway.participants.toLocaleString()}+
                  </strong>

                  Participants
                </span>
              </div>

              <div>
                <Trophy size={17} />

                <span>
                  <strong>
                    {giveaway.winnerCount}
                  </strong>

                  {giveaway.winnerCount === 1
                    ? " Winner"
                    : " Winners"}
                </span>
              </div>

              <div>
                <CheckCircle2 size={17} />

                <span>
                  <strong>
                    {giveaway.prizeType}
                  </strong>

                  Prize type
                </span>
              </div>
            </div>

            <div className={styles.entryFee}>
              <div>
                <span>
                  Entry Fee
                </span>

                <strong>
                  {giveaway.entryFee.toLocaleString()}{" "}
                  {giveaway.currency}
                </strong>
              </div>

              <small>
                Entry cost is shown before
                participation.
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiveawayDetailHero;



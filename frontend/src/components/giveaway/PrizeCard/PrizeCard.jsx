import {
  ArrowUpRight,
  Clock3,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import useCountdown from "../../../hooks/useCountdown";

import styles from "./PrizeCard.module.css";

function formatParticipants(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K+`;
  }

  return value;
}

function PrizeCard({ giveaway, index }) {
  const {
    days,
    hours,
    ended,
  } = useCountdown(giveaway.endAt);

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <div className={styles.position}>
          <Trophy size={13} />
          {giveaway.position}
        </div>

        <span className={styles.status}>
          <i />
          Live
        </span>

        <img
          src={giveaway.image}
          alt={giveaway.name}
          className={styles.image}
          loading={index > 2 ? "lazy" : "eager"}
        />
      </div>

      <div className={styles.content}>
        <div>
          <h3>{giveaway.name}</h3>

          <p>
            {giveaway.description}
          </p>
        </div>

        <div className={styles.meta}>
          <div>
            <Users size={15} />

            <span>
              <strong>
                {formatParticipants(
                  giveaway.participants
                )}
              </strong>
              Participants
            </span>
          </div>

          <div>
            <Clock3 size={15} />

            <span>
              <strong>
                {ended
                  ? "Ended"
                  : `${days}d ${hours}h`}
              </strong>
              Remaining
            </span>
          </div>
        </div>

        <div className={styles.entry}>
          <div>
            <Ticket size={16} />

            <span>
              Entry requirement
            </span>
          </div>

          <strong>
            {giveaway.entryFee.toLocaleString()}{" "}
            {giveaway.currency}
          </strong>
        </div>

        <Link
          to={`/giveaway/${giveaway.slug}`}
          className={styles.button}
          aria-label={`View ${giveaway.name} giveaway details`}
        >
          View Giveaway

          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default PrizeCard;
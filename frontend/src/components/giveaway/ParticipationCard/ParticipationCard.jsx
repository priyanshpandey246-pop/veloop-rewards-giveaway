import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Coins,
  LockKeyhole,
  WalletCards,
} from "lucide-react";

import styles from "./ParticipationCard.module.css";

function ParticipationCard({
  giveaway,
  balance,
  hasJoined,
  onJoin,
}) {
  const entryFee = giveaway.entryFee;

  const hasEnoughBalance =
    balance >= entryFee;

  const shortfall = Math.max(
    entryFee - balance,
    0
  );

  const isEnded =
    giveaway.status === "ENDED";

  const isUpcoming =
    giveaway.status === "UPCOMING";

  const isArchived =
    giveaway.status === "ARCHIVED";

  const isActive =
    giveaway.status === "ACTIVE";

  return (
    <aside className={styles.card}>
      <div className={styles.heading}>
        <div className={styles.headingIcon}>
          <WalletCards size={20} />
        </div>

        <div>
          <span>
            YOUR PARTICIPATION
          </span>

          <h2>
            {isEnded || isArchived
              ? "Giveaway closed"
              : isUpcoming
                ? "Coming soon"
                : "Ready to enter?"}
          </h2>
        </div>
      </div>

      <div className={styles.balanceGrid}>
        <div>
          <span>
            Your Balance
          </span>

          <strong>
            {balance.toLocaleString()}{" "}
            {giveaway.currency}
          </strong>
        </div>

        <div>
          <span>
            Entry Fee
          </span>

          <strong>
            {entryFee.toLocaleString()}{" "}
            {giveaway.currency}
          </strong>
        </div>
      </div>

      {isEnded || isArchived ? (
        <div className={styles.insufficient}>
          <Clock3 size={17} />

          <div>
            <strong>
              Giveaway Ended
            </strong>

            <p>
              New participation is no longer
              available for this giveaway.
            </p>
          </div>
        </div>
      ) : isUpcoming ? (
        <div className={styles.joinedState}>
          <Clock3 size={17} />

          <div>
            <strong>
              Giveaway Coming Soon
            </strong>

            <p>
              Participation will become
              available when this giveaway
              starts.
            </p>
          </div>
        </div>
      ) : hasJoined ? (
        <div className={styles.joinedState}>
          <CheckCircle2 size={19} />

          <div>
            <strong>
              You're Already Participating
            </strong>

            <p>
              Your entry for this giveaway
              has already been recorded.
            </p>
          </div>
        </div>
      ) : hasEnoughBalance ? (
        <div className={styles.successState}>
          <CheckCircle2 size={17} />

          <div>
            <strong>
              You have enough{" "}
              {giveaway.currency}
            </strong>

            <p>
              Balance after joining:{" "}
              {(
                balance - entryFee
              ).toLocaleString()}{" "}
              {giveaway.currency}.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.insufficient}>
          <Coins size={17} />

          <div>
            <strong>
              Insufficient{" "}
              {giveaway.currency}
            </strong>

            <p>
              You need{" "}
              {shortfall.toLocaleString()} more{" "}
              {giveaway.currency} to
              participate.
            </p>
          </div>
        </div>
      )}

      {isEnded || isArchived ? (
        <button
          type="button"
          className={styles.disabledButton}
          disabled
        >
          <Clock3 size={17} />
          Giveaway Ended
        </button>
      ) : isUpcoming ? (
        <button
          type="button"
          className={styles.earnButton}
        >
          Notify Me
          <ArrowRight size={17} />
        </button>
      ) : hasJoined ? (
        <button
          type="button"
          className={styles.disabledButton}
          disabled
        >
          <CheckCircle2 size={17} />
          Entry Recorded
        </button>
      ) : isActive &&
        hasEnoughBalance ? (
        <button
          type="button"
          className={styles.joinButton}
          onClick={onJoin}
        >
          Join for{" "}
          {entryFee.toLocaleString()}{" "}
          {giveaway.currency}

          <ArrowRight size={17} />
        </button>
      ) : (
        <button
          type="button"
          className={styles.earnButton}
        >
          Earn More{" "}
          {giveaway.currency}

          <ArrowRight size={17} />
        </button>
      )}

      <div className={styles.security}>
        <LockKeyhole size={13} />

        <span>
          Your final balance, eligibility and
          giveaway status will be verified
          before participation.
        </span>
      </div>
    </aside>
  );
}

export default ParticipationCard;
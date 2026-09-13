import {
  CheckCircle2,
  Clock3,
  Gift,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";

import styles from "./WinnerClaim.module.css";

function WinnerClaim({
  giveaway,
  winner,
  onClaim,
}) {
  if (!winner) {
    return null;
  }

  const status =
    winner.claimStatus;

  const statusText = {
    NOT_SUBMITTED: "Claim Available",
    SUBMITTED: "Claim Submitted",
    PROCESSING: "Verification in Progress",
    COMPLETED: "Prize Delivered",
    EXPIRED: "Claim Window Expired",
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.decoration}>
            <PartyPopper size={22} />
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              WINNER REWARD
            </span>

            <h2>
              Congratulations!
            </h2>

            <p>
              Your account has been selected
              for the{" "}
              <strong>
                {giveaway.name}
              </strong>{" "}
              giveaway.
            </p>

            <div className={styles.details}>
              <div>
                <Gift size={16} />

                <span>
                  <small>Prize</small>

                  <strong>
                    {winner.prizeName}
                  </strong>
                </span>
              </div>

              <div>
                <ShieldCheck size={16} />

                <span>
                  <small>Status</small>

                  <strong>
                    Winner Verified
                  </strong>
                </span>
              </div>

              <div>
                <Clock3 size={16} />

                <span>
                  <small>
                    Claim deadline
                  </small>

                  <strong>
                    {new Date(
                      winner.claimDeadline
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.action}>
            <span
              className={`${styles.status} ${
                styles[
                  status.toLowerCase()
                ] || ""
              }`}
            >
              {statusText[status]}
            </span>

            {status ===
              "NOT_SUBMITTED" && (
              <button
                type="button"
                onClick={onClaim}
              >
                Claim Your Prize
              </button>
            )}

            {status === "SUBMITTED" && (
              <div
                className={
                  styles.completedMessage
                }
              >
                <CheckCircle2
                  size={16}
                />

                Our team will process your
                prize.
              </div>
            )}

            {status === "PROCESSING" && (
              <div
                className={
                  styles.completedMessage
                }
              >
                Prize verification is in
                progress.
              </div>
            )}

            {status === "COMPLETED" && (
              <div
                className={
                  styles.completedMessage
                }
              >
                <CheckCircle2
                  size={16}
                />

                Prize Delivered
              </div>
            )}

            {status === "EXPIRED" && (
              <div
                className={
                  styles.expiredMessage
                }
              >
                Claim window has expired.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WinnerClaim;



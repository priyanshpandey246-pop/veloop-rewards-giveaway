import {
  CheckCircle2,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import styles from "./JoinConfirmationModal.module.css";

function JoinConfirmationModal({
  giveaway,
  balance,
  isOpen,
  onClose,
  onConfirm,
}) {
  const [accepted, setAccepted] =
    useState(false);

  const [joining, setJoining] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (
        event.key === "Escape" &&
        !joining
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "";
    };
  }, [isOpen, joining, onClose]);

  if (!isOpen) {
    return null;
  }

  const balanceAfterJoining =
    balance - giveaway.entryFee;

  const closeModal = () => {
    if (joining) {
      return;
    }

    setAccepted(false);
    onClose();
  };

  const handleConfirm = async () => {
    if (!accepted || joining) {
      return;
    }

    setJoining(true);

    // Temporary API simulation.
    // Real backend request will replace this.
    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });

    onConfirm();

    setAccepted(false);
    setJoining(false);
  };

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          closeModal();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={closeModal}
          disabled={joining}
          aria-label="Close confirmation"
        >
          <X size={17} />
        </button>

        <div className={styles.icon}>
          <CheckCircle2 size={23} />
        </div>

        <span className={styles.eyebrow}>
          REVIEW YOUR ENTRY
        </span>

        <h2 id="join-modal-title">
          Confirm Participation
        </h2>

        <p className={styles.description}>
          Review the details before entering
          the {giveaway.name} giveaway.
        </p>

        <div className={styles.summary}>
          <div>
            <span>Prize</span>

            <strong>
              {giveaway.name}
            </strong>
          </div>

          <div>
            <span>Entry Fee</span>

            <strong>
              {giveaway.entryFee.toLocaleString()}{" "}
              {giveaway.currency}
            </strong>
          </div>

          <div>
            <span>Your Balance</span>

            <strong>
              {balance.toLocaleString()}{" "}
              {giveaway.currency}
            </strong>
          </div>

          <div className={styles.after}>
            <span>
              Balance After Joining
            </span>

            <strong>
              {balanceAfterJoining.toLocaleString()}{" "}
              {giveaway.currency}
            </strong>
          </div>
        </div>

        <label className={styles.terms}>
          <input
            type="checkbox"
            checked={accepted}
            disabled={joining}
            onChange={(event) => {
              setAccepted(
                event.target.checked
              );
            }}
          />

          <span>
            I confirm that I have reviewed
            the giveaway rules, entry fee
            and participation terms.
          </span>
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={closeModal}
            disabled={joining}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.confirm}
            onClick={handleConfirm}
            disabled={
              !accepted || joining
            }
          >
            {joining
              ? "Joining Giveaway..."
              : "Confirm & Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinConfirmationModal;
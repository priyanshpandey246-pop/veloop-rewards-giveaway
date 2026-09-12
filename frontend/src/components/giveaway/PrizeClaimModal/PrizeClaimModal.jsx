import {
  Gift,
  Mail,
  MapPin,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  submitPrizeClaim,
} from "../../../services/giveawayApi.js";

import {
  getApiError,
} from "../../../utils/getApiError.js";

import styles from "./PrizeClaimModal.module.css";

const initialPhysicalForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

function PrizeClaimModal({
  giveaway,
  winner,
  isOpen,
  onClose,
  onSubmitted,
}) {
  const [
    physicalForm,
    setPhysicalForm,
  ] = useState(
    initialPhysicalForm
  );

  const [email, setEmail] =
    useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const isPhysical =
    winner?.claimType ===
      "SHIPPING" ||
    giveaway?.prizeType ===
      "PHYSICAL";

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeWithEscape = (
      event
    ) => {
      if (
        event.key === "Escape" &&
        !submitting
      ) {
        onClose();
      }
    };

    document.body.style.overflow =
      "hidden";

    document.addEventListener(
      "keydown",
      closeWithEscape
    );

    return () => {
      document.body.style.overflow =
        "";

      document.removeEventListener(
        "keydown",
        closeWithEscape
      );
    };
  }, [
    isOpen,
    onClose,
    submitting,
  ]);

  if (!isOpen || !winner) {
    return null;
  }

  const updatePhysical = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPhysicalForm(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  const validate = () => {
    if (isPhysical) {
      const required =
        Object.values(
          physicalForm
        );

      if (
        required.some(
          (value) =>
            !value.trim()
        )
      ) {
        return "Please complete all required fields.";
      }

      if (
        !/^\d{6}$/.test(
          physicalForm.pinCode
        )
      ) {
        return "Please enter a valid 6-digit PIN code.";
      }

      if (
        physicalForm.phone
          .replace(/\D/g, "")
          .length < 10
      ) {
        return "Please enter a valid phone number.";
      }

      return "";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validate();

    if (validationError) {
      setError(
        validationError
      );

      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const claimData =
        isPhysical
          ? physicalForm
          : {
              email:
                email.trim(),
            };

      const response =
        await submitPrizeClaim(
          winner.giveawayId,
          claimData
        );

      onSubmitted(
        response.data
      );

      setPhysicalForm(
        initialPhysicalForm
      );

      setEmail("");
    } catch (requestError) {
      console.error(
        "Claim submission failed:",
        requestError
      );

      setError(
        getApiError(
          requestError,
          "Your prize claim could not be submitted."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !submitting
        ) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          disabled={submitting}
          aria-label="Close claim form"
        >
          <X size={17} />
        </button>

        <div
          className={
            styles.header
          }
        >
          <div
            className={
              styles.headerIcon
            }
          >
            {isPhysical ? (
              <Gift size={21} />
            ) : (
              <Mail size={21} />
            )}
          </div>

          <span>
            PRIZE CLAIM
          </span>

          <h2 id="claim-title">
            {isPhysical
              ? "Claim Your Prize"
              : "Claim Your Gift Card"}
          </h2>

          <p>
            You won{" "}
            <strong>
              {winner.prizeName}
            </strong>
            .
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >
          {isPhysical ? (
            <div
              className={
                styles.fields
              }
            >
              <label
                className={
                  styles.full
                }
              >
                Full Name

                <input
                  type="text"
                  name="fullName"
                  value={
                    physicalForm.fullName
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="Enter full name"
                  autoComplete="name"
                />
              </label>

              <label>
                Phone Number

                <input
                  type="tel"
                  name="phone"
                  value={
                    physicalForm.phone
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </label>

              <label>
                PIN Code

                <input
                  type="text"
                  name="pinCode"
                  inputMode="numeric"
                  maxLength={6}
                  value={
                    physicalForm.pinCode
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="6-digit PIN"
                  autoComplete="postal-code"
                />
              </label>

              <label
                className={
                  styles.full
                }
              >
                Complete Address

                <textarea
                  name="address"
                  rows={3}
                  value={
                    physicalForm.address
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="Enter delivery address"
                  autoComplete="street-address"
                />
              </label>

              <label>
                City

                <input
                  type="text"
                  name="city"
                  value={
                    physicalForm.city
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="City"
                  autoComplete="address-level2"
                />
              </label>

              <label>
                State

                <input
                  type="text"
                  name="state"
                  value={
                    physicalForm.state
                  }
                  onChange={
                    updatePhysical
                  }
                  placeholder="State"
                  autoComplete="address-level1"
                />
              </label>
            </div>
          ) : (
            <label
              className={
                styles.emailField
              }
            >
              Email Address

              <input
                type="email"
                value={email}
                onChange={(
                  event
                ) =>
                  setEmail(
                    event.target
                      .value
                  )
                }
                placeholder="Enter email for your gift card"
                autoComplete="email"
              />

              <small>
                Your gift card will
                be sent to this
                email address.
              </small>
            </label>
          )}

          {error && (
            <div
              className={
                styles.error
              }
              role="alert"
            >
              {error}
            </div>
          )}

          <div
            className={
              styles.note
            }
          >
            <MapPin size={14} />

            <span>
              {isPhysical
                ? "Only provide information required for prize fulfillment."
                : "A physical delivery address is not required for this prize."}
            </span>
          </div>

          <div
            className={
              styles.actions
            }
          >
            <button
              type="button"
              className={
                styles.cancel
              }
              onClick={
                onClose
              }
              disabled={
                submitting
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className={
                styles.submit
              }
              disabled={
                submitting
              }
            >
              {submitting
                ? "Submitting Claim..."
                : "Submit Claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrizeClaimModal;
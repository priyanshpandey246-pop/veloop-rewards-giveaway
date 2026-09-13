import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Gift,
  ShieldCheck,
  TicketCheck,
  Trophy,
  UserCheck,
  WalletCards,
} from "lucide-react";

import { useState } from "react";

import styles from "./IndividualGiveawayInfo.module.css";

const steps = [
  {
    icon: Gift,
    title: "Review Giveaway",
    text: "Review the prize and giveaway information.",
  },
  {
    icon: UserCheck,
    title: "Check Eligibility",
    text: "Confirm that you meet the participation requirements.",
  },
  {
    icon: WalletCards,
    title: "Review Entry Fee",
    text: "Check the required virtual currency and available balance.",
  },
  {
    icon: TicketCheck,
    title: "Confirm Participation",
    text: "Review the terms and confirm your entry.",
  },
  {
    icon: Clock3,
    title: "Wait for Giveaway End",
    text: "Your participation stays recorded until the giveaway ends.",
  },
  {
    icon: Trophy,
    title: "Winner Announcement",
    text: "Finalized winners are shown after the event has ended.",
  },
  {
    icon: CheckCircle2,
    title: "Claim the Prize",
    text: "Eligible winners can submit the required claim details.",
  },
];

function IndividualGiveawayInfo({
  giveaway,
}) {
  const [termsOpen, setTermsOpen] =
    useState(true);

  const [importantOpen, setImportantOpen] =
    useState(false);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.howItWorks}>
          <div className={styles.sectionHeader}>
            <span>
              PARTICIPATION JOURNEY
            </span>

            <h2>
              How This Giveaway Works
            </h2>

            <p>
              Follow the process from reviewing
              the reward to the final prize claim.
            </p>
          </div>

          <div className={styles.steps}>
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  className={styles.step}
                  key={step.title}
                >
                  <div className={styles.stepTop}>
                    <div className={styles.stepIcon}>
                      <Icon size={18} />
                    </div>

                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.about}>
            <div className={styles.titleRow}>
              <div className={styles.titleIcon}>
                <Gift size={19} />
              </div>

              <div>
                <span>
                  PRIZE DETAILS
                </span>

                <h2>
                  About the Prize
                </h2>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <div className={styles.product}>
                <img
                  src={giveaway.image}
                  alt={giveaway.name}
                  loading="lazy"
                />
              </div>

              <div className={styles.productInfo}>
                <h3>
                  {giveaway.name}
                </h3>

                <p>
                  {giveaway.description}
                </p>

                <div className={styles.facts}>
                  <div>
                    <span>
                      Number of winners
                    </span>

                    <strong>
                      {giveaway.winnerCount}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Prize type
                    </span>

                    <strong>
                      {giveaway.prizeType}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Claim method
                    </span>

                    <strong>
                      {giveaway.claimType}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.accordions}>
            <article className={styles.accordion}>
              <button
                type="button"
                onClick={() =>
                  setImportantOpen(
                    !importantOpen
                  )
                }
                aria-expanded={
                  importantOpen
                }
              >
                <span>
                  <ShieldCheck size={17} />

                  Important Information
                </span>

                <ChevronDown
                  size={17}
                  className={
                    importantOpen
                      ? styles.rotated
                      : ""
                  }
                />
              </button>

              {importantOpen && (
                <div
                  className={
                    styles.accordionContent
                  }
                >
                  <ul>
                    <li>
                      Entry currency:{" "}
                      <strong>
                        {giveaway.currency}
                      </strong>
                    </li>

                    <li>
                      Entry amount:{" "}
                      <strong>
                        {giveaway.entryFee.toLocaleString()}{" "}
                        {giveaway.currency}
                      </strong>
                    </li>

                    <li>
                      Configured winners:{" "}
                      <strong>
                        {giveaway.winnerCount}
                      </strong>
                    </li>

                    <li>
                      Participation is
                      available only while the
                      giveaway is active.
                    </li>

                    <li>
                      Account eligibility and
                      final balance are subject
                      to verification.
                    </li>
                  </ul>
                </div>
              )}
            </article>

            <article className={styles.accordion}>
              <button
                type="button"
                onClick={() =>
                  setTermsOpen(!termsOpen)
                }
                aria-expanded={termsOpen}
              >
                <span>
                  <FileText size={17} />

                  Terms & Conditions
                </span>

                <ChevronDown
                  size={17}
                  className={
                    termsOpen
                      ? styles.rotated
                      : ""
                  }
                />
              </button>

              {termsOpen && (
                <div
                  className={
                    styles.accordionContent
                  }
                >
                  <div
                    className={
                      styles.termBlock
                    }
                  >
                    <h4>Eligibility</h4>

                    <p>
                      Participation is
                      available to accounts
                      that satisfy the
                      eligibility requirements
                      configured for this
                      giveaway.
                    </p>
                  </div>

                  <div
                    className={
                      styles.termBlock
                    }
                  >
                    <h4>
                      Entry Requirement
                    </h4>

                    <p>
                      This giveaway requires{" "}
                      <strong>
                        {giveaway.entryFee.toLocaleString()}{" "}
                        {giveaway.currency}
                      </strong>{" "}
                      per eligible
                      participation.
                    </p>
                  </div>

                  <div
                    className={
                      styles.termBlock
                    }
                  >
                    <h4>
                      Winner Selection
                    </h4>

                    <p>
                      Winners are finalized
                      only after the giveaway
                      has ended according to
                      the configured giveaway
                      process.
                    </p>
                  </div>

                  <div
                    className={
                      styles.termBlock
                    }
                  >
                    <h4>Prize Claim</h4>

                    <p>
                      Winners must submit the
                      information required for
                      their prize type within
                      the applicable claim
                      period.
                    </p>
                  </div>

                  <div
                    className={
                      styles.termBlock
                    }
                  >
                    <h4>
                      Fraud & Disqualification
                    </h4>

                    <p>
                      Suspicious, fraudulent,
                      abusive or rule-breaking
                      activity may be reviewed
                      and handled according to
                      confirmed platform
                      policies.
                    </p>
                  </div>

                  <div
                    className={
                      styles.policyNotice
                    }
                  >
                    Refund/entry policy
                    wording is placeholder
                    content and must be
                    confirmed by VELOOP
                    Rewards before production.
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndividualGiveawayInfo;



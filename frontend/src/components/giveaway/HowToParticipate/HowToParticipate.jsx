import {
  CircleCheck,
  Gift,
  ListChecks,
  LogIn,
  TicketCheck,
} from "lucide-react";

import styles from "./HowToParticipate.module.css";

const steps = [
  {
    number: "01",
    title: "Sign Up / Login",
    description:
      "Sign in to your VELOOP Rewards account to get started.",
    icon: LogIn,
  },
  {
    number: "02",
    title: "Complete Activities",
    description:
      "Complete eligible activities available on your rewards account.",
    icon: ListChecks,
  },
  {
    number: "03",
    title: "Earn Entries",
    description:
      "Eligible activities can help you collect giveaway entries.",
    icon: TicketCheck,
  },
  {
    number: "04",
    title: "Participate",
    description:
      "Review the giveaway details, entry requirement and rules before joining.",
    icon: CircleCheck,
  },
  {
    number: "05",
    title: "Win Rewards",
    description:
      "Winners are announced after the giveaway has officially ended.",
    icon: Gift,
  },
];

function HowToParticipate() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
    >
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div>
              <span className={styles.eyebrow}>
                SIMPLE & TRANSPARENT
              </span>

              <h2>
                How to Participate?
              </h2>

              <p>
                A clear journey from discovering a
                giveaway to the final winner
                announcement.
              </p>
            </div>

            <div className={styles.note}>
              No hidden entry requirements.
              Review the reward details before joining.
            </div>
          </div>

          <div className={styles.timeline}>
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  className={styles.step}
                  key={step.number}
                >
                  <div className={styles.top}>
                    <div className={styles.icon}>
                      <Icon size={21} />
                    </div>

                    {index !== steps.length - 1 && (
                      <div
                        className={styles.line}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <span className={styles.number}>
                    {step.number}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToParticipate;
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import { useState } from "react";

import styles from "./FAQ.module.css";

const faqs = [
  {
    question:
      "How do I participate in a giveaway?",
    answer:
      "Open the giveaway you are interested in, review its prize, entry requirement, eligibility information and terms, then follow the participation flow.",
  },
  {
    question:
      "How are winners selected?",
    answer:
      "Winner selection is completed after the giveaway ends. The final production process will be controlled by the backend and the rules configured for that giveaway.",
  },
  {
    question:
      "When are winners announced?",
    answer:
      "Current giveaway winners are shown only after the giveaway has ended and the results have been finalized.",
  },
  {
    question:
      "What happens if I win?",
    answer:
      "Eligible winners receive a winner-specific claim option. The information required depends on the type of prize won.",
  },
  {
    question:
      "How do I claim my prize?",
    answer:
      "Physical-prize winners provide the necessary fulfillment information. Gift-card winners provide the required delivery email instead of a physical address.",
  },
  {
    question:
      "Can I participate more than once?",
    answer:
      "The current development specification allows one participation per user for each giveaway event. A user may participate again when a new eligible giveaway event begins.",
  },
  {
    question:
      "What happens after a giveaway ends?",
    answer:
      "New participation closes, results can be finalized, winners can claim eligible prizes, and the completed event remains available through giveaway history.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] =
    useState(0);

  const toggleItem = (index) => {
    setOpenIndex(
      openIndex === index
        ? -1
        : index
    );
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <div className={styles.icon}>
              <HelpCircle size={22} />
            </div>

            <span>
              NEED TO KNOW
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Quick answers about participation,
              winner announcements and prize
              claiming.
            </p>
          </div>

          <div className={styles.accordion}>
            {faqs.map((faq, index) => {
              const isOpen =
                openIndex === index;

              return (
                <article
                  className={styles.item}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() =>
                      toggleItem(index)
                    }
                    aria-expanded={isOpen}
                  >
                    <span>
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={17}
                      className={
                        isOpen
                          ? styles.rotate
                          : ""
                      }
                    />
                  </button>

                  {isOpen && (
                    <div className={styles.answer}>
                      <p>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
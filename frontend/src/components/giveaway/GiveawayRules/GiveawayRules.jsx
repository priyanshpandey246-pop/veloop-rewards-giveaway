import {
     Ban,
  CalendarClock,
  FileCheck2,
  ShieldAlert,
  Trophy,
  UserCheck,
} from "lucide-react";

import  styles from "./GiveawayRules.module.css";
const rules = [
    {
    icon: UserCheck,
    title: "Eligibility",
    description:
      "Participants must meet the eligibility requirements defined for the selected giveaway.",
  },
  {
    icon: FileCheck2,
    title: "Participation",
    description:
      "Review the prize, required currency, entry amount and giveaway terms before joining.",
  },
  {
    icon: Trophy,
    title: "Winner Selection",
    description:
      "Winners are announced only after the giveaway has ended and results have been finalized.",
  },
  {
    icon: CalendarClock,
    title: "Prize Claim",
    description:
      "Selected winners must submit the required claim details within the specified claim period.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud & Abuse",
    description:
      "Suspicious, fraudulent or abusive participation may be reviewed according to platform rules.",
  },
  {
    icon: Ban,
    title: "Disqualification",
    description:
      "Accounts that violate confirmed giveaway requirements may become ineligible for the affected event.",
  },
];

function GiveawayRules() {
    return (
        <section
        id="rules"
        className={styles.section}
        >
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div>
                            <span className={styles.eyebrow}>
                                KNOW BEFORE YOU JOIN
                            </span>

                            <h2>
                                Giveaway Rules & Guidelines
                            </h2>

                            <p>
                                Important participation information is provided so users can understand the giveaway before entering.
                            </p>
                        </div>

                        <div className={styles.notice}>
                            <ShieldAlert size={18} />

                            <span>
                                Final eligibility and platform policies will be determined by VELOOP Rewards.
                            </span>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {rules.map((rule, index) => {
                            const Icon = rule.icon;

                            return (
                                <article
                                className={styles.rule}
                                key={rule.title}
                                >
                                    <div className={styles.ruleTop}>
                                        <div className={styles.icon}>
                                            <Icon size={18} />
                                        </div>

                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h3>{rule.title}</h3>
                                    <p>{rule.description}</p>
                                </article>
                            )
                        })}
                    </div>
                    <p className={styles.placeholder}>
                        Development notice: policy wording is illustrative and should be replaced or confirmed before production use.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default GiveawayRules;
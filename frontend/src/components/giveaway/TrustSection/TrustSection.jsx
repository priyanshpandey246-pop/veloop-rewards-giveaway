import {
    Eye,
    FileCheck2,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";

import styles from "./TrustSection.module.css";
const trustItems = [
    {
        icon: FileCheck2,
        title: "Clear Rules",
        description:
        "Entry requirements and participation rules are shown before you join.",
    
    },
    { 
        icon: ShieldCheck,
        title: "Fair Participation",
        description:
        "Giveaway elegibility and participation states are handled consistently.",
    },
    {
        icon: Eye,
        title: "Reward Transparency",
        description:
        "Prize details, winner counts and entry requirements are presented clearly.",
    },
     {
    icon: LockKeyhole,
    title: "Privacy Aware",
    description:
      "Winner identities are masked and claim information is kept out of public results.",
  },
];

function TrustSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <span>BUILT AROUND CLARITY</span>

                    <h2>
                        A giveaway experience you can understand
                    </h2>

                    <p>
                        Important participation information stays visible throughout the reward journey.
                    </p>
                </div>

                <div className={styles.grid}>
                    {trustItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                            className={styles.card}
                            key={item.title}
                            >
                                <div className={styles.icon}>
                                    <Icon size={20} />
                                </div>

                                <h3>{item.title}</h3>

                                <p>
                                    {item.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default TrustSection;



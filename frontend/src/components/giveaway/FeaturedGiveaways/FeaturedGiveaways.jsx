import {
  Gift,
  ShieldCheck,
} from "lucide-react";

import PrizeCard from "../PrizeCard/PrizeCard";

import styles from "./FeaturedGiveaways.module.css";

function FeaturedGiveaways({
  giveaways = [],
}) {
  return (
    <section
      id="featured-giveaways"
      className={styles.section}
    >
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <Gift size={14} />
              AVAILABLE REWARDS
            </div>

            <h2>
              Featured Giveaways
            </h2>

            <p>
              Explore available rewards and
              review every entry requirement
              before participating.
            </p>
          </div>

          <div className={styles.notice}>
            <ShieldCheck size={17} />

            <span>
              Entry cost is always shown
              before participation.
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {giveaways.map(
            (giveaway, index) => (
              <PrizeCard
                key={
                  giveaway.prizeId ||
                  giveaway.id
                }
                giveaway={giveaway}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGiveaways;



import {
  Gift,
  ShieldCheck,
} from "lucide-react";

import PrizeCard from "../PrizeCard/PrizeCard";

import styles from "./FeaturedGiveaways.module.css";

function FeaturedGiveaways({
  giveaways = [],
}) {
  const renderCards = (suffix = "") =>
    giveaways.map((giveaway, index) => (
      <div
        className={styles.cardWrap}
        key={`${
          giveaway.prizeId || giveaway.id
        }-${suffix}-${index}`}
      >
        <PrizeCard
          giveaway={giveaway}
          index={index}
        />
      </div>
    ));

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
      </div>

      {giveaways.length > 0 && (
        <div className={styles.carousel}>
          <div className={styles.track}>
            <div className={styles.group}>
              {renderCards("first")}
            </div>

            <div
              className={styles.group}
              aria-hidden="true"
            >
              {renderCards("duplicate")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeaturedGiveaways;
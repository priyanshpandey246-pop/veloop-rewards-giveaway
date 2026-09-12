import { motion } from "framer-motion";

import {
  ArrowRight,
  Gift,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroGift from "../../../assets/giveaway/hero-gift.png";
import giveawayTicket from "../../../assets/giveaway/giveaway-ticket.png";

import styles from "./GiveawayHero.module.css";

function GiveawayHero({
  status = "UPCOMING",
}) {
  const goToGiveaways = () => {
    document
      .getElementById(
        "featured-giveaways"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goToHowItWorks = () => {
    document
      .getElementById(
        "how-it-works"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const statusText = {
    ACTIVE: "Giveaway Live",
    ENDED: "Giveaway Ended",
    UPCOMING: "Coming Soon",
    ARCHIVED: "Giveaway Completed",
  };

  return (
    <section className={styles.hero}>
      <div
        className={styles.glowLeft}
        aria-hidden="true"
      />

      <div
        className={styles.glowRight}
        aria-hidden="true"
      />

      <div className="container position-relative">
        <div
          className={
            styles.heroCard
          }
        >
          <motion.div
            className={
              styles.content
            }
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <div
              className={
                styles.eyebrow
              }
            >
              <Gift size={15} />

              <span>
                EXCLUSIVE GIVEAWAYS
              </span>
            </div>

            <h1
              className={
                styles.title
              }
            >
              Premium rewards.
              <span>
                Real excitement.
              </span>
            </h1>

            <p
              className={
                styles.description
              }
            >
              Complete eligible
              activities, earn entries
              and participate for a
              chance to win premium
              rewards from VELOOP
              Rewards.
            </p>

            <div
              className={
                styles.actions
              }
            >
              <button
                type="button"
                className={
                  styles.primaryButton
                }
                onClick={
                  goToGiveaways
                }
              >
                Explore Giveaways
                <ArrowRight
                  size={18}
                />
              </button>

              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={
                  goToHowItWorks
                }
              >
                How It Works
              </button>
            </div>

            <div
              className={
                styles.trustRow
              }
            >
              <div>
                <ShieldCheck
                  size={17}
                />

                <span>
                  Transparent
                  participation
                </span>
              </div>

              <span
                className={
                  styles.divider
                }
                aria-hidden="true"
              />

              <div>
                <Sparkles
                  size={17}
                />

                <span>
                  Premium rewards
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={
              styles.visual
            }
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
            }}
          >
            <div
              className={
                styles.productGlow
              }
              aria-hidden="true"
            />

            <motion.img
              src={heroGift}
              alt="Purple and gold reward gift box"
              className={
                styles.gift
              }
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={
                giveawayTicket
              }
              alt=""
              aria-hidden="true"
              className={
                styles.ticket
              }
              animate={{
                y: [0, 5, 0],
                rotate: [
                  -7,
                  -4,
                  -7,
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div
              className={
                styles.statusCard
              }
            >
              <span
                className={
                  styles.liveDot
                }
                aria-hidden="true"
              />

              <div>
                <small>
                  CURRENT STATUS
                </small>

                <strong>
                  {statusText[
                    status
                  ] ||
                    status}
                </strong>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GiveawayHero;
import {
    Gift,
    Sparkles,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import styles from "./GiveawayLoader.module.css";

const messages = [
    "Preparing today's rewards...",
    "Checking active giveaways...",
    "Loading available prizes...",
    "Bringing your rewards closer...",
];

function GiveawayLoader({
    fullPage = true,
}) {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(
            () => {
                setMessageIndex((current) => 
                (current + 1) % messages.length
            );
            },
            2200
        );

        return () => 
            clearInterval(timer);
    }, []);

    return (
        <div
        className={
            fullPage
            ?styles.fullPage
            : styles.inline
        }
        role="status"
        aria-live="polite"
        >
            <div className={styles.loader}>
                <div className={styles.reward}>
                    <span
                    className={styles.orbit}
                    aria-hidden="true"
                    />
                    <div className={styles.gift}>
                        <Gift size={27} />
                    </div>

                    <Sparkles
                    size={15}
                    className={styles.sparkleOne}
                    aria-hidden="true"
                    />

                    <Sparkles
                    size={11}
                    className={styles.sparkleTwo}
                    aria-hidden="true"
                    />
                </div>

                <span className={styles.brand}>
                    VELOOP REWARDS
                </span>

                <h2>
                    Unlocking rewards
                </h2>

                <p key = {messageIndex}>
                    {messages[messageIndex]}
                </p>

                <div className={styles.progress}
                    aria-hidden="true"
                    >
                        <span />
                </div>
            </div>

        </div>
    )
}

export default GiveawayLoader;



import {
    Gift,
    RefreshCw,
    TriangleAlert,
} from "lucide-react";

import styles from "./StateMessage.module.css";

function StateMessage({
    type = "empty",
    title,
    description,
    onRetry,
}) 
{
    const Icon =
    type === "error"
    ? TriangleAlert
    : Gift;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.icon} $ {
            type === "error"
            ? styles.errorIcon
            : ""
            }`}
            >
                <Icon size={22} />
                </div>

                <h2>{title}</h2>
                <p>{description}</p>

                {type === " error" && onRetry && (
                    <button
                    type="button"
                    onClick={onRetry}
                    >
                        <RefreshCw size={15} />
                        Try Again
                    </button>
                )}
            </div>
    
    );
}

export default StateMessage;



import { Gift, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
            <Link to="/giveaways" className={styles.brand}>
                <div className={styles.brandIcon}>
                    <Gift size={20} />
                    </div>

                    <div className={styles.brandText}>
                        <strong>VELOOP</strong>
                        <span>REWARDS</span>
                        </div>
                        </Link>

                        <nav
                        className={styles.links}
                        aria-label="Main navigation"
                        >
                            <Link to="/giveaway">
                            Giveaways
                            </Link>

                            <a href="#how-it-works">
                                How It Works
                            </a>

                            <a href="#winners">
                                Winners
                            </a>

                            <a href="#rules">
                                Rules
                            </a>
                        </nav>

                        <button 
                        type="button"
                        className={styles.account}
                        >
                            <UserRound size={17} />
                            <span>My Account</span>
                        </button>
                        </div>
        </header>
    )
}

export default Navbar;
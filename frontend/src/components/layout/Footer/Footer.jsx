import {
    Gift,
    Mail,
} from "lucide-react"

import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <Link
                    to="/giveaways"
                    className={styles.brand}
                    >
                        <div>
                            <Gift size={18} />
                        </div>

                        <span>
                            <strong>VELOOP</strong>
                            <small>REWARDS</small>
                        </span>
                    </Link>
                    
                    <nav className={styles.links}
                    aria-label="Footer navigation"
                    >
                        <Link to="/giveaways">
                        Giveaway Home
                        </Link>

                        <Link to="/giveaways#rules">
                        Rules</Link>

                        <a href="#terms">
                            Terms
                        </a>

                         <a href="#privacy">
                            Privacy
                        </a>

                         <a href="#support">
                            Support
                        </a>
 

                    </nav>
                </div>

                <div className={styles.bottom}>
                    <span>
                        VELOOP Rewards Giveaway Experience
                    </span>

                    <div>
                        <Mail size={13} />
                        Have questions? Contact VELOOP Rewards support.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;




import {
  Gift,
  UserRound,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  const [
    accountOpen,
    setAccountOpen,
  ] = useState(false);

  const location =
    useLocation();

  const onGiveawayHome =
    location.pathname ===
    "/giveaways";

  const sectionLink = (
    id
  ) =>
    onGiveawayHome
      ? `#${id}`
      : `/giveaways#${id}`;

  return (
    <header
      className={
        styles.header
      }
    >
      <div
        className={`container ${styles.nav}`}
      >
        <Link
          to="/giveaways"
          className={
            styles.brand
          }
        >
          <div
            className={
              styles.brandIcon
            }
          >
            <Gift size={20} />
          </div>

          <div
            className={
              styles.brandText
            }
          >
            <strong>
              VELOOP
            </strong>

            <span>
              REWARDS
            </span>
          </div>
        </Link>

        <nav
          className={
            styles.links
          }
          aria-label="Main navigation"
        >
          <Link to="/giveaways">
            Giveaways
          </Link>

          <a
            href={sectionLink(
              "how-it-works"
            )}
          >
            How It Works
          </a>

          <a
            href={sectionLink(
              "winners"
            )}
          >
            Winners
          </a>

          <a
            href={sectionLink(
              "rules"
            )}
          >
            Rules
          </a>
        </nav>

        <div
          style={{
            position:
              "relative",
          }}
        >
          <button
            type="button"
            className={
              styles.account
            }
            onClick={() =>
              setAccountOpen(
                (current) =>
                  !current
              )
            }
            aria-expanded={
              accountOpen
            }
            aria-haspopup="dialog"
          >
            <UserRound
              size={17}
            />

            <span>
              My Account
            </span>
          </button>

          {accountOpen && (
            <div
              role="dialog"
              aria-label="Account information"
              style={{
                position:
                  "absolute",
                top:
                  "calc(100% + 12px)",
                right: 0,
                zIndex: 1000,
                width: "260px",
                padding: "18px",
                border:
                  "1px solid rgba(167,108,233,.22)",
                borderRadius:
                  "14px",
                background:
                  "#0d0b18",
                boxShadow:
                  "0 18px 50px rgba(0,0,0,.4)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setAccountOpen(
                    false
                  )
                }
                aria-label="Close account menu"
                style={{
                  position:
                    "absolute",
                  top: "10px",
                  right:
                    "10px",
                  display:
                    "grid",
                  placeItems:
                    "center",
                  width:
                    "28px",
                  height:
                    "28px",
                  padding: 0,
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius:
                    "8px",
                  color:
                    "#aaa4b8",
                  background:
                    "transparent",
                }}
              >
                <X size={14} />
              </button>

              <span
                style={{
                  display:
                    "block",
                  marginBottom:
                    "7px",
                  color:
                    "#a76ce9",
                  fontSize:
                    "10px",
                  fontWeight:
                    800,
                  letterSpacing:
                    ".1em",
                }}
              >
                DEMO ACCOUNT
              </span>

              <strong
                style={{
                  display:
                    "block",
                  color:
                    "#fff",
                  fontSize:
                    "15px",
                }}
              >
                VE*****25
              </strong>

              <p
                style={{
                  margin:
                    "7px 0 15px",
                  color:
                    "#817b8e",
                  fontSize:
                    "11px",
                  lineHeight:
                    1.6,
                }}
              >
                Evaluation session
                for the VELOOP
                Giveaway experience.
              </p>

              <Link
                to="/giveaways"
                onClick={() =>
                  setAccountOpen(
                    false
                  )
                }
                style={{
                  display:
                    "block",
                  padding:
                    "9px 12px",
                  borderRadius:
                    "8px",
                  color:
                    "#d8b8ff",
                  background:
                    "rgba(167,108,233,.08)",
                  fontSize:
                    "11px",
                  fontWeight:
                    700,
                  textDecoration:
                    "none",
                  textAlign:
                    "center",
                }}
              >
                Giveaway Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
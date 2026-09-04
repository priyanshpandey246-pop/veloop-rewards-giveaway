import {
  Navigate,
  useParams,
} from "react-router-dom";

import { useState } from "react";

import Navbar from "../../components/layout/Navbar";

import Footer from "../../components/layout/Footer/Footer";

import GiveawayDetailHero from "../../components/giveaway/GiveawayDetailHero/GiveawayDetailHero";

import ParticipationCard from "../../components/giveaway/ParticipationCard/ParticipationCard";

import JoinConfirmationModal from "../../components/giveaway/JoinConfirmationModal/JoinConfirmationModal";

import IndividualGiveawayInfo from "../../components/giveaway/IndividualGiveawayInfo/IndividualGiveawayInfo";

import { giveaways } from "../../data/giveawayData";

import { mockUser } from "../../data/mockUser";

import WinnerClaim from "../../components/giveaway/WinnerClaim/WinnerClaim";

import PrizeClaimModal from "../../components/giveaway/PrizeClaimModal/PrizeClaimModal";

import { demoWinners } from "../../data/winnerData";

import { canShowWinners, } from "../../utils/giveawayStatus";

function GiveawayDetails() {
  const { slug } = useParams();

  const giveaway = giveaways.find(
    (item) => item.slug === slug
  );

  const [modalOpen, setModalOpen] =
    useState(false);

  const [joined, setJoined] =
    useState(false);

  const [balances, setBalances] =
    useState(mockUser.balances);

  const [claimModalOpen, setClaimModalOpen] =
    useState(false);

  const [claimStatus, setClaimStatus] =
    useState("NOT_SUBMITTED");

  if (!giveaway) {
    return (
      <Navigate
        to="/giveaways"
        replace
      />
    );
  }

  const currentBalance =
    balances[giveaway.currency] ?? 0;

  const matchedWinner =
  demoWinners.find(
    (winner) => 
      winner.userId === mockUser.id &&
    winner.giveawayId === giveaway.id
  );

  const winnerForPage =
  matchedWinner && canShowWinners(giveaway.status)
    ? {
      ...matchedWinner,
      claimStatus,
    }
    : null;

  const handleConfirmJoin = () => {
    setBalances((current) => ({
      ...current,

      [giveaway.currency]:
        current[giveaway.currency] -
        giveaway.entryFee,
    }));

    setJoined(true);

    setModalOpen(false);
  };

  return (
    <>
      <Navbar />

      <main>
        <GiveawayDetailHero
          giveaway={giveaway}
        />

        <WinnerClaim
        giveaway={giveaway}
        winner={winnerForPage}
        onClaim={() => 
          setClaimModalOpen(true)
        }
        />

        <section className="container pb-4">
          <div className="row g-4">
            <div className="col-lg-8">
              <div
                style={{
                  height: "100%",
                  padding: "26px",
                  border:
                    "1px solid var(--border)",
                  borderRadius: "18px",
                  background:
                    "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  style={{
                    color: "#a76ce9",
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                  }}
                >
                  BEFORE YOU JOIN
                </span>

                <h2
                  style={{
                    marginTop: "8px",
                    fontSize: "25px",
                  }}
                >
                  Review your participation
                </h2>

                <p
                  style={{
                    color:
                      "var(--text-secondary)",
                    fontSize: "11px",
                    lineHeight: 1.8,
                    maxWidth: "650px",
                  }}
                >
                  This giveaway requires{" "}
                  <strong
                    style={{
                      color: "#cba3f8",
                    }}
                  >
                    {giveaway.entryFee.toLocaleString()}{" "}
                    {giveaway.currency}
                  </strong>
                  . Check your available balance,
                  prize information and giveaway
                  terms before confirming your
                  participation.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <ParticipationCard
                giveaway={giveaway}
                balance={currentBalance}
                hasJoined={joined}
                onJoin={() =>
                  setModalOpen(true)
                }
              />
            </div>
          </div>
        </section>

        <IndividualGiveawayInfo
          giveaway={giveaway}
        />
      </main>

      <Footer />

      <JoinConfirmationModal
        giveaway={giveaway}
        balance={currentBalance}
        isOpen={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onConfirm={handleConfirmJoin}
      />

      <PrizeClaimModal
      giveaway={giveaway}
      winner={winnerForPage}
      isOpen={claimModalOpen}
      onClose={() => 
        setClaimModalOpen(false)
      }
      onSubmitted={() => {
        setClaimStatus("SUBMITTED");
        setClaimModalOpen(false);
      }}
      />
    </>
  );
}

export default GiveawayDetails;
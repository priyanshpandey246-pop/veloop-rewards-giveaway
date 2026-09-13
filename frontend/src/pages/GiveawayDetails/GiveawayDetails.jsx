import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer/Footer";

import GiveawayLoader from "../../components/giveaway/GiveawayLoader/GiveawayLoader";
import StateMessage from "../../components/giveaway/StateMessage/StateMessage";

import GiveawayDetailHero from "../../components/giveaway/GiveawayDetailHero/GiveawayDetailHero";
import ParticipationCard from "../../components/giveaway/ParticipationCard/ParticipationCard";
import JoinConfirmationModal from "../../components/giveaway/JoinConfirmationModal/JoinConfirmationModal";
import IndividualGiveawayInfo from "../../components/giveaway/IndividualGiveawayInfo/IndividualGiveawayInfo";

import useGiveawayDetails from "../../hooks/useGiveawayDetails.js";

import {
  createDemoSession,
} from "../../services/authApi.js";

import {
  getMyStatus,
  joinGiveaway,
} from "../../services/giveawayApi.js";

import {
  getApiError,
} from "../../utils/getApiError.js";

function GiveawayDetails() {
  const { slug } = useParams();

  const {
    giveaway,
    loading,
    error,
    retry,
  } = useGiveawayDetails(slug);

  const [user, setUser] =
    useState(null);

  const [balances, setBalances] =
    useState(null);

  const [joined, setJoined] =
    useState(false);

  const [
    authLoading,
    setAuthLoading,
  ] = useState(true);

  const [
    authError,
    setAuthError,
  ] = useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    joinError,
    setJoinError,
  ] = useState("");

  const giveawayId =
    giveaway?.giveawayId;

  const loadUserStatus =
    useCallback(async () => {
      if (!giveawayId) {
        return;
      }

      setAuthLoading(true);
      setAuthError("");

      try {
        const session =
          await createDemoSession();

        setUser(
          session.user
        );

        const statusResponse =
          await getMyStatus(
            giveawayId
          );

        setJoined(
          statusResponse.data
            .participating
        );

        setBalances(
          statusResponse.data
            .balances
        );
      } catch (
        requestError
      ) {
        console.error(
          "User status loading failed:",
          requestError
        );

        setAuthError(
          getApiError(
            requestError,
            "Unable to load your participation status."
          )
        );
      } finally {
        setAuthLoading(
          false
        );
      }
    }, [giveawayId]);

  useEffect(() => {
    if (!giveawayId) {
      return;
    }

    const timerId =
      setTimeout(() => {
        void loadUserStatus();
      }, 0);

    return () => {
      clearTimeout(
        timerId
      );
    };
  }, [
    giveawayId,
    loadUserStatus,
  ]);

  if (loading) {
    return (
      <>
        <Navbar />

        <GiveawayLoader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <StateMessage
          type="error"
          title="Unable to load giveaway"
          description={
            error
          }
          onRetry={
            retry
          }
        />

        <Footer />
      </>
    );
  }

  if (!giveaway) {
    return (
      <>
        <Navbar />

        <StateMessage
          title="Giveaway not found"
          description="This giveaway is no longer available."
        />

        <Footer />
      </>
    );
  }

  if (authLoading) {
    return (
      <>
        <Navbar />

        <GiveawayLoader />
      </>
    );
  }

  if (authError) {
    return (
      <>
        <Navbar />

        <StateMessage
          type="error"
          title="Unable to load account"
          description={
            authError
          }
          onRetry={
            loadUserStatus
          }
        />

        <Footer />
      </>
    );
  }

  const currentBalance =
    balances?.[
      giveaway.currency
    ] ?? 0;

  const handleConfirmJoin =
    async () => {
      try {
        setJoinError("");

        const response =
          await joinGiveaway(
            giveaway.giveawayId,
            giveaway.prizeId
          );

        setBalances(
          (current) => ({
            ...current,

            [response.data
              .currency]:
              response.data
                .balanceAfter,
          })
        );

        setJoined(true);

        setModalOpen(
          false
        );
      } catch (
        requestError
      ) {
        const code =
          requestError
            ?.response
            ?.data
            ?.code;

        if (
          code ===
          "ALREADY_PARTICIPATING"
        ) {
          setJoined(true);

          setModalOpen(
            false
          );

          await loadUserStatus();

          return;
        }

        setJoinError(
          getApiError(
            requestError,
            "Participation could not be completed."
          )
        );
      }
    };

  return (
    <>
      <Navbar />

      <main>
        <GiveawayDetailHero
          giveaway={
            giveaway
          }
        />

        <section className="container pb-4">
          <div className="row g-4">
            <div className="col-lg-8">
              <div
                style={{
                  height:
                    "100%",
                  padding:
                    "26px",
                  border:
                    "1px solid var(--border)",
                  borderRadius:
                    "18px",
                  background:
                    "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  style={{
                    color:
                      "#7ab8ad",
                    fontSize:
                      "10px",
                    fontWeight:
                      800,
                    letterSpacing:
                      "0.1em",
                  }}
                >
                  BEFORE YOU JOIN
                </span>

                <h2
                  style={{
                    marginTop:
                      "8px",
                    fontSize:
                      "25px",
                  }}
                >
                  Review your
                  participation
                </h2>

                <p
                  style={{
                    color:
                      "var(--text-secondary)",
                    fontSize:
                      "13px",
                    lineHeight:
                      1.8,
                    maxWidth:
                      "650px",
                  }}
                >
                  This giveaway
                  requires{" "}

                  <strong
                    style={{
                      color:
                        "#cba3f8",
                    }}
                  >
                    {giveaway.entryFee.toLocaleString()}{" "}
                    {
                      giveaway.currency
                    }
                  </strong>

                  . Review the prize,
                  balance and giveaway
                  terms before
                  confirming your
                  entry.
                </p>

                {user && (
                  <p
                    style={{
                      marginTop:
                        "18px",
                      color:
                        "#777382",
                      fontSize:
                        "11px",
                    }}
                  >
                    Signed in as{" "}
                    {
                      user.displayName
                    }
                  </p>
                )}

                {joinError && (
                  <div
                    style={{
                      marginTop:
                        "14px",
                      padding:
                        "12px",
                      border:
                        "1px solid rgba(239,99,115,.15)",
                      borderRadius:
                        "9px",
                      color:
                        "#e47d89",
                      background:
                        "rgba(239,99,115,.04)",
                      fontSize:
                        "12px",
                    }}
                    role="alert"
                  >
                    {
                      joinError
                    }
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <ParticipationCard
                giveaway={
                  giveaway
                }
                balance={
                  currentBalance
                }
                hasJoined={
                  joined
                }
                onJoin={() => {
                  setJoinError(
                    ""
                  );

                  setModalOpen(
                    true
                  );
                }}
              />
            </div>
          </div>
        </section>

        <IndividualGiveawayInfo
          giveaway={
            giveaway
          }
        />
      </main>

      <Footer />

      <JoinConfirmationModal
        giveaway={
          giveaway
        }
        balance={
          currentBalance
        }
        isOpen={
          modalOpen
        }
        onClose={() => {
          setJoinError(
            ""
          );

          setModalOpen(
            false
          );
        }}
        onConfirm={
          handleConfirmJoin
        }
      />
    </>
  );
}

export default GiveawayDetails;



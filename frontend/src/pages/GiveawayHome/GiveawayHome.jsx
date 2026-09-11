import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import GiveawayHero from "../../components/giveaway/GiveawayHero/GiveawayHero";
import GiveawayStats from "../../components/giveaway/GiveawayStats/GiveawayStats";
import FeaturedGiveaways from "../../components/giveaway/FeaturedGiveaways/FeaturedGiveaways";
import HowToParticipate from "../../components/giveaway/HowToParticipate/HowToParticipate";
import WinnerSlider from "../../components/giveaway/WinnerSlider/WinnerSlider";
import WinnersTabs from "../../components/giveaway/WinnersTabs/WinnersTabs";
import TrustSection from "../../components/giveaway/TrustSection/TrustSection";
import GiveawayRules from "../../components/giveaway/GiveawayRules/GiveawayRules";
import FAQ from "../../components/giveaway/FAQ/FAQ";
import GiveawayLoader from "../../components/giveaway/GiveawayLoader/GiveawayLoader";
import StateMessage from "../../components/giveaway/StateMessage/StateMessage";
import useCurrentGiveaway from "../../hooks/useCurrentGiveaway";
import {mapBackendPrizes,} from "../../utils/mapGiveawayData.js";
import useWinnerData from "../../hooks/useWinnerData.js";

function GiveawayHome() {
  const {
     giveaway,
    loading,
    error,
    retry,
  } = useCurrentGiveaway();

  const winnerData =
  useWinnerData(
    giveaway?.giveawayId
  );

  const mappedGiveaways =
  mapBackendPrizes(giveaway);

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
          description={error}
          onRetry={retry}
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
          title="No active giveaway"
          description="The next VELOOP Rewards giveaway is being prepared."
        />

        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />

      <main>
        <GiveawayHero />

        <GiveawayStats />

        <FeaturedGiveaways 
        giveaways={mappedGiveaways} />

        <HowToParticipate />

        <WinnerSlider />

        <WinnersTabs
  status={giveaway.status}
  currentWinners={
    winnerData.currentWinners
  }
  previousWinners={
    winnerData.previousWinners
  }
  loading={
    winnerData.loading
  }
  error={
    winnerData.error
  }
/>

        <TrustSection />

        <GiveawayRules />

        <FAQ />

        <Footer />
      </main>
    </>
  );
}

export default GiveawayHome;
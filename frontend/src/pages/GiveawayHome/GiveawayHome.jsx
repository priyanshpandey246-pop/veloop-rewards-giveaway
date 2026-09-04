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

function GiveawayHome() {
  return (
    <>
      <Navbar />

      <main>
        <GiveawayHero />

        <GiveawayStats />

        <FeaturedGiveaways />

        <HowToParticipate />

        <WinnerSlider />

        <WinnersTabs />

        <TrustSection />

        <GiveawayRules />

        <FAQ />

        <Footer />
      </main>
    </>
  );
}

export default GiveawayHome;
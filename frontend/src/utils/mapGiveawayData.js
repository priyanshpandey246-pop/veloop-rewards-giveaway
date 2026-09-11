import iphone from "../assets/giveaway/iphone.png";
import appleWatch from "../assets/giveaway/apple-watch.png";
import airpods from "../assets/giveaway/airpods.png";
import amazon2000 from "../assets/giveaway/amazon-2000.png";
import amazon500 from "../assets/giveaway/amazon-500.png";
import amazon20 from "../assets/giveaway/amazon-20.png";

const images = {
  iphone,
  "apple-watch": appleWatch,
  airpods,
  "amazon-2000": amazon2000,
  "amazon-500": amazon500,
  "amazon-20": amazon20,
};

export function mapBackendPrizes(
  giveaway
) {
  if (!giveaway?.prizes) {
    return [];
  }

  return giveaway.prizes.map(
    (prize) => ({
      id: prize.prizeId,

      prizeId: prize.prizeId,

      giveawayId:
        giveaway.giveawayId,

      slug: prize.slug,

      position:
        prize.position,

      name: prize.name,

      title:
        `Win ${prize.name}`,

      description:
        prize.description,

      image:
        images[
          prize.imageKey
        ] || null,

      status:
        giveaway.status,

      entryFee:
        prize.entryFee,

      currency:
        prize.entryCurrency,

      prizeType:
        prize.prizeType,

      claimType:
        prize.claimType,

      winnerCount:
        prize.winnerCount,

      participants:
        giveaway.participantsCount,

      startAt:
        giveaway.startAt,

      endAt:
        giveaway.endAt,
    })
  );
}
import iphone from "../assets/giveaway/iphone.png";
import appleWatch from "../assets/giveaway/apple-watch.png";
import airpods from "../assets/giveaway/airpods.png";
import amazon2000 from "../assets/giveaway/amazon-2000.png";
import amazon500 from "../assets/giveaway/amazon-500.png";
import amazon20 from "../assets/giveaway/amazon-20.png";

export const giveaways = [
    {
        id: "GW-IP15-001",
        slug: "iphone-15-pro",
        position: "1st Prize",
        name: "iPhone 15 pro",
        title: "Win an iPhone 15 Pro",
        description: "Enter for a chance to win a premium iPhone 15 Pro.",
        image: iphone,
        status: "ACTIVE",
        entryFee: 250,
        currency: "VEs",
        prizeType: "PHYSICAL",
        claimType: "SHIPING",
        winnerCount: 1,
        participants: 2340,
        startAt: "2026-08-20T00:00:00+05:30",
        endAt: "2026-09-05T23:59:59+05:30",
        },

        {
            id: "GW-WATCH-001",
    slug: "apple-watch",

    position: "2nd Prize",

    name: "Apple Watch",
    title: "Win an Apple Watch",

    description:
      "Participate for a chance to win a premium Apple Watch.",

    image: appleWatch,

    status: "ACTIVE",

    entryFee: 200,
    currency: "VEs",

    prizeType: "PHYSICAL",
    claimType: "SHIPPING",

    winnerCount: 3,
    participants: 1860,

    startAt: "2026-08-20T00:00:00+05:30",
    endAt: "2026-09-05T23:59:59+05:30",
        },

        {
             id: "GW-AIRPODS-001",
    slug: "airpods",

    position: "3rd Prize",

    name: "AirPods Pro",
    title: "Win AirPods Pro",

    description:
      "Use your SVEs to enter for a chance to win AirPods Pro.",

    image: airpods,

    status: "ACTIVE",

    entryFee: 500,
    currency: "SVEs",

    prizeType: "PHYSICAL",
    claimType: "SHIPPING",

    winnerCount: 5,
    participants: 3100,

    startAt: "2026-08-20T00:00:00+05:30",
    endAt: "2026-09-05T23:59:59+05:30",
        },

        {
           id: "GW-AMZ2000-001",
    slug: "amazon-2000",

    position: "Reward Draw",

    name: "₹2,000 Amazon Voucher",
    title: "Win a ₹2,000 Amazon Voucher",

    description:
      "Enter using VEs for a chance to receive a ₹2,000 Amazon voucher.",

    image: amazon2000,

    status: "ACTIVE",

    entryFee: 500,
    currency: "VEs",

    prizeType: "GIFT_CARD",
    claimType: "EMAIL",

    winnerCount: 10,
    participants: 1320,

    startAt: "2026-08-20T00:00:00+05:30",
    endAt: "2026-09-05T23:59:59+05:30",  
        },

        {
            id: "GW-AMZ500-001",
    slug: "amazon-500",

    position: "Reward Draw",

    name: "₹500 Amazon Voucher",
    title: "Win a ₹500 Amazon Voucher",

    description:
      "Use VEs to participate in the ₹500 Amazon reward giveaway.",

    image: amazon500,

    status: "ACTIVE",

    entryFee: 300,
    currency: "VEs",

    prizeType: "GIFT_CARD",
    claimType: "EMAIL",

    winnerCount: 15,
    participants: 2810,

    startAt: "2026-08-20T00:00:00+05:30",
    endAt: "2026-09-05T23:59:59+05:30", 
        },

        {
             id: "GW-AMZ20-001",
    slug: "amazon-20",

    position: "Token Reward",

    name: "₹20 Amazon Voucher",
    title: "Win a ₹20 Amazon Voucher",

    description:
      "Use Tokens to participate in the ₹20 Amazon voucher giveaway.",

    image: amazon20,

    status: "ACTIVE",

    entryFee: 2000,
    currency: "Tokens",

    prizeType: "DIGITAL",
    claimType: "EMAIL",

    winnerCount: 25,
    participants: 4260,

    startAt: "2026-08-20T00:00:00+05:30",
    endAt: "2026-09-05T23:59:59+05:30",
        }
];
// data/profileData.js

export const profileData = {
    name: "Alex Wanderlust",
    handle: "alexwanderlust",
    bio: "Exploring the world, one city at a time. Lover of ancient history, spicy food, and spontaneous road trips. Join me on my journey!",
    stats: {
        countries: "32",
        posts: "112",
        followers: "1.2k",
        following: "450",
    },
    // interests: ["Hiking", "Cuisine", "History", "Photography", "Backpacking"],
    interests : [],
    imageUrls: {
        // profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF4W4nG9LPEtQhLtmMed2uDOes-8C0xRSDFaVi8Xne8mAuO9-oCeXSir2t5AFmw7ZYCv3K2oQIohylzA9AyPgy5pOmhNapaCiddnfH9-Da59QCvsmbqUe1ikmeuohKtY6tc3X4uaem5Yi891q9EdEk8WnSydU7KvX-sJ4hrAbYSfQ9qq7EN1rBNrDlZoYylr0dpmtAX-8JpDgtFqhmspDFmDdfItfkwbVYYixPdslrbLVhv0pGVLbqXExpIlBOrWj2jgtEUD2yjpAm",
        header: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ac5HuT-AsGS2CAfF8L0Vrct57sr94ABmhhbiOwOixlWC3Y9xm0LAN5cipAwNJYwrKSjpX7Lb4GaW27sJxr3XGe9UKfU2kdqPA2ltB2nMa7fOYqpOI3fYOH1N1mBZHL7PWPP6mA8qv7cMaKHPduLg-Ap-2nC_g4wuKKkP0MSyd33xYnewqwVKuh3eIUmcx2SLCroGzjjYsKeG_ck9D1CRuOM9fAMU03DHaoEY7DIkPufrX5x_Y26p7kJdTIctGIsG4iXtWYFJx1ms",
        posts: [
            // { title: "Sunrise over Kyoto", country: "Japan", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYNRmkQ7aQ8tjSAGrCYAkM0FUAvBPcT1Traq6gA439olbdXYSI8dsTid162-5UtqqRVaE9mKJoW3GRz5a1vwa5ufR1aUuX598VaTamCc0lDzN5DM_ORPPbK4Tk8IlVfbB5cQ6-07F5wozEfjXhZhFRu469O4yX1tjrhmTnzB_1BxV5abeZI4eKoUSQc4XclDNpKvyF6_OlZLUd4MrkPu3HubkCgqAdsERowVw_-RrAN-pmHaLvaUBqfPBzXw4uy93o3YGX10s1FryX" },
            // { title: "Exploring the Alleys of Prague", country: "Czech Republic", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRudcOxDQCLPv3eqL0n8BYveC7bGyPbu4H5UPYS2Xmwj06p7crTh5cWbPljCbHipxni38ZenuXafx3OXhEuqQpexNTxAVBQauSh76vBPiZQIlZAVvhO6Q5PH66YXtVuhjRS2VH8hs0PnaUJXiv0k2olXB65b0bD2FGNw0yNILLOFamPpZ9zMKkHoggWIRtFJrHFRTPSTUBxzWCFDH0TGCpdEIZs2JMccfHv1Qy73Z86Brw9nOWEdP49Duodps0R19Vw6iKM3WlNs1B" },
            // { title: "Colors of Marrakesh", country: "Morocco", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6dRkN3JIr82l15UOcd9pNh67w50D0hW2D8ZVBf0XgiByoVYcQpedW9EXVE8YcQSkaKLwN0B7RDod4qpzBJODffEV0Yz8CLXYBrN4U33ukMAhT8oi9Z8ngoOXnnhEk_u_UZQ3otSK0H-GqfuG_eAGZBAboY5s5CbQPnS7BfqYPDeLEcOYI6XYVSZE4rB3At8kqoHq1mWUciLbNNtEYTimK3JcDG5u5IGk8dr96JnRFOCnzgXLOCPfV1nd7WolYkTkJioKQsUgvD-ur" },
            // { title: "Journey to the Lost City", country: "Peru", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNGx0z7M13HPgD26n47M7erB8idu7LWDHY1k4tM1baZrJiB-mcmsj21qJjZX9lWxY0-nD89PnNGEYTZqDAv6lj2qW9X4MVq79ByyPWBu7iKzxBMK8Uis_l8YUKA_H371CQy0s10v7P05yoK5tCU04FAFKmyIt_2HvkHJqHP_x6Ruc4amoSJx-pkl9YDaUPrx16crc23jRUbi40ULJxxh1WmY0o6Tb-lS2InCgC2pxvwpKx9-e52fXA1A7zSfSAy-lWOJruoyU-sgLD" },
            // { title: "Alpine Adventures", country: "Switzerland", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk_8YMG3u3HkE6PDwjf1pzeCxVN5UgQ2hiDuTm8bAUvxyL8e7uwK4c93PsUedGFVLeCC_S8UYQtAuHLtfGCP_dJrPtg-TZ2okjRQ_poD_vgav646bcALU4Denf4Q1Q3ZgxGp7jRdYCPRV_WjWgwkTAuf8a7VbM236cSleWGn5JJQB3KAZi87W_ouynlOJ61hMW0kBAKaTmVge1iMUAQ_ixw0cMMgvzRWGgBiQYrPLK91RmLoVTwgt3T_ydxp8PEvdqk7d0TouD01y0" },
            // { title: "Paradise Found", country: "Maldives", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuApOT2biY82mRuEqoLDg4R4b5gDhdZ1Y22MdNtShW4iAqxCSS-8nP0KA5Qh1GTkGY3ZDXZzEdckVLqEJvWIgfbvl9GtFpCj_msSS_nSzYk7xcTaCbKhXITodrRD2WXOrO4Y0SzNUqPT3IgPJ3zd8aQwEdS0zCYSCGJo2cJkyJ_M9zBak5AfldGNk6eMCFLJwR_RVxZxe2IGu6wNvK-5Cjw2-G6WxgWvXqi-tGJPya2rRFduys2Abw6cZR33-rFHk86BeuNABMPT9cLR" },
        ]
    },
    badges: {
        progress: {
            // title: "Continent Conqueror", current: 17, target: 25, percentage: 63
        },
        earned: [
            // { icon: "travel_explore", title: "First Journey", desc: "Visited your first country." },
            // { icon: "map", title: "Pathfinder", desc: "Created 3 itineraries." },
            // { icon: "star", title: "VoyAIger Veteran", desc: "Active for 1 year." },
            // { icon: "hiking", title: "Mountain Explorer", desc: "Posted 5 mountain photos." },
            // { icon: "restaurant", title: "Food Critic", desc: "Reviewed 10 local cuisines." },
            // { icon: "history_edu", title: "Ancient Historian", desc: "Visited 5 historical sites." },
        ],
        future: [
            { icon: "travel_explore", title: "Continent Conqueror", desc: "Visit 25 unique countries." },
            { icon: "local_printshop", title: "Lens Master", desc: "Upload 100 travel photos." },
            { icon: "diversity_3", title: "Community Leader", desc: "Receive 500 likes on posts." },
        ]
    }
};
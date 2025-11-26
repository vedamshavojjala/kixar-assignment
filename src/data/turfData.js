// src/data/turfData.js
export const turfDetails = {
  id: "1",
  name: "Xciteplay Club",
  rating: 4.5,
  ratingCount: 15,
  reviewCount: 10,
  address: "516/A, Katol Rd, KT Nagar, Nagpur, Maharashtra 440013",
  pricePerHour: 1200,

  about:
    "Xciteplay Club is the perfect spot for football and cricket lovers to bring their game. The club offers well-maintained turf, good lighting and convenient access so you can just focus on playing.",

  timings: [
    {
      day: "Monday",
      time: "06:00 PM – 07:00 PM",
    },
  ],

  facilities: ["Parking", "Water", "Ball", "Night Light"],
  sports: ["Foot Ball", "Cricket", "Pickle Ball"],

  offer: {
    code: "FIRSTBOOK",
    text: "Get a 20% Offer on your first turf booking with Kixar App",
  },

  // ✅ different review texts now
  reviews: [
    {
      id: "1",
      name: "Siva",
      rating: 5.0,
      ago: "2 days ago",
      date: "22 Nov, 2025",
      text:
        "Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !",
    },
    {
      id: "2",
      name: "Kumar",
      rating: 5.0,
      ago: "2 days ago",
      date: "22 Nov, 2025",
      text:
        "Great turf quality and smooth booking experience. Lights, turf and facilities are all perfect for evening matches!",
    },
  ],
};

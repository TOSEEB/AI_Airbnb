const mongoose = require("mongoose");
const StayModel = require("../models/Stay");


const initialStays = [
  {
    title: "Luxury Sea View Apartment",
    location: "Mumbai, Maharashtra",
    price: 9500,
   images: [
  "/images/stay1/property_1_img1.jpg",
  "/images/stay1/property_1_img2.jpg",
  "/images/stay1/property_1_img3.jpg",
  "/images/stay1/property_1_img4.jpg",
  "/images/stay1/property_1_img5.jpg",
],
    description: "Modern sea-facing apartment in South Mumbai with luxury interiors and skyline views.",
    category: "Apartment",
    rating: 4.9,
    bedrooms: 2,
    guests: 4
  },

  {
    title: "Tech City Loft",
    location: "Bengaluru, Karnataka",
    price: 7200,
    images: [
  "/images/stay2/property_2_img1.png",
  "/images/stay2/property_2_img2.png",
  "/images/stay2/property_2_img3.png",
  "/images/stay2/property_2_img4.png",
  "/images/stay2/property_2_img5.png",
],
    description: "Stylish loft near tech parks with workspace, fast Wi-Fi and modern interiors.",
    category: "Loft",
    rating: 4.8,
    bedrooms: 1,
    guests: 2
  },

  {
    title: "Skyline Penthouse",
    location: "Hyderabad, Telangana",
    price: 8500,
    images: [
  "/images/stay3/property_3_img1.png",
  "/images/stay3/property_3_img2.png",
  "/images/stay3/property_3_img3.png",
  "/images/stay3/property_3_img4.png",
  "/images/stay3/property_3_img5.png",
],
    description: "Premium penthouse with city views, elegant decor and rooftop access.",
    category: "Penthouse",
    rating: 4.8,
    bedrooms: 2,
    guests: 4
  },

  {
    title: "Royal Heritage Villa",
    location: "Jaipur, Rajasthan",
    price: 8900,
    images: [
  "/images/stay4/property_4_img1.png",
  "/images/stay4/property_4_img2.png",
  "/images/stay4/property_4_img3.png",
  "/images/stay4/property_4_img4.png",
  "/images/stay4/property_4_img5.png",
],
    description: "Traditional villa with heritage architecture and modern comfort.",
    category: "Villa",
    rating: 4.9,
    bedrooms: 3,
    guests: 6
  },

  {
    title: "Beach Paradise Villa",
    location: "Goa",
    price: 12500,
    images: [
  "/images/stay5/property_5_img1.png",
  "/images/stay5/property_5_img2.png",
  "/images/stay5/property_5_img3.png",
  "/images/stay5/property_5_img4.png",
  "/images/stay5/property_5_img5.png",
],
    description: "Luxury villa with private pool just minutes from the beach.",
    category: "Beach House",
    rating: 5.0,
    bedrooms: 4,
    guests: 8
  },

  {
    title: "Mountain Escape Cabin",
    location: "Manali, Himachal Pradesh",
    price: 6800,
   images: [
  "/images/stay6/property_6_img1.png",
  "/images/stay6/property_6_img2.png",
  "/images/stay6/property_6_img3.png",
  "/images/stay6/property_6_img4.png",
  "/images/stay6/property_6_img5.png",
],
    description: "Wooden cabin surrounded by mountains and pine forests.",
    category: "Cabin",
    rating: 4.9,
    bedrooms: 2,
    guests: 5
  },

  {
    title: "Lake Palace Stay",
    location: "Udaipur, Rajasthan",
    price: 9800,
    images: [
  "/images/stay7/property_7_img1.png",
  "/images/stay7/property_7_img2.png",
  "/images/stay7/property_7_img3.png",
  "/images/stay7/property_7_img4.png",
  "/images/stay7/property_7_img5.png",
],
    description: "Beautiful heritage stay overlooking lakes and palaces.",
    category: "Heritage",
    rating: 4.9,
    bedrooms: 3,
    guests: 6
  },

  {
    title: "Coffee Estate Cottage",
    location: "Coorg, Karnataka",
    price: 5900,
    images: [
  "/images/stay8/property_8_img1.png",
  "/images/stay8/property_8_img2.png",
  "/images/stay8/property_8_img3.png",
  "/images/stay8/property_8_img4.png",
  "/images/stay8/property_8_img5.png",
],
    description: "Peaceful cottage located inside lush coffee plantations.",
    category: "Cottage",
    rating: 4.8,
    bedrooms: 2,
    guests: 4
  },

  {
    title: "Marina Luxury Apartment",
    location: "Chennai, Tamil Nadu",
    price: 7000,
    images: [
  "/images/stay9/property_9_img1.png",
  "/images/stay9/property_9_img2.png",
  "/images/stay9/property_9_img3.png",
  "/images/stay9/property_9_img4.png",
  "/images/stay9/property_9_img5.png",
],
    description: "Modern apartment close to Marina Beach with premium amenities.",
    category: "Apartment",
    rating: 4.7,
    bedrooms: 2,
    guests: 4
  },

  {
    title: "Tea Garden Retreat",
    location: "Munnar, Kerala",
    price: 6200,
    images: [
  "/images/stay10/property_10_img1.png",
  "/images/stay10/property_10_img2.png",
  "/images/stay10/property_10_img3.png",
  "/images/stay10/property_10_img4.png",
  "/images/stay10/property_10_img5.png",
],
    description: "Scenic retreat surrounded by tea plantations and mountain views.",
    category: "Resort",
    rating: 4.9,
    bedrooms: 2,
    guests: 4
  },
  {
  title: "Skyline Luxury Suite",
  location: "Pune, Maharashtra",
  price: 7200,
  images: [
"/images/stay11/property_11_img1.png",
"/images/stay11/property_11_img2.png",
"/images/stay11/property_11_img3.png",
"/images/stay11/property_11_img4.png",
"/images/stay11/property_11_img5.png",
  ],
  description: "A stylish luxury suite in Pune offering spacious interiors, city skyline views, high-speed Wi-Fi, and premium amenities for business and leisure travelers.",
  category: "Apartment",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Royal Desert Haveli",
  location: "Jaisalmer, Rajasthan",
  price: 8600,
  images: [
"/images/stay12/property_12_img1.png",
"/images/stay12/property_12_img2.png",
"/images/stay12/property_12_img3.png",
"/images/stay12/property_12_img4.png",
"/images/stay12/property_12_img5.png",
],
  description: "Experience Rajasthan's royal heritage in a beautifully restored haveli with elegant rooms and authentic architecture.",
  category: "Heritage",
  rating: 4.9,
  bedrooms: 3,
  guests: 6
},

{
  title: "Kerala Backwater Retreat",
  location: "Alleppey, Kerala",
  price: 7800,
  images: [
"/images/stay13/property_13_img1.png",
"/images/stay13/property_13_img2.png",
"/images/stay13/property_13_img3.png",
"/images/stay13/property_13_img4.png",
"/images/stay13/property_13_img5.png",
],
  description: "Relax beside Kerala's peaceful backwaters with private balconies, lush gardens, and authentic local cuisine.",
  category: "Resort",
  rating: 4.9,
  bedrooms: 2,
  guests: 5
},

{
  title: "Hill View Cottage",
  location: "Ooty, Tamil Nadu",
  price: 6200,
  images: [
"/images/stay14/property_14_img1.png",
"/images/stay14/property_14_img2.png",
"/images/stay14/property_14_img3.png",
"/images/stay14/property_14_img4.png",
"/images/stay14/property_14_img5.png",
],
  description: "Cozy cottage surrounded by tea gardens and rolling hills with a fireplace and peaceful atmosphere.",
  category: "Cottage",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Lakefront Luxury Villa",
  location: "Nainital, Uttarakhand",
  price: 9800,
  images: [
"/images/stay15/property_15_img1.png",
"/images/stay15/property_15_img2.png",
"/images/stay15/property_15_img3.png",
"/images/stay15/property_15_img4.png",
"/images/stay15/property_15_img5.png",
],
  description: "Premium lakefront villa with breathtaking views, elegant interiors, and a spacious outdoor deck.",
  category: "Villa",
  rating: 5.0,
  bedrooms: 4,
  guests: 8
},

{
  title: "City Lights Penthouse",
  location: "New Delhi",
  price: 9900,
  images: [
"/images/stay16/property_16_img1.png",
"/images/stay16/property_16_img2.png",
"/images/stay16/property_16_img3.png",
"/images/stay16/property_16_img4.png",
"/images/stay16/property_16_img5.png",
],
  description: "Modern penthouse featuring luxury interiors, rooftop seating, and panoramic city views.",
  category: "Penthouse",
  rating: 4.9,
  bedrooms: 3,
  guests: 6
},

{
  title: "Snow Peak Cabin",
  location: "Shimla, Himachal Pradesh",
  price: 6900,
 images: [
"/images/stay17/property_17_img1.png",
"/images/stay17/property_17_img2.png",
"/images/stay17/property_17_img3.png",
"/images/stay17/property_17_img4.png",
"/images/stay17/property_17_img5.png",
],
  description: "Escape to a charming wooden cabin surrounded by pine forests and snow-capped Himalayan mountains.",
  category: "Cabin",
  rating: 4.9,
  bedrooms: 2,
  guests: 5
},

{
  title: "French Quarter Villa",
  location: "Puducherry",
  price: 6700,
  images: [
"/images/stay18/property_18_img1.png",
"/images/stay18/property_18_img2.png",
"/images/stay18/property_18_img3.png",
"/images/stay18/property_18_img4.png",
"/images/stay18/property_18_img5.png",
],
  description: "Elegant colonial-style villa near the beach with colorful streets, cafés, and French-inspired architecture.",
  category: "Villa",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Tea Estate Bungalow",
  location: "Darjeeling, West Bengal",
  price: 7400,
 images: [
"/images/stay19/property_19_img1.png",
"/images/stay19/property_19_img2.png",
"/images/stay19/property_19_img3.png",
"/images/stay19/property_19_img4.png",
"/images/stay19/property_19_img5.png",
],
  description: "Stay amidst lush tea plantations with breathtaking Himalayan sunrise views and luxurious comfort.",
  category: "Bungalow",
  rating: 4.9,
  bedrooms: 3,
  guests: 6
},

{
  title: "Island Paradise Villa",
  location: "Port Blair, Andaman & Nicobar Islands",
  price: 11800,
  images: [
"/images/stay20/property_20_img1.png",
"/images/stay20/property_20_img2.png",
"/images/stay20/property_20_img3.png",
"/images/stay20/property_20_img4.png",
"/images/stay20/property_20_img5.png",
],
  description: "Private beachfront villa with crystal-clear waters, tropical gardens, and direct beach access.",
  category: "Beach House",
  rating: 5.0,
  bedrooms: 4,
  guests: 8
},

{
  title: "Sabarmati Riverfront Apartment",
  location: "Ahmedabad, Gujarat",
  price: 6400,
  images: [
"/images/stay21/property_21_img1.png",
"/images/stay21/property_21_img2.png",
"/images/stay21/property_21_img3.png",
"/images/stay21/property_21_img4.png",
"/images/stay21/property_21_img5.png",
],
  description: "Modern apartment overlooking the Sabarmati Riverfront with spacious rooms and premium amenities.",
  category: "Apartment",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Kochi Waterfront Villa",
  location: "Kochi, Kerala",
  price: 7900,
  images: [
"/images/stay22/property_22_img1.png",
"/images/stay22/property_22_img2.png",
"/images/stay22/property_22_img3.png",
"/images/stay22/property_22_img4.png",
"/images/stay22/property_22_img5.png",
],
  description: "Luxury waterfront villa featuring traditional Kerala architecture and peaceful surroundings.",
  category: "Villa",
  rating: 4.9,
  bedrooms: 3,
  guests: 6
},

{
  title: "Royal Mysuru Palace Stay",
  location: "Mysuru, Karnataka",
  price: 6100,
  images: [
"/images/stay23/property_23_img1.png",
"/images/stay23/property_23_img2.png",
"/images/stay23/property_23_img3.png",
"/images/stay23/property_23_img4.png",
"/images/stay23/property_23_img5.png",
],
  description: "Elegant heritage-inspired stay located close to Mysore Palace and local attractions.",
  category: "Heritage",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Lonavala Valley Resort",
  location: "Lonavala, Maharashtra",
  price: 8300,
  images: [
"/images/stay24/property_24_img1.png",
"/images/stay24/property_24_img2.png",
"/images/stay24/property_24_img3.png",
"/images/stay24/property_24_img4.png",
"/images/stay24/property_24_img5.png",
],
  description: "Beautiful hillside resort with infinity pool, scenic valley views, and luxurious rooms.",
  category: "Resort",
  rating: 4.9,
  bedrooms: 3,
  guests: 6
},

{
  title: "Alibaug Beach Villa",
  location: "Alibaug, Maharashtra",
  price: 13200,
  images: [
"/images/stay25/property_25_img1.png",
"/images/stay25/property_25_img2.png",
"/images/stay25/property_25_img3.png",
"/images/stay25/property_25_img4.png",
"/images/stay25/property_25_img5.png",
],
  description: "Private luxury villa with swimming pool just a short walk from the beach.",
  category: "Beach House",
  rating: 5.0,
  bedrooms: 4,
  guests: 8
},

{
  title: "Riverside Yoga Retreat",
  location: "Rishikesh, Uttarakhand",
  price: 5900,
 images: [
"/images/stay26/property_26_img1.png",
"/images/stay26/property_26_img2.png",
"/images/stay26/property_26_img3.png",
"/images/stay26/property_26_img4.png",
"/images/stay26/property_26_img5.png",
],
  description: "Peaceful retreat near the Ganges, perfect for yoga, meditation, and nature lovers.",
  category: "Retreat",
  rating: 4.9,
  bedrooms: 2,
  guests: 4
},

{
  title: "Mussoorie Hill Cottage",
  location: "Mussoorie, Uttarakhand",
  price: 6700,
  images: [
"/images/stay27/property_27_img1.png",
"/images/stay27/property_27_img2.png",
"/images/stay27/property_27_img3.png",
"/images/stay27/property_27_img4.png",
"/images/stay27/property_27_img5.png",
],
  description: "Charming hill cottage offering panoramic Himalayan views and cozy wooden interiors.",
  category: "Cottage",
  rating: 4.8,
  bedrooms: 2,
  guests: 5
},

{
  title: "Dal Lake Houseboat",
  location: "Srinagar, Jammu & Kashmir",
  price: 8900,
  images: [
"/images/stay28/property_28_img1.png",
"/images/stay28/property_28_img2.png",
"/images/stay28/property_28_img3.png",
"/images/stay28/property_28_img4.png",
"/images/stay28/property_28_img5.png",
],
  description: "Traditional luxury houseboat on Dal Lake with handcrafted interiors and mountain views.",
  category: "Houseboat",
  rating: 5.0,
  bedrooms: 3,
  guests: 6
},

{
  title: "Ganges Heritage Stay",
  location: "Varanasi, Uttar Pradesh",
  price: 5600,
  images: [
"/images/stay29/property_29_img1.png",
"/images/stay29/property_29_img2.png",
"/images/stay29/property_29_img3.png",
"/images/stay29/property_29_img4.png",
"/images/stay29/property_29_img5.png",
],
  description: "Beautiful heritage home located near the ghats, blending traditional charm with modern comfort.",
  category: "Heritage",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
},

{
  title: "Chandigarh Designer Apartment",
  location: "Chandigarh",
  price: 6500,
  images: [
"/images/stay30/property_30_img1.png",
"/images/stay30/property_30_img2.png",
"/images/stay30/property_30_img3.png",
"/images/stay30/property_30_img4.png",
"/images/stay30/property_30_img5.png",
],
  description: "Contemporary designer apartment with spacious rooms, modern furnishings, and easy city access.",
  category: "Apartment",
  rating: 4.8,
  bedrooms: 2,
  guests: 4
}
];

console.log("Total stays:", initialStays.length);



const seedStays = async () => {
  try {
    console.log("Seeding started...");

    const deleted = await StayModel.deleteMany({});
    console.log("Deleted:", deleted.deletedCount);

    const inserted = await StayModel.insertMany(initialStays);
    console.log("Inserted:", inserted.length);

    console.log("✅ 30 properties inserted successfully!");
  } catch (err) {
    console.error("Seed Error:");
    console.error(err);
  }
};

const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.log("No MONGO_URI found.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log("MongoDB connected");
   

    await seedStays();
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
  }
};

module.exports = {
  connectDatabase,
}; 



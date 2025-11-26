# Kixar Mobile App Assignment

A React Native (Expo) application built as part of the **Kixar Internship Technical Assignment**.  
The app replicates the Figma UI and implements a full turf-booking flow including:

- Turf Details Screen  
- Booking Screen  
- My Bookings Screen  
- Global Booking Context (State Management)  
- Static JSON data  
- Working navigation + validation  

---

## 🚀 1. Setup Instructions

### 📌 Prerequisites

- Node.js LTS  
- Expo CLI (already included with `npx expo`)  
- Git  

### 📥 Clone & Install

```bash
git clone https://github.com/vedamshavojjala/kixar-assignment
cd kixar-assignment
npm install
▶️ Run the App
bash
Copy code
npx expo start
You can open it in:

Expo Go (Android/iOS)

Android Emulator

iOS Simulator

Web (fallback support)

📱 2. Screens Implemented
1. Turf Details Screen
✔️ Banner image
✔️ Turf name, rating, address
✔️ Get Directions & Call button
✔️ About + Policies tab system
✔️ Collapsible timing section
✔️ Amenities
✔️ Sports availability
✔️ Offers section
✔️ Static reviews
✔️ Map preview (MapView on mobile, static image on web)
✔️ Sticky bottom bar with price + Book Now

2. Booking Screen
✔️ Date selector
✔️ Time period slots (Morning/Noon/Evening/Twilight)
✔️ Court selection (A / B)
✔️ Player counter (+ / -)
✔️ Price calculation
✔️ “Next” button (disabled unless valid)
✔️ Saves booking to global Context

3. My Bookings Screen
✔️ Lists saved bookings
✔️ Shows turf name, date, slot, court, players, price
✔️ Supports empty state
✔️ Persistent state (Context)
✔️ Optional AsyncStorage-ready structure

🧠 3. Tech Stack
React Native (Expo)

Expo Router

React Context API (global booking state)

TypeScript

Reusable components

Static JSON data

📦 4. Folder Structure
kotlin
Copy code
kixar-assignment/
│── app/
│── components/
│── src/
│   ├── context/BookingContext.js
│   ├── data/turfData.js
│── assets/
│── README.md
│── package.json
📝 5. Assumptions
No backend required (only static JSON + Context).

MapView cannot run on Expo Web — fallback static image used.

Only one turf (from JSON) is used for the flow.

🕒 6. Time Spent
Approximately: 6–8 hours

UI implementation: 4 hours

State management: 1.5 hours

Navigation + validation: 1 hour

Fixing MapView & web fallback: ~30 mins

⚠️ 7. Known Issues
Expo Web cannot display real-time MapView.

No animation on transitions

🌟 8. Future Improvements 
Add real backend

Add slot-based pricing

Add smooth UI animations

Add user login system
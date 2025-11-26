// src/context/BookingContext.js
// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);

// key used to store bookings in device storage
const STORAGE_KEY = "@kixar_bookings_v1";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false); // true when we finished loading from storage

  // 🔄 1. Load saved bookings from AsyncStorage when app starts
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed = JSON.parse(json);
          if (Array.isArray(parsed)) {
            setBookings(parsed);
          }
        }
      } catch (e) {
        console.warn("Failed to load bookings from AsyncStorage", e);
      } finally {
        setIsHydrated(true);
      }
    })();
  }, []);

  // 💾 2. Save bookings whenever they change (after initial load)
  useEffect(() => {
    if (!isHydrated) return; // avoid writing initial empty state

    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      } catch (e) {
        console.warn("Failed to save bookings to AsyncStorage", e);
      }
    })();
  }, [bookings, isHydrated]);

  // ➕ Add a new booking
  const addBooking = (bookingInput) => {
    const booking = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      // expect: turfName, date, slotLabel, court, players, pricePerHour
      ...bookingInput,
    };

    setBookings((prev) => [booking, ...prev]);
  };

  const value = {
    bookings,
    addBooking,
    isHydrated,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return ctx;
}

// app/_layout.tsx
// @ts-nocheck
import { Stack } from "expo-router";
import React from "react";
import { BookingProvider } from "../src/context/BookingContext";

export default function RootLayout() {
  return (
    <BookingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* This points to your tabs layout: app/(tabs)/_layout.tsx */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </BookingProvider>
  );
}

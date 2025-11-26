// app/(tabs)/_layout.tsx
// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0.5,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {/* 1. Turf list (home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Turf",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Booking screen */}
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 3. My Bookings list */}
      <Tabs.Screen
        name="explore" // your MyBookings screen file
        options={{
          title: "My Bookings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Detail screen: accessible via navigation, hidden from tab bar */}
      <Tabs.Screen
        name="turf-details"
        options={{
          href: null, // don't show as a tab item
        }}
      />
    </Tabs>
  );
}

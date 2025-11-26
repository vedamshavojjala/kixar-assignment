// app/(tabs)/explore.tsx
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useBooking } from "../../src/context/BookingContext";

export default function MyBookingsScreen() {
  const { bookings } = useBooking();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [bookings.length]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>
            Your confirmed turf bookings will appear here.
          </Text>
        </View>
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.turfName}>{item.turfName}</Text>
                <Text style={styles.rowText}>
                  {item.date} · {item.slotLabel}
                </Text>
                <Text style={styles.rowText}>
                  {item.court} · {item.players} Players
                </Text>
                <Text style={styles.priceText}>
                  ₹ {item.pricePerHour} / hour
                </Text>
              </View>
            )}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    padding: 14,
    marginBottom: 12,
  },
  turfName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  rowText: {
    fontSize: 13,
    color: "#4B5563",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
  },
});

// app/(tabs)/booking.tsx
// @ts-nocheck

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useBooking } from "../../src/context/BookingContext";
import { turfDetails } from "../../src/data/turfData";

const TIME_SECTIONS = ["Morning", "Noon", "Evening", "Twilight"] as const;

const SLOTS_BY_SECTION: Record<string, string[]> = {
  Morning: ["06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00"],
  Noon: ["12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00"],
  Evening: ["17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"],
  Twilight: ["20:00 - 21:00", "21:00 - 22:00"],
};

const COURTS = ["Court A", "Court B"];

export default function BookingScreen() {
  const router = useRouter();
  const { addBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState("Court A");
  const [playerCount, setPlayerCount] = useState(10);

  const basePricePerHour = 1200;

  // Derived per-player cost
  const perPlayerCost = useMemo(() => {
    if (!playerCount) return 0;
    return Math.round((basePricePerHour / playerCount) * 10) / 10;
  }, [basePricePerHour, playerCount]);

  // Simple slide-up animation
  const cardAnim = useRef(new Animated.Value(30)).current;
  React.useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  // Generate next 7 days
  const dates = React.useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dayShort = d.toLocaleDateString("en-US", { weekday: "short" });
      const dateNum = d.getDate();
      list.push({
        key: d.toISOString(),
        labelDay: dayShort,
        labelDate: dateNum,
        value: d.toDateString(),
      });
    }
    return list;
  }, []);

  const currentSlots = activeSection ? SLOTS_BY_SECTION[activeSection] : [];

  const canProceed = selectedDate && selectedSlot;

  const changePlayers = (delta: number) => {
    setPlayerCount((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 22) return 22;
      return next;
    });
  };

  const handleConfirmBooking = () => {
    if (!canProceed) return;

    addBooking({
      turfName: turfDetails.name,
      date: selectedDate!,
      slotLabel: `${activeSection} · ${selectedSlot}`,
      court: selectedCourt,
      players: playerCount,
      pricePerHour: basePricePerHour,
    });

    // Go to My Bookings tab
    router.push("/(tabs)/explore");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Animated.View
          style={{
            paddingHorizontal: 16,
            transform: [{ translateY: cardAnim }],
          }}
        >
          {/* Turf summary card */}
          <View style={styles.turfCard}>
            <Text style={styles.turfName}>{turfDetails.name}</Text>
            <Text style={styles.turfAddress}>{turfDetails.address}</Text>
            <View style={styles.turfMetaRow}>
              <Ionicons name="star" size={14} color="#FBBF24" />
              <Text style={styles.turfRating}>
                {turfDetails.rating} ({turfDetails.ratingCount} ratings)
              </Text>
            </View>
          </View>

          {/* Date selector */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Date</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              {dates.map((d) => {
                const active = selectedDate === d.value;
                return (
                  <Pressable
                    key={d.key}
                    style={[
                      styles.dateChip,
                      active && styles.dateChipActive,
                    ]}
                    onPress={() => setSelectedDate(d.value)}
                  >
                    <Text
                      style={[
                        styles.dateDay,
                        active && styles.dateTextActive,
                      ]}
                    >
                      {d.labelDay}
                    </Text>
                    <Text
                      style={[
                        styles.dateNumber,
                        active && styles.dateTextActive,
                      ]}
                    >
                      {d.labelDate}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Time period */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Time Period</Text>
            <View style={styles.rowWrap}>
              {TIME_SECTIONS.map((sec) => {
                const active = activeSection === sec;
                return (
                  <Pressable
                    key={sec}
                    style={[
                      styles.pillChip,
                      active && styles.pillChipActive,
                    ]}
                    onPress={() => {
                      setActiveSection(sec);
                      setSelectedSlot(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        active && styles.pillTextActive,
                      ]}
                    >
                      {sec}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Time slots */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Available Slots</Text>
            {activeSection ? (
              <View style={styles.rowWrap}>
                {currentSlots.map((slot) => {
                  const active = selectedSlot === slot;
                  return (
                    <Pressable
                      key={slot}
                      style={[
                        styles.slotChip,
                        active && styles.slotChipActive,
                      ]}
                      onPress={() => setSelectedSlot(slot)}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          active && styles.slotTextActive,
                        ]}
                      >
                        {slot}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.helperText}>
                Select a time period to see available slots.
              </Text>
            )}
          </View>

          {/* Court selection */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Court</Text>
            <View style={styles.rowWrap}>
              {COURTS.map((court) => {
                const active = selectedCourt === court;
                return (
                  <Pressable
                    key={court}
                    style={[
                      styles.pillChip,
                      active && styles.pillChipActive,
                    ]}
                    onPress={() => setSelectedCourt(court)}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        active && styles.pillTextActive,
                      ]}
                    >
                      {court}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Player count */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Players</Text>
            <View style={styles.playerRow}>
              <Pressable
                style={styles.counterBtn}
                onPress={() => changePlayers(-1)}
              >
                <Ionicons name="remove" size={18} color="#000" />
              </Pressable>
              <Text style={styles.playerCountText}>{playerCount}</Text>
              <Pressable
                style={styles.counterBtn}
                onPress={() => changePlayers(1)}
              >
                <Ionicons name="add" size={18} color="#000" />
              </Pressable>
            </View>
          </View>

          {/* Pricing section (derived values) */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View className="price-card" style={styles.priceCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceMain}>
                  ₹ {basePricePerHour} / hour
                </Text>
                <Text style={styles.priceSub}>
                  Approx. ₹ {perPlayerCost} per player
                </Text>
              </View>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#6B7280"
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={canProceed ? handleConfirmBooking : undefined}
          style={({ pressed }) => [
            styles.bottomButton,
            { backgroundColor: canProceed ? "#0EA5E9" : "#9CA3AF" },
            pressed && canProceed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.bottomButtonText}>
            {canProceed ? "Confirm Booking" : "Select date & slot"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  turfCard: {
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    padding: 14,
    marginTop: 4,
    marginBottom: 14,
  },
  turfName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  turfAddress: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  turfMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  turfRating: {
    fontSize: 12,
    color: "#4B5563",
    marginLeft: 4,
  },
  sectionBlock: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  dateChip: {
    width: 60,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 6,
    alignItems: "center",
    marginRight: 8,
  },
  dateChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  dateDay: {
    fontSize: 11,
    color: "#6B7280",
  },
  dateNumber: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  dateTextActive: {
    color: "#fff",
  },
  pillChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    marginTop: 6,
  },
  pillChipActive: {
    backgroundColor: "#111827",
  },
  pillText: {
    fontSize: 13,
    color: "#111827",
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
    marginTop: 6,
  },
  slotChipActive: {
    backgroundColor: "#0EA5E9",
    borderColor: "#0EA5E9",
  },
  slotText: {
    fontSize: 12,
    color: "#111827",
  },
  slotTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  playerCountText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 16,
  },
  priceCard: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  priceMain: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  priceSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  bottomButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

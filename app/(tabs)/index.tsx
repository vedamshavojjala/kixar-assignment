// app/(tabs)/index.tsx
// @ts-nocheck
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { turfDetails } from "../../src/data/turfData";

const SPORTS_FILTERS = ["All", "Football", "Cricket", "Badminton", "Tennis"];

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const handleViewDetails = () => {
    router.push("/(tabs)/turf-details");
  };

  // very simple filter: show card only if turf supports that sport
  const showTurf = useMemo(() => {
    if (activeFilter === "All") return true;
    return (turfDetails.sports || []).includes(activeFilter);
  }, [activeFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top banner */}
        <Image
          source={require("../../assets/turf_banner.jpg")}
          style={styles.heroImage}
        />

        {/* Title */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text style={styles.mainTitle}>Book Your Turf</Text>

          {/* Filter chips row */}
          <View style={styles.chipsRow}>
            {SPORTS_FILTERS.map((label) => {
              const active = activeFilter === label;
              return (
                <Pressable
                  key={label}
                  onPress={() => setActiveFilter(label)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text
                    style={[styles.chipText, active && styles.chipTextActive]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Turf card or empty state */}
        {showTurf ? (
          <View style={styles.cardContainer}>
            <Image
              source={require("../../assets/turf_banner.jpg")}
              style={styles.cardImage}
            />

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{turfDetails.name}</Text>

              <Text style={styles.cardSubtitle}>Football · Cricket</Text>

              <Pressable
                style={styles.viewDetailsBtn}
                onPress={handleViewDetails}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <Text style={styles.noResultText}>
              No turfs for "{activeFilter}" right now.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: "#22C55E",
  },
  chipText: {
    color: "#111827",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 8,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  viewDetailsBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 4,
  },
  viewDetailsText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  noResultText: {
    fontSize: 13,
    color: "#6B7280",
  },
});

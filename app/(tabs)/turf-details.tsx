// app/(tabs)/turf-details.tsx
// @ts-nocheck

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { turfDetails } from "../../src/data/turfData";

export default function TurfDetails() {
  const router = useRouter();

  const [showTimings, setShowTimings] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "policies">("about");

  const facilities = turfDetails.facilities || [];
  const sports = turfDetails.sports || [];
  const reviews = turfDetails.reviews || [];
  const timings = turfDetails.timings || [];

  const handleBack = () => {
    router.back();
  };

  const handleBookNow = () => {
    router.push("/(tabs)/booking");
  };

  const handleGetDirection = async () => {
    try {
      const query = encodeURIComponent(turfDetails.address);
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open maps on this device.");
      }
    } catch (e) {
      Alert.alert("Error", "Something went wrong while opening maps.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* HERO IMAGE + TOP ICONS */}
          <View>
            <Image
              source={require("../../assets/turf_banner.jpg")}
              style={styles.heroImage}
            />

            <Pressable style={styles.roundIconLeft} onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color="#000" />
            </Pressable>

            <View style={styles.roundIconRightRow}>
              <Pressable style={styles.roundIcon}>
                <Ionicons name="heart-outline" size={20} color="#000" />
              </Pressable>
              <Pressable style={styles.roundIcon}>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#000"
                />
              </Pressable>
            </View>

            {/* dots */}
            <View style={styles.dotsRow}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[styles.dot, i === 1 && styles.dotActive]}
                />
              ))}
            </View>
          </View>

          {/* CONTENT CARD */}
          <View style={styles.contentWrapper}>
            {/* title + rating */}
            <View style={styles.nameRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.turfName}>{turfDetails.name}</Text>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#22C55E"
                  style={{ marginLeft: 6 }}
                />
              </View>

              <View style={styles.ratingPill}>
                <Text style={styles.ratingValue}>{turfDetails.rating}</Text>
                <Ionicons
                  name="star"
                  size={14}
                  color="#FBBF24"
                  style={{ marginHorizontal: 4 }}
                />
                <Text style={styles.ratingMeta}>
                  | {turfDetails.ratingCount} Ratings
                </Text>
              </View>
            </View>

            {/* address */}
            <View style={styles.addressRow}>
              <Ionicons
                name="location-outline"
                size={18}
                color="#6B7280"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.addressText}>{turfDetails.address}</Text>
            </View>

            {/* get direction + call */}
            <View style={styles.actionRow}>
              <Pressable
                style={styles.directionButton}
                onPress={handleGetDirection}
              >
                <Text style={styles.directionText}>Get Direction</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#000"
                  style={{ marginLeft: 4 }}
                />
              </Pressable>

              <Pressable style={styles.callButton}>
                <Ionicons name="call-outline" size={20} color="#000" />
              </Pressable>
            </View>

            {/* tabs */}
            <View style={styles.tabsRow}>
              <Pressable
                onPress={() => setActiveTab("about")}
                style={[
                  styles.tabChip,
                  activeTab === "about" && styles.tabChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "about" && styles.tabTextActive,
                  ]}
                >
                  About
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab("policies")}
                style={[
                  styles.tabChip,
                  activeTab === "policies" && styles.tabChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "policies" && styles.tabTextActive,
                  ]}
                >
                  Policies
                </Text>
              </Pressable>
            </View>

            {/* about / policies content */}
            {activeTab === "about" ? (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.sectionTitle}>About 'Xciteplay Club</Text>
                <Text style={styles.aboutText}>{turfDetails.about}</Text>
                <Text style={styles.readMoreText}>read more</Text>
              </View>
            ) : (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.sectionTitle}>Policies</Text>
                <Text style={styles.aboutText}>
                  ● Non-marking shoes only on turf.{"\n"}
                  ● Strictly no food or beverages on the playing area.{"\n"}
                  ● Cancellation allowed up to 3 hours before slot.{"\n"}
                  ● Players must arrive 10 minutes before the booked time.
                </Text>
              </View>
            )}

            {/* timings */}
            <View style={styles.sectionBlock}>
              <Pressable
                style={styles.sectionHeaderRow}
                onPress={() => setShowTimings((v) => !v)}
              >
                <Text style={styles.sectionTitle}>Timings Information</Text>
                <Ionicons
                  name={showTimings ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#000"
                />
              </Pressable>

              {showTimings && timings[0] && (
                <View style={styles.timingsBox}>
                  <View style={styles.dayDropdown}>
                    <Text style={styles.dayText}>{timings[0].day}</Text>
                  </View>
                  <View style={styles.timeDropdown}>
                    <Text style={styles.timeText}>{timings[0].time}</Text>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="#6B7280"
                    />
                  </View>
                </View>
              )}
            </View>

            {/* facilities */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Facilities</Text>
              <View style={styles.chipRow}>
                {facilities.map((item) => (
                  <View key={item} style={styles.facilityChip}>
                    <Text style={styles.facilityText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* sports */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Available Sports & Types</Text>
              <View style={styles.chipRow}>
                {sports.map((sport, idx) => (
                  <View
                    key={sport}
                    style={[
                      styles.sportChip,
                      idx === 0 && styles.sportChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sportText,
                        idx === 0 && styles.sportTextActive,
                      ]}
                    >
                      {sport}
                    </Text>
                  </View>
                ))}
              </View>

              <Image
                source={require("../../assets/turf_banner.jpg")}
                style={styles.sportImage}
              />
              <Text style={styles.sportTitle}>Turf – Foot Ball & Cricket</Text>
              <Text style={styles.sportSubtitle}>7v7</Text>
            </View>

            {/* offers */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Offers</Text>
              <View style={styles.offerCard}>
                <Text style={styles.offerCode}>{turfDetails.offer.code}</Text>
                <Text style={styles.offerText}>{turfDetails.offer.text}</Text>
              </View>
            </View>

            {/* ratings & reviews */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

              <View style={styles.bigRatingPill}>
                <Text style={styles.bigRatingValue}>{turfDetails.rating}</Text>
                <Ionicons
                  name="star"
                  size={16}
                  color="#FBBF24"
                  style={{ marginHorizontal: 4 }}
                />
                <Text style={styles.bigRatingMeta}>
                  {turfDetails.ratingCount} Ratings |{" "}
                  {turfDetails.reviewCount} Reviews
                </Text>
              </View>

              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewRow}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitial}>
                      {review.name[0]}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.reviewHeaderRow}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <View style={styles.reviewRatingPill}>
                        <Text style={styles.reviewRatingValue}>
                          {review.rating.toFixed(1)}
                        </Text>
                        <Ionicons
                          name="star"
                          size={12}
                          color="#FBBF24"
                          style={{ marginLeft: 4 }}
                        />
                      </View>
                    </View>
                    <Text style={styles.reviewMeta}>
                      {review.ago} · {review.date}
                    </Text>
                    <Text style={styles.reviewText}>{review.text}</Text>
                  </View>
                </View>
              ))}

              <Text style={styles.readMoreText}>See All Reviews</Text>
            </View>

            {/* Map View – static preview + Get Direction */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Map View</Text>

              <View style={styles.mapContainer}>
                <Image
                  // 🔴 If you rename file to map_view.jpg, change this line:
                  // source={require("../../assets/map_view.jpg")}
                  source={require("../../assets/map_view.jpg.png")}
                  style={styles.mapImage}
                />

                <Pressable
                  style={styles.mapDirectionBtn}
                  onPress={handleGetDirection}
                >
                  <Text style={styles.mapDirectionText}>Get Direction</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* bottom sticky bar */}
        <View style={styles.bottomBar}>
          <View style={styles.discountBanner}>
            <Text style={styles.discountText}>15% OFF</Text>
            <Text style={styles.discountTimer}> ends in 01:50 s</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bottomPrice}>₹ 1200 / 1 hour</Text>
              <Text style={styles.bottomPriceSub}>
                per player cost in next step
              </Text>
            </View>
            <Pressable style={styles.bookNowButton} onPress={handleBookNow}>
              <Text style={styles.bookNowText}>Book Now</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#fff"
                style={{ marginLeft: 4 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 260,
  },
  roundIconLeft: {
    position: "absolute",
    top: 40,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  roundIconRightRow: {
    position: "absolute",
    top: 40,
    right: 18,
    flexDirection: "row",
  },
  roundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  dotsRow: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 3,
  },
  dotActive: {
    width: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
  },
  contentWrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  turfName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  ratingMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  addressRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  directionButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  directionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  callButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  tabChip: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 10,
  },
  tabChipActive: {
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 14,
    color: "#111827",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionBlock: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  aboutText: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 8,
    lineHeight: 20,
  },
  readMoreText: {
    marginTop: 6,
    fontSize: 13,
    color: "#059669",
    fontWeight: "600",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timingsBox: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    padding: 10,
    flexDirection: "row",
  },
  dayDropdown: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 6,
  },
  timeDropdown: {
    flex: 1.4,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
  },
  dayText: {
    fontSize: 13,
    color: "#111827",
  },
  timeText: {
    fontSize: 13,
    color: "#111827",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  facilityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 13,
    color: "#111827",
  },
  sportChip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    marginTop: 10,
  },
  sportChipActive: {
    backgroundColor: "#000",
  },
  sportText: {
    fontSize: 13,
    color: "#111827",
  },
  sportTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  sportImage: {
    width: "100%",
    height: 140,
    borderRadius: 18,
    marginTop: 14,
  },
  sportTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginTop: 10,
  },
  sportSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  offerCard: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#E0F2F1",
    padding: 14,
  },
  offerCode: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F766E",
    marginBottom: 4,
  },
  offerText: {
    fontSize: 13,
    color: "#0F766E",
  },
  bigRatingPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F9FAFB",
    marginTop: 12,
    marginBottom: 10,
  },
  bigRatingValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  bigRatingMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  reviewRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  reviewRatingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#F9FAFB",
  },
  reviewRatingValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  reviewMeta: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 19,
  },
  mapContainer: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
    position: "relative",
    backgroundColor: "#ddd",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapDirectionBtn: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  mapDirectionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  discountBanner: {
    borderRadius: 10,
    backgroundColor: "#DCFCE7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
  },
  discountTimer: {
    fontSize: 12,
    color: "#166534",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  bottomPriceSub: {
    fontSize: 11,
    color: "#6B7280",
  },
  bookNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 999,
    marginLeft: 10,
  },
  bookNowText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});

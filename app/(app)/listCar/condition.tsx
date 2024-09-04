import React from "react";
import { View, TouchableOpacity, ScrollView, Platform } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ArrowRight2 } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

export default function Condition() {
  return (
    <>
      <HeaderListing progress={1 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex   bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <ScrollView className="flex pb-[80px] relative px-[16px]">
          <View
            style={{
              paddingTop: 30,
              paddingBottom: Platform.OS === "android" ? 80 : 120,
            }}
            className="flex"
          >
            <View className="flex items-start gap-[12px]">
              <ThemedText
                className="text-[#101828] text-[20px]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
              >
                Condition
              </ThemedText>
              <ThemedText
                className="text-[#344054] text-[16px]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}
              >
                What is the condition of your car?
              </ThemedText>
            </View>

            <Image
              source={require("@/assets/car.png")}
              style={{
                width: 120,
                height: 120,
                alignSelf: "center",
                marginVertical: 30,
              }}
            />

            <View className="flex gap-[12px]">
              <TouchableOpacity
                className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
                style={{
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 16,
                }}
              >
                <View className="flex flex-row w-full justify-between">
                  <ThemedText
                    className="text-[16px] text-[#1D2939]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  >
                    New
                  </ThemedText>
                  <ArrowRight2 size="16" color="#1D2939" />
                </View>
                <ThemedText
                  className="text-[14px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Select if your car is unregistered and brand new.
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
                style={{
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 16,
                }}
              >
                <View className="flex flex-row w-full justify-between">
                  <ThemedText
                    className="text-[16px] text-[#1D2939]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  >
                    Used
                  </ThemedText>
                  <ArrowRight2 size="16" color="#1D2939" />
                </View>
                <ThemedText
                  className="text-[14px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Select if your car has been used before.
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
                style={{
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 16,
                }}
              >
                <View className="flex flex-row w-full justify-between">
                  <ThemedText
                    className="text-[16px] text-[#1D2939]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  >
                    Reconditioned
                  </ThemedText>
                  <ArrowRight2 size="16" color="#1D2939" />
                </View>
                <ThemedText
                  className="text-[14px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Select if your car is used but currently unregistered.
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingBottom: 20,
          }}
          className="px-[16px]"
        >
          <TouchableOpacity
            onPress={() => {
              router.navigate("./brand");
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[10px]`}
          >
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

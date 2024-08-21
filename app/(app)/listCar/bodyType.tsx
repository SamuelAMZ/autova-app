import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ArrowRight2 } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function BodyType() {
  return (
    <>
      <HeaderListing progress={9/14}>
        <View className="flex flex-row w-full justify-between items-center mt-[15px]">
          <View className="flex flex-row gap-[12px] items-center">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
              style={{ backgroundColor: "#c1c1c1" }}
            >
              <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              List Your Car
            </ThemedText>
          </View>
          <TouchableOpacity
            className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
            style={{ backgroundColor: "#c1c1c1" }}
          >
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </HeaderListing>
      <View
        className="flex   bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <ScrollView className="px-[16px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Body Type
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              What is the body type of your car?
            </ThemedText>
          </View>

          <Image
            source={require("@/assets/car.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginVertical: 40,
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
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Salon
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Hatchback
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Convertible
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  SUV/8X8
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Coupe/Sports
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Attest
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F4F7] rounded-[8px] gap-[16px] py-[16px] px-[12px]"
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
              }}
            >
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  MPV
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
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
              router.navigate("./registration");
            }}
            className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]"
          >
            <ThemedText
              className="text-[17px] text-center font-[600] text-[#fff]"
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

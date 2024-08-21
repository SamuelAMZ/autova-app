import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

export default function Contact() {
  return (
    <>
      <HeaderListing progress={1}>
        <View className="flex flex-row w-full justify-between items-center mt-[15px]">
          <View className="flex flex-row gap-[12px] items-center">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
              style={{ backgroundColor: "#c1c1c1" }}>
              <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              List Your Car
            </ThemedText>
          </View>
          <TouchableOpacity
            className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
            style={{ backgroundColor: "#c1c1c1" }}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </HeaderListing>
      <View
        className="flex  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30 }}>
        <ScrollView className="w-full px-[16px] ">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Contact Details
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[15px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              How you would like to contact the customer?
            </ThemedText>
          </View>

          <View className="flex gap-[6px] items-start my-[30px]">
            <View className="flex gap-[12px]">
              <ThemedText
                className="text-[15px] text-[#667085]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Name
              </ThemedText>
              <ThemedText
                className="text-[#101828] text-[17px]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Omer Hassan
              </ThemedText>
            </View>
            <View className="flex gap-[12px]">
              <ThemedText
                className="text-[15px] text-[#667085]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Email
              </ThemedText>
              <ThemedText
                className="text-[#101828] text-[17px]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                omar@carnextplus.com
              </ThemedText>
            </View>
          </View>

          <View className="flex gap-[12px] mb-[80px]">
            <TouchableOpacity className="border border-[#D8DADC] p-[20px] flex-row items-center justify-start gap-[12px] rounded-[12px]">
              <Image
                source={require("@/assets/logos_whatsapp-icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <ThemedText
                className="text-[16px] font-[600] text-center"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Enter WhatsApp number
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="border border-[#D8DADC] p-[20px] flex-row items-center justify-start gap-[12px] rounded-[12px]">
              <Image
                source={require("@/assets/logos_telegram.png")}
                style={{ width: 20, height: 20 }}
              />
              <ThemedText
                className="text-[16px] font-[600]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Enter Telegram number
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity className="border border-[#D8DADC] p-[20px] flex-row items-center justify-start gap-[12px] rounded-[12px]">
              <Image
                source={require("@/assets/ion_call.png")}
                style={{ width: 20, height: 20 }}
              />
              <ThemedText
                className="text-[16px] font-[600]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Enter phone number
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="flex gap-[19px] px-[16px]">
          <TouchableOpacity
            onPress={() => {}}
            className={`bg-[#7878801F] border border-[${Colors.background}] px-[20px] py-[12px] rounded-[12px] w-[100%] `}>
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.background}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Review
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.navigate("./submitted");
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[12px] rounded-[12px] w-[100%] mb-[80px]`}>
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

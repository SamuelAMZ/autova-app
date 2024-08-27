import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

export default function Engine() {
  return (
    <>
      <HeaderListing progress={6 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View>
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Engine
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              Enter the engine capacity of your car
            </ThemedText>
          </View>

          <Image
            source={require("@/assets/engine.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginVertical: 30,
            }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            // style={{ flex: 1 }}
            keyboardVerticalOffset={110}
          >
            <View className="flex-row items-center bg-[#7878801F] border border-[#D0D5DD] rounded-[12px] ">
              <TextInput
                className="flex-1 py-[12px] px-[20px]"
                placeholder="Enter engine capacity"
                placeholderTextColor="#1D2939"
              />
              <View className="h-full w-[1px] bg-[#D0D5DD]" />
              <View className="p-[12px]">
                <ThemedText
                  className="text-[17px]  font-[700] text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                >
                  CC
                </ThemedText>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>

        <View
          style={{
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.navigate("./fuel");
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]`}
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

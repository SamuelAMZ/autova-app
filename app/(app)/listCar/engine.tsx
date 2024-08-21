import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function Engine() {
  return (
    <>
      <HeaderListing progress={6/14}>
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

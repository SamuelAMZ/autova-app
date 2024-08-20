import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Notification, Gps } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";

const ListingPage = () => {
  return (
    <>
      <CustomHeader />
      <View className="flex-1 items-center px-[16px] py-[30px] gap-[30px] justify-center bg-[#fff]">
        <Image
          source={require("@/assets/empty.png")}
          style={{ width: 200, height: 200 }}
        />
        <View className="flex gap-[24px] ">
          <ThemedText
            className="text-[#101828] text-[20px] text-center"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            You don’t have any listing yet!
          </ThemedText>
          <ThemedText
            className="text-[#344054] text-center text-[14px]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
          >
            We make it easy to reach millions of potential buyers. Start your
            free listing by providing your location below:
          </ThemedText>
          <View className="flex gap-[16px] relative">
            <Gps
              size="24"
              color="#1D2939"
              style={{
                position: "absolute",
                right: 20,
                top: Platform.OS === "android" ? 15 : 10,
              }}
            />
            <TextInput
              className="bg-[#7878801F] relative border border-[#5856D6] py-[12px] px-[20px] rounded-[12px]"
              placeholder="Enter ZIP code"
              placeholderTextColor="#1D2939"
            />
            <TouchableOpacity
              onPress={() => {
                router.navigate("/(app)/listCar/condition");
              }}
              className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%]"
            >
              <ThemedText
                className="text-[17px] text-center font-[600] text-[#fff]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
              >
                Start your listing
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ListingPage;

function CustomHeader() {
  return (
    <>
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Listing
          </ThemedText>
          <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
            <Notification color="white" size={20} />
          </View>
        </View>
      </Header>
    </>
  );
}

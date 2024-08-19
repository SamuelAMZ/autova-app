import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import {
  Notification,
  Gps,
  ArrowLeft,
  ArrowRight2,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import CarItem from "@/components/cars/CarItem.android";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function Condition() {
  return (
    <>
      <HeaderListing>
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
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
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
      <ScrollView
        className="flex px-[16px]  bg-[#fff]"
        style={{ paddingVertical: 30 }}
      >
        <View className="flex pb-[80px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Condition
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
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
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  New
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
              <ThemedText
                className="text-[14px] text-[#1D2939]"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
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
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Used
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
              <ThemedText
                className="text-[14px] text-[#1D2939]"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
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
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Reconditioned
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
              <ThemedText
                className="text-[14px] text-[#1D2939]"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
              >
                Select if your car is used but currently unregistered.
              </ThemedText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.navigate("./brand");
            }}
            className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]"
          >
            <ThemedText
              className="text-[17px] text-center font-[600] text-[#fff]"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

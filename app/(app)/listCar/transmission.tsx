import React, { useState } from "react";
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
  SearchNormal1,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import CarItem from "@/components/CarItem";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import BrandItem from "@/components/BrandItem";
import { modelData } from "@/constants/data";

export default function Transmission() {
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
              style={{ backgroundColor: "#c1c1c1" }}>
              <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "Poppins_600SemiBold" }}>
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
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}>
        <View>
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "Poppins_600SemiBold" }}>
              Transmission
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "Poppins_500Medium" }}>
              Enter the transmission type of your car
            </ThemedText>
          </View>

          <Image
            source={require("@/assets/transmission-square.png")}
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
              }}>
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "Poppins_600SemiBold" }}>
                  Manual
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
              }}>
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "Poppins_600SemiBold" }}>
                  Automatic
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
              }}>
              <View className="flex flex-row w-full justify-between items-center">
                <ThemedText
                  className="text-[16px] text-[#1D2939]"
                  style={{ fontFamily: "Poppins_600SemiBold" }}>
                  Others
                </ThemedText>
                <ArrowRight2 size="16" color="#1D2939" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./bodyType");
          }}
          className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]">
          <ThemedText
            className="text-[17px] text-center font-[600] text-[#fff]"
            style={{ fontFamily: "Poppins_600SemiBold" }}>
            Continue
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}

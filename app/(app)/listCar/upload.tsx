import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Keyboard,
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

export default function Upload() {
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
      <ScrollView
        className="flex px-[16px]  bg-[#fff]"
        style={{ paddingVertical: 30 }}>
        <View className="flex pb-[80px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "Poppins_600SemiBold" }}>
              Image/Video
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "Poppins_500Medium" }}>
              Upload the Image/Videos of your car
            </ThemedText>
          </View>

         
          <TouchableOpacity
            onPress={() => {
              router.navigate("./contact");
            }}
            className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]">
            <ThemedText
              className="text-[17px] text-center font-[600] text-[#fff]"
              style={{ fontFamily: "Poppins_600SemiBold" }}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

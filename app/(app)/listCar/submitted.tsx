import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import {
  Notification,
  Gps,
  ArrowLeft,
  ArrowRight2,
  SearchNormal1,
  ArrowDown2,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import CarItem from "@/components/CarItem";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import BrandItem from "@/components/BrandItem";
import { modelData } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";

export default function Submitted() {
  return (
    <View className="flex-1 items-center px-[16px] py-[30px] gap-[30px] justify-between bg-[#fff]">
      <View className="mt-[80px]">
        <Image
          source={require("@/assets/submit.png")}
          style={{ width: 350, height: 350 }}
        />
        <View className="flex gap-[10px] ">
          <ThemedText
            className="text-[#101828] text-[20px] text-center"
            style={{ fontFamily: "Poppins_600SemiBold" }}>
            Listing Submitted for Review!
          </ThemedText>
          <ThemedText className="text-[#344054] text-center text-[15px]">
            Thank you for submitting your listing! We’re currently reviewing it,
            and you’ll be notified as soon as it’s approved.
          </ThemedText>
        </View>
      </View>

      <View className="flex gap-[16px] relative w-full">
        <TouchableOpacity
          onPress={() => {
            router.navigate("/(app)/listCar/condition");
          }}
          className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%]">
          <ThemedText
            className="text-[17px] text-center font-[600] text-[#fff]"
            style={{ fontFamily: "Poppins_600SemiBold" }}>
            Return Home
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

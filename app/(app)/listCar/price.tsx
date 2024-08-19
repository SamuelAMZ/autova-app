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

function MyCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}>
      {checked && <Ionicons name="checkmark" size={20} color="white"  />}
    </Pressable>
  );
}

export default function Price() {
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
             Price
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "Poppins_500Medium" }}>
              What is the price of your car
            </ThemedText>
          </View>

          <Image
            source={require("@/assets/money.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginVertical: 30,
            }}
          />
          <View className="flex gap-[12px]">
            <View className="flex-row items-center bg-[#7878801F] border border-[#D0D5DD] rounded-[12px] ">
              <View className="p-[12px] flex flex-row gap-[12px] items-center">
                <ThemedText
                  className="text-[15px]  font-[700] text-[#101828]"
                  style={{ fontFamily: "Poppins_700Bold" }}>
                  USD
                </ThemedText>
                <ArrowDown2 size="20" color="#000" />
              </View>
              <View className="h-full w-[1px] bg-[#D0D5DD]" />
              <TextInput
                className="flex-1 py-[12px] px-[20px]"
                placeholder="1000"
                placeholderTextColor="#98A2B3"
                keyboardType="decimal-pad"
              />
            </View>
            <View className="flex flex-row gap-[8px] items-center">
              <MyCheckbox />
              <ThemedText className="text-[#344054] text-[16px]" style={{ fontFamily: "Poppins_500Medium" }}>Negotiable</ThemedText>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./upload");
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

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#344054",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#344054",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
 
});

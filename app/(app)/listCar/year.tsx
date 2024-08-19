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
import CarItem from "@/components/cars/CarItem.android";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import BrandItem from "@/components/BrandItem";
import { modelData } from "@/constants/data";

export default function YearProduction() {
  const currentYear = new Date().getFullYear();
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);

  const handleSelect = (degree: number) => {
    setSelectedDegree(degree);
  };

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
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View className="flex items-start gap-[12px]">
          <ThemedText
            className="text-[#101828] text-[20px]"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Production Year
          </ThemedText>
          <ThemedText
            className="text-[#344054] text-[16px]"
            style={{ fontFamily: "PlusJakartaSans_500Medium" }}
          >
            Select the year of production for your car
          </ThemedText>
        </View>
        <Image
          source={require("@/assets/calander.png")}
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginVertical: 50,
          }}
        />
        <ScrollView className="flex pb-[80px] relative">
          <View className="flex gap-[20px]">
            <View className="">
              {Array.from(
                { length: 2026 - 1950 + 1 },
                (_, index) => currentYear - index
              ).map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSelect(item)}
                  className="flex items-center border-b border-[#EAECF0] flex-row w-full gap-[12px] justify-center "
                >
                  <ThemedText className="py-[16px] text-[#101828] text-[14px]">
                    {item}
                  </ThemedText>
                  {selectedDegree === item && (
                    <AntDesign name="check" size={20} color="#5856D6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./mileage");
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
    </>
  );
}

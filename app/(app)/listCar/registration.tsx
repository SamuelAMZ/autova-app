import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

export default function Registration() {
  const currentYear = new Date().getFullYear();
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);

  const handleSelect = (degree: number) => {
    setSelectedDegree(degree);
  };

  return (
    <>
      <HeaderListing progress={10 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View className="flex items-start gap-[12px]">
          <ThemedText
            className="text-[#101828] text-[20px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Registration Year
          </ThemedText>
          <ThemedText
            className="text-[#344054] text-[16px]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
          >
            Select the year of Registration for your car
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
                { length: currentYear + 1 - 1990 + 1 },
                (_, index) => currentYear + 1 - index
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
                    <AntDesign
                      name="check"
                      size={20}
                      color={Colors.background}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.navigate("./description");
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[10px]`}
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

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { SearchNormal1 } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import { modelData } from "@/constants/data";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

export default function Model() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  return (
    <>
      <HeaderListing progress={3 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex   bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <ScrollView className="flex pb-[80px] relative px-[16px]">
          <View className="flex items-start gap-[12px] mb-[30px] ">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Model
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              Select the model for your car
            </ThemedText>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
            keyboardVerticalOffset={110}
          >
            <View className="relative flex-1 flex-row  items-center justify-between bg-[#7878801F] border border-[#D0D5DD]  pl-[20px] pr-[12px] rounded-[12px] mb-[30px]">
              <TextInput
                className=" w-full py-[13px]"
                placeholder="Search a model"
                placeholderTextColor="#1D2939"
              />
              <View style={{ position: "absolute", top: "0", right: 13 }}>
                <SearchNormal1 size="20" color="#000" />
              </View>
            </View>
          </KeyboardAvoidingView>

          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px]  font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              All Model
            </ThemedText>

            <View className="">
              {modelData.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => handleSelect(item.name)}
                  className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between"
                >
                  <ThemedText className="py-[16px] text-[#101828] text-[14px]">
                    {item.name}
                  </ThemedText>
                  {selectedDegree === item.name && (
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
          className="px-[16px]"
        >
          <TouchableOpacity
            onPress={() => {
              router.navigate("./year");
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

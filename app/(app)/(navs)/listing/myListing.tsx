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
import { Notification, Gps } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import CarItem from "@/components/CarItem";

export default function MyListing() {
  return (
    <>
      <Header>
        <View className="flex flex-row justify-between w-full items-center">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}>
            Listing
          </ThemedText>
          <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
            <Notification color="white" size={20} />
          </View>
        </View>
      </Header>
      <ScrollView className="flex-1 px-[16px] py-[30px]  ">
        <View className="flex  justify-center gap-[30px]">
          <View className="bg-[#F9FAFB] p-[16px] rounded-[16px] drop-shadow-md  w-full gap-[16px]">
            <ThemedText
              className="text-[18px] text-[#101828]"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}>
              List cars for free
            </ThemedText>
            <View className="flex gap-[16px] relative">
              <Gps
                size="24"
                color="#1D2939"
                style={{ position: "absolute", right: 20, top: 15 }}
              />
              <TextInput
                className="bg-[#7878801F] relative border border-[#5856D6] py-[12px] px-[20px] rounded-[12px]"
                placeholder="Enter ZIP code"
                placeholderTextColor="#1D2939"
              />
              <TouchableOpacity onPress={() => { router.navigate('../../condition')}} className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%]">
                <ThemedText
                  className="text-[17px] text-center font-[600] text-[#fff]"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}>
                  Continue
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex items-start justify-start gap-[20px] w-full pb-[80px]">
            <ThemedText className="text-[20px] text-[#101828] " style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}>My Listings</ThemedText>
            <FlatList
              className="w-full"
              data={[{}, {}, {}]}
              renderItem={({ index, item }) => <CarItem />}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

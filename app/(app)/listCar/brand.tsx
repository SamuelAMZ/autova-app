import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { SearchNormal1 } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import BrandItem from "@/components/BrandItem";
import { carsData } from "@/constants/data";
import { HorizontalSeperator } from "@/components/Separator";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

export default function Brand() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  return (
    <>
      <HeaderListing progress={2 / 14}>
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
              Brand
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              Select a brand for your car
            </ThemedText>
          </View>
          <View className="relative">
            <SearchNormal1
              size="20"
              color="#000"
              style={{ position: "absolute", right: 20, top: 15 }}
            />
            <TextInput
              className="bg-[#7878801F] relative border border-[#D0D5DD] py-[12px] px-[20px] rounded-[12px] mb-[30px]"
              placeholder="Search a brand"
              placeholderTextColor="#1D2939"
            />
          </View>

          <View className="flex gap-[20px] mb-[30px]">
            <ThemedText
              className="text-[17px]  font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Popular Brand
            </ThemedText>
            <FlatList
              className=""
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Array.from({ length: 12 })}
              renderItem={({ item }) => (
                <BrandItem size={70} onPress={() => {}} />
              )}
              ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
            />
          </View>
          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px]  font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Popular Brand
            </ThemedText>

            <View className="">
              {carsData.map((item) => (
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
              router.navigate("./Model");
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

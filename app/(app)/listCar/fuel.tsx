import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fuel } from "@/constants/data";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { loadFuelTypes } from "@/utils/fuelTypesRequest";
import { useQuery } from "@tanstack/react-query";
import { useProduct } from "@/context/carContext";
import { useTranslation } from "react-i18next";

export default function Fuel() {
  const { t } = useTranslation();
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ fuelType: selectedDegree });
    router.navigate("./transmission");
  };

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const fuelQuery = useQuery({
    queryKey: ["fuels"],
    queryFn: loadFuelTypes,
  });

  return (
    <>
      <HeaderListing progress={7 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px] bg-[#fff] justify-between h-[90%]"
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View className="flex items-start gap-[12px]">
          <ThemedText
            className="text-[#101828] text-[20px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            {t("screens.fuelType.title")}
          </ThemedText>
          <ThemedText
            className="text-[#344054] text-[16px]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
          >
            {t("screens.fuelType.subtitle")}
          </ThemedText>
        </View>
        <Image
          source={require("@/assets/fuel.png")}
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
              {fuelQuery?.data?.data.map((item: { name: string }) => (
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
        >
          <TouchableOpacity
            onPress={handleBrandSelect}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[10px]`}
          >
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.fuelType.continue")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

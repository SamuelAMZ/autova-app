import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ArrowRight2 } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { useProduct } from "@/context/carContext";
import { AntDesign } from "@expo/vector-icons";
import { loadTransmissions } from "@/utils/transmissionsRequest";
import { useQuery } from "react-query";

export default function Transmission() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ transmission: selectedDegree });
    router.navigate("./cylinders");
  };

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const transmissionQuery = useQuery({
    queryKey: ["brands"],
    queryFn: loadTransmissions,
  });

  return (
    <>
      <HeaderListing progress={8 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View>
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Transmission
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
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
          <ScrollView className="flex pb-[80px] relative">
            <View className="flex gap-[20px]">
              <View className="">
                {transmissionQuery?.data?.data.map((item: { name: string }) => (
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
        </View>

        <View
          style={{
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleBrandSelect}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]`}
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

import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { useProduct } from "@/context/carContext";

export default function Name() {
  const [name, setName] = useState("");
  const { updateProductData, productData } = useProduct();
  console.log(productData);

  const handleBrandSelect = () => {
    updateProductData({ name: name });
    router.navigate("./brand");
  };

  const { isKeyboardVisible } = useKeyboardState();
  return (
    <>
      <HeaderListing progress={1 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}>
        <View className="flex-1 gap-[30px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Name
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              Enter the name of your car
            </ThemedText>
          </View>

          {isKeyboardVisible ? (
            ""
          ) : (
            <Image
              source={require("@/assets/car.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
          )}

          <View className="flex-row items-center bg-[#7878801F] border border-[#D0D5DD] rounded-[12px] ">
            <TextInput
              className="flex-1 py-[12px] px-[20px]"
              placeholder="Enter name"
              placeholderTextColor="#1D2939"
              keyboardType="default"
              onChangeText={setName}
            />            
          </View>
        </View>

        <View
          style={{
            paddingBottom: 20,
          }}>
          <TouchableOpacity
            onPress={handleBrandSelect}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]`}>
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { useProduct } from "@/context/carContext";
import { useQuery } from "react-query";
import { loadEngineTypes } from "@/utils/engineTypesRequest";
import { AntDesign } from "@expo/vector-icons";

export default function Engine() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const { isKeyboardVisible } = useKeyboardState();
  const [engine, setEngine] = useState("");

  const { updateProductData, productData } = useProduct();

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const engineQuery = useQuery({
    queryKey: ["fuels"],
    queryFn: loadEngineTypes,
  });

  const handleBrandSelect = () => {
    updateProductData({ engineType: selectedDegree });
    router.navigate("./fuel");
  };

  return (
    <>
      <HeaderListing progress={6 / 14}>
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
              Engine
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              Enter the engine capacity of your car
            </ThemedText>
          </View>

          {isKeyboardVisible ? (
            ""
          ) : (
            <Image
              source={require("@/assets/engine.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
          )}

          <ScrollView className="flex pb-[80px] relative">
            <View className="flex gap-[20px]">
              <View className="">
                {engineQuery?.data?.data.map((item: { name: string }) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => handleSelect(item.name)}
                    className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between">
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

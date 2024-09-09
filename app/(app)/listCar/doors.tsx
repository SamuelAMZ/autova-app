import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Keyboard,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { ArrowDown2 } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useProduct } from "@/context/carContext";
import { carDoorsElements } from "@/constants/searchTypes";

export function MyCheckbox({
  onPress,
}: {
  onPress?: (value: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => {
        setChecked(!checked);
        onPress && onPress(!checked);
      }}>
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}

export default function Doors() {
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ doorsCount: selectedCurrency });
    router.navigate("/(app)/listCar/price");
  };

  const { isKeyboardVisible } = useKeyboardState();

  return (
    <>
      <HeaderListing progress={12 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View className="flex-1 px-[16px] justify-between  bg-[#fff] h-[100%] ">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          className="flex-1">
          <View
            className="flex bg-[#fff] justify-between h-[80%] "
            style={{ paddingTop: 30, paddingBottom: 60 }}>
            <View className="flex-1 gap-[30px]">
              <View className="flex items-start gap-[12px]">
                <ThemedText
                  className="text-[#101828] text-[20px]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                  Doors
                </ThemedText>
                <ThemedText
                  className="text-[#344054] text-[16px]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                  how many doors does your car have
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
              <View className="flex gap-[12px]">
                <View className="flex-row h-[50%] w-full justify-between items-center px-3">
                  {carDoorsElements.map((item: number) => (
                    <TouchableOpacity
                      onPress={() => setSelectedCurrency(item)}
                      key={item}
                      style={{
                        backgroundColor:
                          selectedCurrency == item ? "#5856D6" : undefined,
                      }}
                      className="h-[30] w-[30] border border-[#D0D5DD] rounded-3xl justify-center items-center">
                      <ThemedText
                        style={{
                          color: selectedCurrency == item ? "white" : "#344054",
                          fontFamily: "SpaceGrotesk_600SemiBold",
                        }}>
                        {item}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            paddingBottom: 40,
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

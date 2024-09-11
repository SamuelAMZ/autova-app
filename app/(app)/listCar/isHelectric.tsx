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

export function MyCheckbox({
  onPress,
  setHelectric,
  Helectric,
}: {
  onPress?: (value: boolean) => void;
  setHelectric: any;
  Helectric: any;
}) {
  return (
    <Pressable
      style={[styles.checkboxBase, Helectric && styles.checkboxChecked]}
      onPress={() => {
        setHelectric(!Helectric);
        onPress && onPress(!Helectric);
      }}>
      {Helectric && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}

export default function IsHelectric() {
  const [isHelectric, setHelectric] = useState(false);
  const [isHybrid, setHybrid] = useState(false);

  const { updateProductData, productData } = useProduct();
  const handleBrandSelect = () => {
    console.log(isHelectric, isHybrid);

    updateProductData({ isHelectric: isHelectric, isHybrid: isHybrid });
    router.navigate("/(app)/listCar/upload");
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
                  Hybrid | Helectric
                </ThemedText>
                <ThemedText
                  className="text-[#344054] text-[16px]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                  What is the type of your car
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
                <View className="flex flex-row gap-[8px] items-center">
                  <MyCheckbox
                    setHelectric={setHelectric}
                    Helectric={isHelectric}
                  />
                  <ThemedText
                    className="text-[#344054] text-[16px]"
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                    is Helectric ?
                  </ThemedText>
                </View>
                <View className="flex flex-row gap-[8px] items-center">
                  <MyCheckbox setHelectric={setHybrid} Helectric={isHybrid} />
                  <ThemedText
                    className="text-[#344054] text-[16px]"
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                    is Hybrid ?
                  </ThemedText>
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

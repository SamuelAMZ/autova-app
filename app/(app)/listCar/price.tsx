import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { ArrowDown2 } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

function MyCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}
    >
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}

export default function Price() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const currencies = ["USD", "EUR"];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <>
      <HeaderListing progress={12/14}>
        <View className="flex flex-row w-full justify-between items-center mt-[15px]">
          <View className="flex flex-row gap-[12px] items-center">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
              style={{ backgroundColor: "#c1c1c1" }}
            >
              <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              List Your Car
            </ThemedText>
          </View>
          <TouchableOpacity
            className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
            style={{ backgroundColor: "#c1c1c1" }}
          >
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
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
              Price
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              What is the price of your car
            </ThemedText>
          </View>
          <Image
            source={require("@/assets/money.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginVertical: 30,
            }}
          />
          <View className="flex gap-[12px]">
            <View className="flex-row items-center bg-[#7878801F] border border-[#D0D5DD] rounded-[12px] ">
              <TouchableOpacity
                onPress={toggleDropdown}
                className="p-[12px] flex flex-row gap-[12px] items-center"
              >
                <ThemedText
                  className="text-[15px]  font-[700] text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                >
                  {selectedCurrency}
                </ThemedText>
                <ArrowDown2 size="20" color="#000" />
              </TouchableOpacity>
              <View className="h-full w-[1px] bg-[#D0D5DD]" />
              <TextInput
                className="flex-1 py-[12px] px-[20px]"
                placeholder="1000"
                placeholderTextColor="#98A2B3"
                keyboardType="decimal-pad"
              />
            </View>
            {isDropdownVisible && (
              <View className="bg-white border border-[#D0D5DD] rounded-[12px]  ">
                <FlatList
                  data={currencies}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-[12px]"
                      onPress={() => handleCurrencySelect(item)}
                    >
                      <ThemedText
                        className="text-[15px] font-[500] text-[#101828]"
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        {item}
                      </ThemedText>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            )}
            <View className="flex flex-row gap-[8px] items-center">
              <MyCheckbox />
              <ThemedText
                className="text-[#344054] text-[16px]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}
              >
                Negotiable
              </ThemedText>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.navigate("./upload");
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]`}
          >
            <ThemedText
              className="text-[17px] text-center font-[600] text-[#fff]"
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

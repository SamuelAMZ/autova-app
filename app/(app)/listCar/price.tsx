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
import { useTranslation } from "react-i18next";
export function MyCheckbox({
  onPress,
  checked,
  setChecked,
}: {
  onPress?: (value: boolean) => void;
  checked: any;
  setChecked: any;
}) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => {
        setChecked(!checked);
        onPress && onPress(!checked);
      }}
    >
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}

export default function Price() {
  const { t } = useTranslation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ price: price });
    router.navigate("/(app)/listCar/description");
  };

  const { isKeyboardVisible } = useKeyboardState();

  const currencies = ["USD", "EUR", "XOF"];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <>
      <HeaderListing progress={12 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View className="flex-1 px-[16px] justify-between bg-[#fff] h-[100%]">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          className="flex-1"
        >
          <View
            className="flex bg-[#fff] justify-between h-[80%]"
            style={{ paddingTop: 30, paddingBottom: 60 }}
          >
            <View className="flex-1 gap-[30px]">
              <View className="flex items-start gap-[12px]">
                <ThemedText
                  className="text-[#101828] text-[20px]"
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  {t("screens.price.title")}
                </ThemedText>
                <ThemedText
                  className="text-[#344054] text-[16px]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  {t("screens.price.subtitle")}
                </ThemedText>
              </View>
              {isKeyboardVisible ? (
                ""
              ) : (
                <Image
                  source={require("@/assets/money.png")}
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                  }}
                />
              )}
              <View className="flex gap-[12px]">
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View className="flex-row items-center bg-[#7878801F] border border-[#D0D5DD] rounded-[12px]">
                    <TouchableOpacity
                      onPress={toggleDropdown}
                      className="p-[12px] flex flex-row gap-[12px] items-center"
                    >
                      <ThemedText
                        className="text-[15px] font-[700] text-[#101828]"
                        style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                      >
                        {selectedCurrency}
                      </ThemedText>
                      <ArrowDown2 size="20" color="#000" />
                    </TouchableOpacity>
                    <View className="h-full w-[1px] bg-[#D0D5DD]" />
                    <TextInput
                      className="flex-1 py-[12px] px-[20px]"
                      placeholder={t("screens.price.placeholder")}
                      placeholderTextColor="#98A2B3"
                      keyboardType="decimal-pad"
                      onChangeText={(e) => {
                        setPrice(Number(e));
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
                {isDropdownVisible && (
                  <View className="bg-white border border-[#D0D5DD] rounded-[12px]">
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
                  <MyCheckbox checked={checked} setChecked={setChecked} />
                  <ThemedText
                    className="text-[#344054] text-[16px]"
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                  >
                    {t("screens.price.negotiable")}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            paddingBottom: 40,
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
              {t("screens.price.continue")}
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

import React from "react";
import { View, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export default function Submitted() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center px-[16px] py-[30px] gap-[30px] justify-between bg-[#fff]">
      <View className="mt-[80px]">
        <Image
          source={require("@/assets/submit.png")}
          style={{ width: 350, height: 350 }}
        />
        <View className="flex gap-[10px]">
          <ThemedText
            className="text-[#101828] text-[20px] text-center"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            {t("screens.submitted.title")}
          </ThemedText>
          <ThemedText className="text-[#344054] text-center text-[15px]">
            {t("screens.submitted.message")}
          </ThemedText>
        </View>
      </View>

      <View
        style={{
          paddingBottom: 20,
        }}
        className="flex gap-[16px] relative w-full"
      >
        <TouchableOpacity
          onPress={() => {
            router.navigate("/(app)/listCar/condition");
          }}
          className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%]`}
        >
          <ThemedText
            className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            {t("screens.submitted.returnHome")}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

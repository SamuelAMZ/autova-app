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
import {
  ArrowDown2,
  ArrowLeft,
  ArrowRight2,
  InfoCircle,
  Setting2,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import HeaderSetting from "@/components/HeaderSetting";
import { LogoutModal } from "@/components/LogoutModal";
import useStatusBar from "@/hooks/useStatusBar";

export default function Settings() {
  const [isLogout, setIsLogout] = useState(false);

  useStatusBar("dark", "#fff", false);


  const handleLogout = async () => {
    setIsLogout(!isLogout);
  };

  return (
    <>
      <CustomHeader />
      <View className="flex bg-[#fff] h-[100%] justify-between px-[16px] pb-[160px]">
        <View className="flex flex-col gap-[1.25rem]">
          <ThemedText
            className="text-[1.25rem]  text-[#101828]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
            Security
          </ThemedText>
          <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
            <View className="px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
              <View className="flex items-center flex-row gap-[0.5rem]">
                <Image
                  source={require("@/assets/code.png")}
                  style={{ width: 30, height: 30 }}
                />
                <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                  Change Passcode
                </ThemedText>
              </View>
              <ArrowRight2 size="24" color="#667085" />
            </View>
            <TouchableOpacity>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <Image
                    source={require("@/assets/finger.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    Enable Face ID
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <Image
                    source={require("@/assets/printer.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    Enable Touch ID
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} className="border border-[#FF4747]  rounded-[50px] flex items-center">
          <ThemedText
            className="text-[1rem] text-[#FF4747] py-[1rem]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
            Log Out
          </ThemedText>
        </TouchableOpacity>
      </View>
      <LogoutModal visible={isLogout} onClose={handleLogout} /> 
    </>
  );
}

function CustomHeader() {
  return (
    <>
      <HeaderSetting>
        <View className="flex flex-row justify-between w-full items-center px-[16px] py-[22px]">
          <ArrowLeft
            size="24"
            color="#101828"
            onPress={() => {
              router.back();
            }}
          />
          <ThemedText
            className="text-[#101828] text-[24px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
            Settings
          </ThemedText>
          <InfoCircle size="24" color="#101828" />
        </View>
      </HeaderSetting>
    </>
  );
}

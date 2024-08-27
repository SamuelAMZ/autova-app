import React, { useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import {
  ArrangeHorizontal,
  ArrowLeft,
  ArrowRight2,
  InfoCircle,
  Setting2,
  Trash,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderSetting from "@/components/HeaderSetting";
import { LogoutModal } from "@/components/LogoutModal";
import useStatusBar from "@/hooks/useStatusBar";
import Colors from "@/constants/Colors";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { LangageData } from "@/constants/data";

export default function Settings() {
  const [isLogout, setIsLogout] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changeNumber, setChangeNumber] = useState(false);

  const [ModalVisible, setModalVisible] = useState(false);

  const snapPoints = useMemo(() => ["50%", "70%", "100%"], []);
  const snapPointLangage = useMemo(() => ["30%", "40%", "55%"], []);
  const snapPointNumber = useMemo(() => ["40%", "50%", "55%"], []);
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleChange = () => {
    setChangeNumber(true);
  };

  const closeChange = () => {
    setChangeNumber(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlePresentModal = () => {
    setModalVisible(true);
  };
  const CloseModal = () => {
    setModalVisible(false);
  };

  useStatusBar("dark", "#fff", false);

  const handleLogout = async () => {
    setIsLogout(!isLogout);
  };

  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
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
            <TouchableOpacity onPress={handleChange}>
              <View className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[#114F5A] rounded-3xl`}>
                    <ArrangeHorizontal size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    Change phone number
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
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
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModal}>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[${Colors.buttonSecondary}] rounded-3xl`}>
                    <ArrangeHorizontal size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    Change langage
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[red] rounded-3xl`}>
                    <Trash size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    Delete account
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
          </View>
          <ThemedText className="text-center"> Version : 1.0.1 </ThemedText>
        </View>

        <CustomBottomSheetModal
          isVisible={ModalVisible}
          onClose={CloseModal}
          snapPoints={snapPointLangage}
          index={Platform.OS === "ios" ? 0 : 1}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] ">
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]">
                Change Langage
              </ThemedText>
              <TouchableOpacity onPress={CloseModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center pt-[36px] w-full">
              {LangageData.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => handleSelect(item.name)}
                  className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between">
                  <View className="flex flex-row gap-[12px] items-center">
                    <Image
                      source={item.image}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText className="py-[16px] text-[#101828] text-[14px]">
                      {item.name}
                    </ThemedText>
                  </View>

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
        </CustomBottomSheetModal>

        <CustomBottomSheetModal
          isVisible={changeNumber}
          onClose={closeChange}
          snapPoints={snapPointNumber}
          index={Platform.OS === "ios" ? 0 : 1}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] ">
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]">
                Change phone number
              </ThemedText>
              <TouchableOpacity onPress={closeChange}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center gap-[26px] pt-[36px] w-full">
              <View className="flex gap-4 w-full">
                <TextInput
                  placeholder="Enter new phone number"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.textSecondary}
                  className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <CustomButton
                  title="Update"
                  textColor={Colors.textPrimary}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </CustomBottomSheetModal>

        <CustomBottomSheetModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          snapPoints={snapPoints}
          index={Platform.OS === "ios" ? 0 : 1}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] ">
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]">
                Change Passcode
              </ThemedText>
              <TouchableOpacity onPress={handleCloseModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center gap-[26px] pt-[36px] w-full">
              <View className="flex gap-4 w-full">
                <TextInput
                  placeholder="Old Password"
                  placeholderTextColor={Colors.textSecondary}
                  className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor={Colors.textSecondary}
                  className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.textSecondary}
                  className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <ThemedText
                  className={`text-[${Colors.textSecondary}] text-[14px]`}>
                  * Your password should be minimum 8 characters.
                </ThemedText>
                <CustomButton
                  title="Change"
                  textColor={Colors.textPrimary}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </CustomBottomSheetModal>
        <TouchableOpacity
          onPress={handleLogout}
          className="border border-[#FF4747]  rounded-[50px] flex items-center">
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
          <Pressable
            onPress={() => {
              router.back();
            }}>
            <ArrowLeft size="24" color="#101828" />
          </Pressable>

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

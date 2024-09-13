import React, { useEffect, useMemo, useState } from "react";
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
  Trash,
} from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderSetting from "@/components/HeaderSetting";
import { LogoutModal } from "@/components/LogoutModal";
import useStatusBar from "@/hooks/useStatusBar";
import Colors from "@/constants/Colors";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { LangageData } from "@/constants/data";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { useSession } from "@/context/authContext";
import { changePass } from "@/utils/auth";
import { toastify } from "@/constants/utils";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { getLangage } from "@/localization/i18n";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { signOut } = useSession();
  useStatusBar("dark", "#fff", false);
  const [isLogout, setIsLogout] = useState(false);
  const { isKeyboardVisible } = useKeyboardState();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changePasscodeModalVisible, setChangePasscodeModalVisible] =
    useState(false);
  const [changePhoneNumberModalVisible, setChangePhoneNumberModalVisible] =
    useState(false);
  const [changeLangageModalVisible, setChangeLangageModalVisible] =
    useState(false);

  const [activeSnapPoint, setActiveSnapPoint] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");

  const changePhoneNumberSnapPoint = useMemo(
    () => ["34%", "35%", "65%", "70%", "90%"],
    []
  );
  const changePasscodeSnapPoint = useMemo(
    () => ["52%", "58%", "60%", "65%", "87%", "90%", "94%"],
    []
  );
  const snapPointLangage = useMemo(() => ["25%", "35%", "55%"], []);

  const handlePhoneNumberChange = () => {
    closePasscodeModal();
    closeLangageModal();
    setChangePhoneNumberModalVisible(true);
    setCurrentSelected("changePhoneNumberSnapPoint");
  };

  const closePhoneNumberModal = () => {
    setChangePhoneNumberModalVisible(false);
  };

  const handlePasscodeChange = () => {
    closePhoneNumberModal();
    closeLangageModal();
    setChangePasscodeModalVisible(true);
    setCurrentSelected("changePasscodeSnapPoint");
  };
  const closePasscodeModal = () => {
    setChangePasscodeModalVisible(false);
  };

  const handleLangageChange = () => {
    closePhoneNumberModal();
    closePasscodeModal();
    setChangeLangageModalVisible(true);
    setCurrentSelected("changeLangageSnapPoint");
  };
  const closeLangageModal = () => {
    setChangeLangageModalVisible(false);
  };

  const closeModal = () => {
    closePhoneNumberModal();
    closePasscodeModal();
    closeLangageModal();
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };
  const handleFocusModal = (type: string = "") => {
    if (type && type.length) {
      setActiveSnapPoint(type);
    }
  };

  const handleBlurModal = (type: string = "") => {
    if (type && type.length && !isKeyboardVisible) {
      setActiveSnapPoint("");
    }
  };

  // Ensure the active snap point is set correctly when the keyboard visibility changes
  useEffect(() => {
    if (isKeyboardVisible) {
      setActiveSnapPoint(currentSelected);
    } else {
      setActiveSnapPoint("");
    }
  }, [isKeyboardVisible, currentSelected, activeSnapPoint]);

  const handleLogout = async () => {
    setIsLogout(!isLogout);
  };

  const [selectedLangage, setselectedLangage] = useState<string | null>(null);

  const handleSelectLangage = (code: string) => {
    setselectedLangage(code);
    setLangage(code);
  };

  const isFormFilled = () => {
    return newPass !== "" && oldPass !== null && confirmPass !== "";
  };

  const handleChangePass = async () => {
    try {
      setIsLoading(true);
      if (newPass === confirmPass) {
        const res = await changePass({
          _id: "66e0966446078c608a336609",
          oldPass: oldPass,
          newPass: newPass,
        });
        setIsLoading(false);
        closePasscodeModal();
        setOldPass("");
        setNewPass("");
        setConfirmPass("");
        Toast.show({
          type: "success",
          text1: "success",
          text2: "password change with success",
          position: "top",
        });
      } else {
        setIsLoading(false);
        return toastify("Invalid data", "two passcodes are different");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return toastify("Invalid data", "Invalid credentials");
    }
  };

  // change langage
  const setLangage = (code: string) => {
    i18n.changeLanguage(code || "en");
  };

  useEffect(() => {
    getLangage()
      .then((langage) => handleSelectLangage(langage))
      .catch((e) => {
        console.log(e, "useffect getlangage");
        handleSelectLangage("en");
      });
  }, []);

  return (
    <>
      <CustomHeader />
      <View className="flex bg-[#fff] h-[100%] justify-between px-[16px] pb-[160px]">
        <View className="flex flex-col gap-[1.25rem]">
          <ThemedText
            className="text-[1.25rem]  text-[#101828]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
          >
            {t("screens.settings.title")}
          </ThemedText>
          <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
            <TouchableOpacity onPress={handlePhoneNumberChange}>
              <View className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[#114F5A] rounded-3xl`}
                  >
                    <ArrangeHorizontal size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    {t("screens.settings.changePhoneNumber.title")}
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePasscodeChange}
              className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center"
            >
              <View className="flex items-center flex-row gap-[0.5rem]">
                <Image
                  source={require("@/assets/code.png")}
                  style={{ width: 30, height: 30 }}
                />
                <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                  {t("screens.settings.changePasscode.title")}
                </ThemedText>
              </View>
              <ArrowRight2 size="24" color="#667085" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLangageChange}>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[${Colors.buttonSecondary}] rounded-3xl`}
                  >
                    <ArrangeHorizontal size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    {t("screens.settings.changeLanguage.title")}
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className=" border-t border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    className={`justify-center items-center w-[30] h-[30] bg-[red] rounded-3xl`}
                  >
                    <Trash size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText className="text-[#1D2939] text-[14px] capitalize">
                    {t("screens.settings.deleteAccount")}
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </View>
            </TouchableOpacity>
          </View>
          <ThemedText className="text-center"> Version : 1.0.1 </ThemedText>
        </View>

        <CustomBottomSheetModal
          isVisible={changeLangageModalVisible}
          onClose={closeModal}
          snapPoints={snapPointLangage}
          index={Platform.OS === "ios" ? 1 : 1}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] "
          >
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]"
              >
                {t("screens.settings.changeLanguage.title")}
              </ThemedText>
              <TouchableOpacity onPress={closeModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center pt-[36px] w-full">
              {LangageData.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    handleSelectLangage(item.code);
                  }}
                  className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between"
                >
                  <View className="flex flex-row gap-[12px] items-center">
                    <Image
                      source={item.image}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText className="py-[16px] text-[#101828] text-[14px]">
                      {item.name}
                    </ThemedText>
                  </View>

                  {selectedLangage === item.code && (
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
          isVisible={changePhoneNumberModalVisible}
          onClose={closeModal}
          snapPoints={changePhoneNumberSnapPoint}
          index={
            activeSnapPoint === "changePhoneNumberSnapPoint"
              ? Platform.OS === "android"
                ? 3
                : 2
              : Platform.OS === "android"
              ? 1
              : 0
          }
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] "
          >
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]"
              >
                {t("screens.settings.changePhoneNumber.title")}
              </ThemedText>
              <TouchableOpacity onPress={closeModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center gap-[26px] pt-[36px] w-full">
              <View className="flex gap-4 w-full">
                <TextInput
                  placeholder={t(
                    "screens.settings.changePhoneNumber.placeholder"
                  )}
                  keyboardType="numeric"
                  placeholderTextColor={Colors.textSecondary}
                  className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                  onPressIn={() => {
                    handleFocusModal("changePhoneNumberSnapPoint");
                  }}
                  onBlur={() => {
                    handleBlurModal("changePhoneNumberSnapPoint");
                  }}
                />
                <CustomButton
                  title={t("screens.settings.changePhoneNumber.buttonText")}
                  textColor={Colors.textPrimary}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </CustomBottomSheetModal>

        <CustomBottomSheetModal
          isVisible={changePasscodeModalVisible}
          onClose={closeModal}
          snapPoints={changePasscodeSnapPoint}
          index={
            activeSnapPoint === "changePasscodeSnapPoint"
              ? Platform.OS === "android"
                ? 6
                : 4
              : Platform.OS === "android"
              ? 1
              : 0
          }
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
            className="w-full px-[4%] "
          >
            <View className="pt-[1rem] flex-row justify-between items-center w-full">
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[20px] text-[#000000]"
              >
                {t("screens.settings.changePasscode.title")}
              </ThemedText>
              <TouchableOpacity onPress={closeModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center gap-[26px] pt-[36px] w-full">
              <View className="flex gap-4 w-full">
                <View>
                  <TextInput
                    placeholder={t(
                      "screens.settings.changePasscode.oldPassCodePlaceholder"
                    )}
                    placeholderTextColor={Colors.textSecondary}
                    className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                    onPressIn={() => {
                      handleFocusModal("changePasscodeSnapPoint");
                    }}
                    onBlur={() => {
                      handleBlurModal("changePasscodeSnapPoint");
                    }}
                    onChangeText={setOldPass}
                    secureTextEntry={!showOld}
                  />
                  {oldPass ? (
                    <Ionicons
                      onPress={() => setShowOld(!showOld)}
                      name={`${showOld ? "eye-off-outline" : "eye-outline"}`}
                      size={24}
                      color="#344054"
                      className="absolute right-4 top-4 "
                    />
                  ) : null}
                </View>
                <View>
                  <TextInput
                    placeholder={t(
                      "screens.settings.changePasscode.newPassCodePlaceholder"
                    )}
                    placeholderTextColor={Colors.textSecondary}
                    className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                    onPressIn={() => {
                      handleFocusModal("changePasscodeSnapPoint");
                    }}
                    onBlur={() => {
                      handleBlurModal("changePasscodeSnapPoint");
                    }}
                    secureTextEntry={!showNew}
                    onChangeText={setNewPass}
                  />
                  {newPass ? (
                    <Ionicons
                      onPress={() => setShowNew(!showNew)}
                      name={`${showNew ? "eye-off-outline" : "eye-outline"}`}
                      size={24}
                      color="#344054"
                      className="absolute right-4 top-4 "
                    />
                  ) : null}
                </View>

                <View>
                  <TextInput
                    placeholder={t(
                      "screens.settings.changePasscode.ConfirmPassCodePlaceholder"
                    )}
                    placeholderTextColor={Colors.textSecondary}
                    className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                    onPressIn={() => {
                      handleFocusModal("changePasscodeSnapPoint");
                    }}
                    onBlur={() => {
                      handleBlurModal("changePasscodeSnapPoint");
                    }}
                    secureTextEntry={!showConfirm}
                    onChangeText={setConfirmPass}
                  />
                  {confirmPass ? (
                    <Ionicons
                      onPress={() => setShowConfirm(!showConfirm)}
                      name={`${
                        showConfirm ? "eye-off-outline" : "eye-outline"
                      }`}
                      size={24}
                      color="#344054"
                      className="absolute right-4 top-4 "
                    />
                  ) : null}
                </View>

                <ThemedText
                  className={`text-[${Colors.textSecondary}] text-[14px]`}
                >
                  {t("screens.settings.changePasscode.passwordWarnings")}
                </ThemedText>
                <CustomButton
                  title={t("screens.settings.changePasscode.buttonText")}
                  isLoading={loading}
                  textColor={Colors.textPrimary}
                  onPress={handleChangePass}
                  disabled={!isFormFilled()}
                />
              </View>
            </View>
          </View>
        </CustomBottomSheetModal>
        <TouchableOpacity
          onPress={handleLogout}
          className="border border-[#FF4747]  rounded-[50px] flex items-center"
        >
          <ThemedText
            className="text-[1rem] text-[#FF4747] py-[1rem]"
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
          >
            {t("screens.settings.logout.title")}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <LogoutModal
        onLogout={() => signOut()}
        visible={isLogout}
        onClose={handleLogout}
      />
    </>
  );
}

function CustomHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderSetting>
        <View className="flex flex-row justify-between w-full items-center px-[16px] py-[22px]">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <ArrowLeft size="24" color="#101828" />
          </Pressable>

          <ThemedText
            className="text-[#101828] text-[24px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            {t("screens.settings.title")}
          </ThemedText>
          <InfoCircle size="24" color="#101828" />
        </View>
      </HeaderSetting>
    </>
  );
}

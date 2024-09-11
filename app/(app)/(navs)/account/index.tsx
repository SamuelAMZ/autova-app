import ThemedText from "@/components/ThemedText";
import {
  ArrowRight2,
  Call,
  Camera,
  Car,
  Setting2,
  Whatsapp,
} from "iconsax-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import Header from "@/components/Header";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { useSession } from "@/context/authContext";
import { IUser } from "@/constants/types";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { AntDesign } from "@expo/vector-icons";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import TogoFlag from "@/assets/icons/togo.svg";
import { VerifyCode } from "@/app/auth/verify";
import { toastify } from "@/constants/utils";
import { supabaseClient } from "@/services/supabase.service";

const AccountPage = () => {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
  });
  const { session } = useSession();
  const { isKeyboardVisible } = useKeyboardState();
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [currentSelected, setCurrentSelected] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const accountSnapPoint = useMemo(
    () => ["34%", "35%", "65%", "70%", "90%"],
    []
  );

  const [activeSnapPoint, setActiveSnapPoint] = useState("");

  const handleFocusModal = (type: string = "") => {
    if (type && type.length) {
      setActiveSnapPoint(type);
    }
  };

  const closeModal = () => {
    setAccountModalVisible(false);
  };

  const handleAccountCreate = () => {
    setAccountModalVisible(true);
    setCurrentSelected("accountSnapPoint");
  };

  const handleBlurModal = (type: string = "") => {
    if (type && type.length && !isKeyboardVisible) {
      setActiveSnapPoint("");
    }
  };

  useEffect(() => {
    if (isKeyboardVisible) {
      setActiveSnapPoint(currentSelected);
    } else {
      setActiveSnapPoint("");
    }
  }, [isKeyboardVisible, currentSelected, activeSnapPoint]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {}
  };

  const compressImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      });
      return manipResult;
    } catch (error) {
      console.error("Error compressing image:", error);
      return { uri };
    }
  };

  useEffect(() => {
    console.log("ddd",session)
    if (session) {
      const { username, phone } = JSON.parse(session) as IUser;
      setUserData({ username, phone });
    }
  }, [session]);

  async function handleSendOtpCode() {
    const regex = /^(9[01236789]|7[012])\d{6}$/;
    if (!phone || !regex.test(phone)) {
      return toastify("Invalid", "Please enter correct phone number");
    }
    try {
      const phoneValid = `228${phone}`;
      setIsLoading(true);
      await supabaseClient.auth.signInWithOtp({
        phone: phoneValid,
      });
      setIsLoading(false);
      setVerifying(true);
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  async function handleVerifyOtpCode() {
    if (!code) return;
    try {
      setIsLoading(true);
      const result = await supabaseClient.auth.verifyOtp({
        phone: `228${phone}`,
        token: code.toString().replaceAll(",", ""),
        type: "sms",
      });
      setIsLoading(false);
      const res = result.data;
      if (res.session && res.session.access_token) {
        return router.navigate({
          pathname: "/auth/account",
          params: { phone, token: res.session.access_token },
        });
      } else {
        toastify("Invalid code", "Verification code is invalid");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  if (verifying) {
    return (
      <VerifyCode
        isLoading={isLoading}
        code={code}
        phone={phone}
        onChange={(value: string[]) => setCode(value)}
        onPress={handleVerifyOtpCode}
      />
    );
  }

  return (
    <>
      {session ? (
        <>
          <CustomHeader />
          <ScrollView className="">
            <View className=" flex-1 px-[16px] py-[30px] gap-[30px]">
              <View className="flex flex-row gap-[12px] items-center justify-start ">
                <View className="relative">
                  <Image
                    source={
                      image ? { uri: image } : require("@/assets/user.jpg")
                    }
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 100,
                    }}
                  />
                  <Pressable
                    onPress={pickImage}
                    className="bg-[#fff] p-[16px] rounded-full absolute"
                    style={{ left: 40, top: 35 }}
                  >
                    <View
                      className={`bg-[${Colors.background}] p-[5px] rounded-full absolute`}
                      style={{ left: 2, top: 2 }}
                    >
                      <Camera
                        className=" absolute"
                        size={18}
                        color="#fff"
                        style={{ right: 0, bottom: 0 }}
                      />
                    </View>
                  </Pressable>
                </View>

                <View className="flex ">
                  <ThemedText
                    className="text-[#101828] text-[18px]"
                    style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                  >
                    +{userData.phone}
                  </ThemedText>
                </View>
              </View>

              <View className="flex flex-col gap-[1.25rem]">
                <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px] mt-[10px]">
                  <TouchableOpacity
                    onPress={() => {
                      router.navigate("/(app)/listCar/condition");
                    }}
                    className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center"
                  >
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <TouchableOpacity
                        className={`justify-center items-center w-[30] h-[30] bg-[${Colors.buttonSecondary}] rounded-3xl`}
                      >
                        <Car size="18" color={Colors.textPrimary} />
                      </TouchableOpacity>
                      <ThemedText
                        className="text-[#1D2939] text-[14px] capitalize"
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Listing car
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                </View>
                <ThemedText
                  className="text-[1.25rem]  text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Contact info
                </ThemedText>

                <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
                  <TouchableOpacity className=" border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <TouchableOpacity
                        className={`justify-center items-center w-[30] h-[30] bg-[#114F5A] rounded-3xl`}
                      >
                        <Call size="18" color={Colors.textPrimary} />
                      </TouchableOpacity>
                      <ThemedText
                        className="text-[#1D2939] text-[14px] capitalize"
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Phone number
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                  <TouchableOpacity className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <TouchableOpacity
                        className={`justify-center items-center w-[30] h-[30] bg-[#799418] rounded-3xl`}
                      >
                        <Whatsapp size="18" color={Colors.textPrimary} />
                      </TouchableOpacity>
                      <ThemedText
                        className="text-[#1D2939] text-[14px] "
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Whatsapp number
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                </View>
                <ThemedText
                  className="text-[1.25rem]  text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  About Autova
                </ThemedText>

                <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
                  <TouchableOpacity className="border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <Image
                        source={require("@/assets/about.png")}
                        style={{ width: 30, height: 30 }}
                      />
                      <ThemedText
                        className="text-[#1D2939] text-[14px] "
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        About us
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                  <TouchableOpacity className="border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <Image
                        source={require("@/assets/term.png")}
                        style={{ width: 30, height: 30 }}
                      />
                      <ThemedText
                        className="text-[#1D2939] text-[14px] "
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Terms of service
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>

                  <TouchableOpacity className=" px-[1rem] py-[0.8125rem] flex flex-row justify-between items-cente ">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <Image
                        source={require("@/assets/policy.png")}
                        style={{ width: 30, height: 30 }}
                      />
                      <ThemedText
                        className="text-[#1D2939] text-[14px] capitalize"
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Privacy Policy
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                </View>

                <ThemedText
                  className="text-[1.25rem]  text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Section
                </ThemedText>

                <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
                  <TouchableOpacity className=" border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <Image
                        source={require("@/assets/contact.png")}
                        style={{ width: 30, height: 30 }}
                      />
                      <ThemedText
                        className="text-[#1D2939] text-[14px] capitalize"
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        contact us
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                  <TouchableOpacity className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                    <View className="flex items-center flex-row gap-[0.5rem]">
                      <Image
                        source={require("@/assets/invite.png")}
                        style={{ width: 30, height: 30 }}
                      />
                      <ThemedText
                        className="text-[#1D2939] text-[14px] "
                        style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                      >
                        Invite a Friend
                      </ThemedText>
                    </View>
                    <ArrowRight2 size="24" color="#667085" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="items-center flex gap-[20px]">
                <ThemedText
                  className="text-[20px] text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                >
                  Enjoying Carnext+ App?
                </ThemedText>

                <Image
                  source={require("@/assets/refer.png")}
                  style={{ width: 190, height: 190 }}
                />

                <TouchableOpacity
                  onPress={() => {}}
                  className={`bg-[${Colors.background}] px-[20px] py-[12px] rounded-[12px]`}
                >
                  <ThemedText
                    className="text-[17px] text-center font-[600] text-[#fff]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  >
                    Refer a friend
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <Header>
            <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
              <ThemedText
                className={`text-[${Colors.textPrimary}] text-[22px]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
              >
                Account
              </ThemedText>
            </View>
          </Header>
          <ScrollView className="">
            <View className="flex flex-col gap-[1.25rem] px-[16px] py-[30px]">
              <TouchableOpacity
                onPress={handleAccountCreate}
                className="border border-[#FF4747]  rounded-[50px] flex items-center"
              >
                <ThemedText
                  className="text-[1rem] text-[#FF4747] py-[1rem]"
                  style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                >
                  Login to use Autova
                </ThemedText>
              </TouchableOpacity>
              <ThemedText
                className="text-[1.25rem]  text-[#101828]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}
              >
                About Autova
              </ThemedText>

              <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px]">
                <TouchableOpacity className="border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                  <View className="flex items-center flex-row gap-[0.5rem]">
                    <Image
                      source={require("@/assets/about.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText
                      className="text-[#1D2939] text-[14px] "
                      style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                    >
                      About us
                    </ThemedText>
                  </View>
                  <ArrowRight2 size="24" color="#667085" />
                </TouchableOpacity>
                <TouchableOpacity className="border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                  <View className="flex items-center flex-row gap-[0.5rem]">
                    <Image
                      source={require("@/assets/term.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText
                      className="text-[#1D2939] text-[14px] "
                      style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                    >
                      Contact us
                    </ThemedText>
                  </View>
                  <ArrowRight2 size="24" color="#667085" />
                </TouchableOpacity>
                <TouchableOpacity className="border-b border-[#D0D5DD] px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                  <View className="flex items-center flex-row gap-[0.5rem]">
                    <Image
                      source={require("@/assets/term.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText
                      className="text-[#1D2939] text-[14px] "
                      style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                    >
                      Terms of service
                    </ThemedText>
                  </View>
                  <ArrowRight2 size="24" color="#667085" />
                </TouchableOpacity>

                <TouchableOpacity className=" px-[1rem] py-[0.8125rem] flex flex-row justify-between items-cente ">
                  <View className="flex items-center flex-row gap-[0.5rem]">
                    <Image
                      source={require("@/assets/policy.png")}
                      style={{ width: 30, height: 30 }}
                    />
                    <ThemedText
                      className="text-[#1D2939] text-[14px] capitalize"
                      style={{ fontFamily: "SpaceGrotesk_500Medium" }}
                    >
                      Privacy Policy
                    </ThemedText>
                  </View>
                  <ArrowRight2 size="24" color="#667085" />
                </TouchableOpacity>
              </View>
              <View className="items-center flex gap-[20px]">
                <ThemedText
                  className="text-[20px] text-[#101828]"
                  style={{ fontFamily: "SpaceGrotesk_700Bold" }}
                >
                  Enjoying Carnext+ App?
                </ThemedText>
                <Image
                  source={require("@/assets/refer.png")}
                  style={{ width: 190, height: 190 }}
                />
                <TouchableOpacity
                  onPress={() => {}}
                  className={`bg-[${Colors.background}] px-[20px] py-[12px] rounded-[12px]`}
                >
                  <ThemedText
                    className="text-[17px] text-center font-[600] text-[#fff]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  >
                    Refer a friend
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <CustomBottomSheetModal
              isVisible={accountModalVisible}
              onClose={closeModal}
              snapPoints={accountSnapPoint}
              index={
                activeSnapPoint === "accountSnapPoint"
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
                    Create account
                  </ThemedText>
                  <TouchableOpacity onPress={closeModal}>
                    <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                      <AntDesign name="close" size={16} color="#3D3D3D" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="flex justify-center gap-[26px] pt-[36px] w-full">
                  <View className="flex gap-4 w-full">
                    <View className="flex flex-row items-center">
                      <View
                        className={`flex-row gap-2 bg-[${Colors.backgroundSecondary}] h-[50px] items-center justify-center pl-3 rounded-l-lg`}
                      >
                        <TogoFlag
                          height={24}
                          width={24}
                          className="self-center"
                        />
                        <ThemedText>+228</ThemedText>
                      </View>
                      <TextInput
                        value={phone}
                        onChangeText={(value) =>
                          value.length <= 8 && setPhone(value)
                        }
                        onPressIn={() => {
                          handleFocusModal("accountSnapPoint");
                        }}
                        onBlur={() => {
                          handleBlurModal("accountSnapPoint");
                        }}
                        keyboardType="numeric"
                        placeholder="Phone number"
                        placeholderTextColor={Colors.textSecondary}
                        className={`bg-[${Colors.backgroundSecondary}] h-[50px] flex-1 rounded-r-lg py-[16px] px-[20px]`}
                      />
                    </View>
                    <CustomButton
                      isLoading={isLoading}
                      title="Continue"
                      onPress={handleSendOtpCode}
                    />
                  </View>
                </View>
              </View>
            </CustomBottomSheetModal>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default AccountPage;

function CustomHeader() {
  return (
    <>
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className={`text-[${Colors.textPrimary}] text-[22px]`}
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Account
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(app)/listCar/settings");
            }}
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
          >
            <Setting2 size="24" color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </Header>
    </>
  );
}

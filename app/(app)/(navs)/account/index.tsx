import ThemedText from "@/components/ThemedText";
import { Add, ArrowRight2, Camera, Car, Setting2 } from "iconsax-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const AccountPage = () => {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
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
      return { uri }; // Return original uri if compression fails
    }
  };

  return (
    <>
      <CustomHeader />
      <ScrollView className="">
        <View className=" flex-1 px-[16px] py-[30px] gap-[30px]">
          <View className="flex flex-row gap-[12px] items-center justify-start ">
            <View className="relative">
              <Image
                source={image ? { uri: image } : require("@/assets/user.jpg")}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 100,
                }}
              />
              <Pressable
                onPress={pickImage}
                className="bg-[#fff] p-[16px] rounded-full absolute"
                style={{ left: 40, top: 35 }}>
                <View
                  className={`bg-[${Colors.background}] p-[5px] rounded-full absolute`}
                  style={{ left: 2, top: 2 }}>
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
                style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
                Omar Hassan
              </ThemedText>
              <ThemedText className="text-[#667085] text-[14px]">
                omarhassan@carnext.com
              </ThemedText>
            </View>
          </View>
          
          <View className="flex flex-col gap-[1.25rem]">
            <View className="bg-[#F9FAFB] border border-[#D0D5DD] rounded-[12px] mt-[10px]">
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/(app)/listCar/condition");
                }}
                className="  px-[1rem] py-[0.8125rem] flex flex-row justify-between items-center">
                <View className="flex items-center flex-row gap-[0.5rem]">
                  <TouchableOpacity
                    
                    className={`justify-center items-center w-[30] h-[30] bg-[${Colors.buttonSecondary}] rounded-3xl`}>
                    <Car size="18" color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <ThemedText
                    className="text-[#1D2939] text-[14px] capitalize"
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                    Listing car
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </TouchableOpacity>
            </View>
            <ThemedText
              className="text-[1.25rem]  text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              About app
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
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
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
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
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
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                    Privacy Policy
                  </ThemedText>
                </View>
                <ArrowRight2 size="24" color="#667085" />
              </TouchableOpacity>
            </View>

            <ThemedText
              className="text-[1.25rem]  text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
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
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
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
                    style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
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
              style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
              Enjoying Carnext+ App?
            </ThemedText>

            <Image
              source={require("@/assets/refer.png")}
              style={{ width: 190, height: 190 }}
            />

            <TouchableOpacity
              onPress={() => {}}
              className={`bg-[${Colors.background}] px-[20px] py-[12px] rounded-[12px]`}>
              <ThemedText
                className="text-[17px] text-center font-[600] text-[#fff]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Refer a friend
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
            Account
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(app)/listCar/settings");
            }}
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}>
            <Setting2 size="24" color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </Header>
    </>
  );
}

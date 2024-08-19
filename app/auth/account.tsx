import { Text, View, StatusBar, TextInput, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Account() {
  return (
    <>
      <ScrollView className="flex-1 bg-[#fff] px-[15px] pt-[100px]">
        <View className="items-start gap-[32px]">
          <View className="flex gap-[12px] items-start">
            <ThemedText
              className="text-[#070C0F] text-[15px] font-[600]"
              style={{ fontFamily: "Poppins_600SemiBold" }}
            >
              Step 2 of 2
            </ThemedText>
            <ThemedText
              className="text-[#070C0F] text-[28px] font-[600]"
              style={{ fontFamily: "Poppins_600SemiBold" }}
            >
              Create Your Account
            </ThemedText>
          </View>
          <View className="flex gap-[8px] items-start w-[100%]">
            <ThemedText className="text-[14px] text-[#070C0F]">
              You are registering with{" "}
              <Text
                className="text-[#007AFF] underline"
                style={{ color: "#007AFF" }}
              >
                example@email.com
              </Text>
            </ThemedText>
            <ThemedText className="text-[14px] text-[#070C0F]">
              Want to change?{" "}
              <Text
                className="text-[#007AFF] underline"
                style={{ color: "#007AFF" }}
              >
                {" "}
                Click here{" "}
              </Text>
            </ThemedText>
          </View>
          <View className="flex gap-[20px] w-[100%]">
            <View className="flex gap-4">
              <TextInput
                placeholder="Full name"
                placeholderTextColor="#475467"
                className="bg-[#EFEFEF] rounded-[12px] py-[16px] px-[20px]"
              />
              <TextInput
                placeholder="Phone number (optional)"
                keyboardType="numeric"
                placeholderTextColor="#475467"
                className="bg-[#EFEFEF] rounded-[12px] py-[16px] px-[20px]"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#475467"
                className="bg-[#EFEFEF] rounded-[12px] py-[16px] px-[20px]"
              />
              <ThemedText className="text-[#475467] text-[12px]">
                * Your password should be minimum 8 characters.
              </ThemedText>
            </View>
            <CustomButton
              title="Create account"
              textColor="#fff"
              onPress={() => {
                router.navigate("/auth/notif");
              }}
            />
            <ThemedText className=" text-[#475467] text-[13px] font-[400]">
              By signing up, you agree to our{" "}
              <ThemedText className="text-[#101828] font-[500] underline">
                {" "}
                Terms of Service{" "}
              </ThemedText>{" "}
              and{" "}
              <ThemedText className="text-[#101828] font-[500] underline">
                Privacy Policy
              </ThemedText>{" "}
              for creating your account.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}

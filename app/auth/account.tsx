import { Text, View, StatusBar, TextInput, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import colors from "@/constants/Colors";

export default function Account() {
  return (
    <>
      <View
        className={`flex-1 bg-[${colors.textPrimary}] px-[15px] pt-[100px]`}>
        <View className="flex justify-between h-full pb-[50px]">
          <View className="items-start gap-[32px]">
            <View className="flex gap-[12px] items-start">
              <ThemedText
                className={`text-[${colors.backgroundPrimary}] text-[15px] font-[600]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Step 2 of 2
              </ThemedText>
              <ThemedText
                className={`text-[${colors.backgroundPrimary}] text-[28px] font-[600]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Create Your Account
              </ThemedText>
            </View>
            <View className="flex gap-[8px] items-start w-[100%]">
              <ThemedText
                className={`text-[14px] text-[${colors.backgroundPrimary}]`}>
                You are registering with{" "}
                <Text
                  className={`text-[${colors.textHighlight}] underline`}
                  style={{ color: colors.textHighlight }}>
                  example@email.com
                </Text>
              </ThemedText>
              <ThemedText
                className={`text-[14px] text-[${colors.backgroundPrimary}]`}>
                Want to change?{" "}
                <Text
                  className={`text-[${colors.textHighlight}] underline`}
                  style={{ color: colors.textHighlight }}>
                  {" "}
                  Click here{" "}
                </Text>
              </ThemedText>
            </View>
            <View className="flex gap-[20px] w-[100%]">
              <View className="flex gap-4">
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor={colors.textSecondary}
                  className={`bg-[${colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <TextInput
                  placeholder="Phone number (optional)"
                  keyboardType="numeric"
                  placeholderTextColor={colors.textSecondary}
                  className={`bg-[${colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  className={`bg-[${colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                />
                <ThemedText
                  className={`text-[${colors.textSecondary}] text-[12px]`}>
                  * Your password should be minimum 8 characters.
                </ThemedText>
              </View>
              <CustomButton
                title="Create account"
                textColor={colors.textPrimary}
                onPress={() => {
                  router.navigate("/auth/notif");
                }}
              />
            </View>
          </View>
          <ThemedText
            className={`text-[${colors.textSecondary}] text-[13px] font-[400]`}>
            By signing up, you agree to our{" "}
            <ThemedText
              className={`text-[${colors.textTertiary}] font-[500] underline`} style={{ fontFamily:'SpaceGrotesk_500Medium'}} >
              {" "}
              Terms of Service{" "}
            </ThemedText>{" "}
            and{" "}
            <ThemedText
              className={`text-[${colors.textTertiary}] font-[500] underline`}  style={{ fontFamily:'SpaceGrotesk_500Medium'}}>
              Privacy Policy
            </ThemedText>{" "}
            for creating your account.
          </ThemedText>
        </View>
      </View>
      <StatusBar backgroundColor={colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

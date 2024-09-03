import { Text, View, StatusBar, TextInput, ScrollView } from "react-native";
import ThemedText from "@/components/ThemedText";

import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import TermsOfServices from "@/components/TermsOfServices";
import { useEffect, useState } from "react";

export default function Account() {
  const { phone } = useLocalSearchParams();
  const [data, setData] = useState({ username: "", phone: "", password: "" });

  useEffect(() => {
    setData({ ...data, phone: phone.toString() });
  }, [phone]);

  const handleSubmitData = () => {};

  return (
    <>
      <View
        className={`flex-1 bg-[${Colors.textPrimary}] px-[15px] pt-[100px]`}
      >
        <View className="items-start gap-[32px]">
          <View className="flex gap-[12px] items-start">
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[15px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Step 2 of 2
            </ThemedText>
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[28px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Create Your Account
            </ThemedText>
          </View>
          <View className="flex gap-[8px] items-start w-[100%]">
            <ThemedText
              className={`text-[14px] text-[${Colors.backgroundPrimary}]`}
            >
              You are registering with{" "}
              <Text
                className={`text-[${Colors.textHighlight}] underline`}
                style={{ color: Colors.textHighlight }}
              >
                +228{data.phone}
              </Text>
            </ThemedText>
            <ThemedText
              className={`text-[14px] text-[${Colors.backgroundPrimary}]`}
            >
              Want to change?{" "}
              <Text
                className={`text-[${Colors.textHighlight}] underline`}
                style={{ color: Colors.textHighlight }}
              >
                {" "}
                Click here{" "}
              </Text>
            </ThemedText>
          </View>
          <View className="flex gap-[20px] w-[100%]">
            <View className="flex gap-4">
              <TextInput
                onChangeText={(value) => setData({ ...data, username: value })}
                placeholder="Full name"
                placeholderTextColor={Colors.textSecondary}
                className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
              />
              <TextInput
                value={`+228${phone}`}
                editable={false}
                placeholder="Phone number (optional)"
                keyboardType="numeric"
                placeholderTextColor={Colors.textSecondary}
                className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
              />
              <TextInput
                onChangeText={(value) => setData({ ...data, password: value })}
                placeholder="Password"
                placeholderTextColor={Colors.textSecondary}
                className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
              />
              <ThemedText
                className={`text-[${Colors.textSecondary}] text-[12px]`}
              >
                * Your password should be minimum 8 characters.
              </ThemedText>
            </View>
            <CustomButton
              title="Create account"
              textColor={Colors.textPrimary}
              onPress={() => {
                router.navigate("/auth/notif");
              }}
            />
          </View>
          <TermsOfServices />
        </View>
      </View>
      <StatusBar backgroundColor={Colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

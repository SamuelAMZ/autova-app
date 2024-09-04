import { View, StatusBar, TextInput } from "react-native";
import ThemedText from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { supabaseClient } from "@/services/supabase.service";
import TermsOfServices from "@/components/TermsOfServices";
import { toastify } from "@/constants/utils";
import { VerifyCode } from "./verify";
import TogoFlag from "@/assets/icons/togo.svg";
import { router } from "expo-router";

export default function SignUp() {
  const [verifying, setVerifying] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      <View
        className={`flex-1 justify-center bg-[${Colors.textPrimary}] px-4 w-full`}
      >
        <View className="items-start gap-[32px]">
          <View className="flex gap-[12px] items-start">
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[15px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Step 1 of 2
            </ThemedText>
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[28px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Create Your Account
            </ThemedText>
          </View>
          <View className="flex gap-[20px] w-full">
            <View className="flex flex-row items-center">
              <View
                className={`flex-row gap-2 bg-[${Colors.backgroundSecondary}] h-[50px] items-center justify-center pl-3 rounded-l-lg`}
              >
                <TogoFlag height={24} width={24} className="self-center" />
                <ThemedText>+228</ThemedText>
              </View>
              <TextInput
                value={phone}
                onChangeText={(value) => value.length <= 8 && setPhone(value)}
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
          <TermsOfServices />
        </View>
      </View>
      <StatusBar backgroundColor={Colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

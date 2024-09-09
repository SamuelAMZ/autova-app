import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import HeaderSetting from "@/components/HeaderSetting";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { ArrowLeft, InfoCircle } from "iconsax-react-native";
import { useEffect, useRef } from "react";
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInput,
  TextInputKeyPressEventData,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

export const VerifyCode = ({
  code,
  onChange,
  phone,
  onPress,
  isLoading,
}: {
  code: string[];
  onChange: (value: string[]) => void;
  phone: string;
  onPress: () => void;
  isLoading: boolean;
}) => {
  const inputs = useRef<TextInput[]>([]);

  const handleChangeText = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    onChange(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index]) {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
      const newCode = [...code];
      newCode[index - 1] = "";
      onChange(newCode);
    }
  };

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  return (
    <>
      <HeaderSetting>
        <View className="flex flex-row justify-start w-full items-center px-[16px] py-[30px] mb-[12px]">
          <Pressable
            onPress={() => {
              router.back();
            }}>
            <ArrowLeft size="28" color="#101828" />
          </Pressable>
        </View>
      </HeaderSetting>
      <View className="flex-1  px-4  bg-[#fff] " style={{ gap:64}}  >
        <View className="flex gap-[12px]">
          <ThemedText
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            className="text-[26px] text-[#101828]">
            We just sent you a code
          </ThemedText>
          <ThemedText className="text-[15px] text-[#344054]">
            Code sent to{" "}
            <ThemedText style={{ textDecorationLine: "underline" }}>
              228{phone}
            </ThemedText>{" "}
            unless you already have an account
          </ThemedText>
        </View>
        <View className="flex gap-[12px]">
          <View style={styles.container}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleChangeText(value, index)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.input}
                ref={(ref) => ((inputs.current[index] as any) = ref)} // Assign ref correctly
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
          <ThemedText
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            className="font-normal text-[14px] text-[#344054]">
            I didn’t receive a code{" "}
            <ThemedText
              style={{
                textDecorationLine: "underline",
                color: "#2E69E6",
              }}>
              Resend code
            </ThemedText>
          </ThemedText>
        </View>
        <View className="flex w-full gap-[20px] pb-11">
          <CustomButton
            isLoading={isLoading}
            title="Confirm"
            onPress={onPress}
          />
          <ThemedText
            style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            className="text-center text-[16px] text-[#2E69E6]">
            Back to login
            {/* <Link href={"auth/login"}>Login</Link> */}
          </ThemedText>
        </View>
        <StatusBar
          backgroundColor={Colors.textPrimary}
          barStyle="dark-content"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: "15%",
    height: 60,
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    textAlign: "center",
  },
});

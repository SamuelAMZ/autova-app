import CustomButton from "@/components/CustomButton";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import { useEffect, useRef } from "react";
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInput,
  TextInputKeyPressEventData,
  View,
  StyleSheet,
} from "react-native";

export const VerifyCode = ({
  code,
  onChange,
  phone,
  onPress,
}: {
  code: string[];
  onChange: (value: string[]) => void;
  phone: string;
  onPress: () => void;
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
    <View className="flex-1 w-full px-4 justify-center items-center gap-[36px]">
      <View className="flex gap-[12px]">
        <ThemedText
          style={{ fontFamily: "Poppins_600SemiBold" }}
          className="text-[26px] text-[#101828]"
        >
          We just sent you a code
        </ThemedText>
        <ThemedText className="text-[12px] text-[#344054]">
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
          style={{ fontFamily: "Poppins_500Medium" }}
          className="font-normal text-[14px] text-[#344054]"
        >
          I didn’t receive a code{" "}
          <ThemedText
            style={{
              textDecorationLine: "underline",
              color: "#2E69E6",
            }}
          >
            Resend code
          </ThemedText>
        </ThemedText>
      </View>
      <View className="flex w-full gap-[20px] pb-11">
        <CustomButton title="Confirm" onPress={onPress} />
        <ThemedText
          style={{ fontFamily: "Poppins_500Medium" }}
          className="text-center text-[16px] text-[#2E69E6]"
        >
          Already have an account?
          {/* <Link href={"auth/login"}>Login</Link> */}
        </ThemedText>
      </View>
      <StatusBar backgroundColor={Colors.textPrimary} barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    fontSize: 14,
    fontWeight: "300",
    color: "#000000",
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "gray",
  },
});

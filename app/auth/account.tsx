import { Text, View, StatusBar, TextInput } from "react-native";
import ThemedText from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import TermsOfServices from "@/components/TermsOfServices";
import { useEffect, useState } from "react";
import { toastify } from "@/constants/utils";
import { useSession } from "@/context/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Account() {
  const { signIn } = useSession();
  const { phone, token } = useLocalSearchParams();
  const [data, setData] = useState({ phone: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlainText, setIsPlainText] = useState(false);

  useEffect(() => {
    setData({ ...data, phone: phone.toString() });
  }, [phone]);

  const handleSignUp = async () => {
    try {
      if (!data.password) {
        return toastify("Invalid data", "Fill all fields");
      }
      console.log(data);
      
      setIsLoading(true);
      const result = await signIn(
        { ...data, phone: `228${phone}` },
        token.toString() ?? "token"
      );
      
      setIsLoading(false);
      if (result && result.status == 201) {
        return result && router.navigate("/(app)/(navs)");
      }
      if (result?.status == 409) {
        return toastify("Duplication error", "Account already exists");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      
      toastify("Ouppss!!", "Error while creating account. Try again");
    }
  };

  return (
    <>
      <View
        className={`flex-1 bg-[${Colors.textPrimary}] px-[15px] pt-[100px]`}>
        <View className="items-start gap-[32px]">
          <View className="flex gap-[12px] items-start">
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[15px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Step 2 of 2
            </ThemedText>
            <ThemedText
              className={`text-[${Colors.backgroundPrimary}] text-[28px] font-[600]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Create Your Account
            </ThemedText>
          </View>
          <View className="flex gap-[8px] items-start w-[100%]">
            <ThemedText
              className={`text-[14px] text-[${Colors.backgroundPrimary}]`}>
              You are registering with{" "}
              <Text
                className={`text-[${Colors.textHighlight}] underline`}
                style={{ color: Colors.textHighlight }}>
                +228{data.phone}
              </Text>
            </ThemedText>
            <ThemedText
              className={`text-[14px] text-[${Colors.backgroundPrimary}]`}>
              Want to change?{" "}
              <Text
                className={`text-[${Colors.textHighlight}] underline`}
                style={{ color: Colors.textHighlight }}>
                {" "}
                Click here{" "}
              </Text>
            </ThemedText>
          </View>
          <View className="flex gap-[20px] w-[100%]">
            <View className="flex gap-4">
              {/* <TextInput
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
              /> */}
              <TextInput
                onChangeText={(value) => setData({ ...data, password: value })}
                placeholder="Password"
                placeholderTextColor={Colors.textSecondary}
                className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
                secureTextEntry={isPlainText}
              />
              {data.password ? (
                <Ionicons
                  onPress={() => setIsPlainText(!isPlainText)}
                  name={`${isPlainText ? "eye-off-outline" : "eye-outline"}`}
                  size={24}
                  color="#344054"
                  className="absolute right-4 top-4 "
                />
              ) : null}
              <ThemedText
                className={`text-[${Colors.textSecondary}] text-[12px]`}>
                * Your password should be minimum 8 characters.
              </ThemedText>
            </View>
            <CustomButton
              isLoading={isLoading}
              title="Create account"
              textColor={Colors.textPrimary}
              onPress={handleSignUp}
            />
          </View>
          <TermsOfServices />
        </View>
      </View>
      <StatusBar backgroundColor={Colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

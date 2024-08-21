import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import ThemedText from "@/components/ThemedText";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

export default function SignUp() {
  return (
    <>
      <View
        className={`flex-1 bg-[${Colors.textPrimary}] px-[15px] pt-[100px] w-full`}>
        <View className="flex justify-between h-full pb-[50px]">
          <View className="items-start gap-[32px]">
            <View className="flex gap-[12px] items-start">
              <ThemedText
                className={`text-[${Colors.backgroundPrimary}] text-[15px] font-[600]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Step 1 of 2
              </ThemedText>
              <ThemedText
                className={`text-[${Colors.backgroundPrimary}] text-[28px] font-[600]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Create Your Account
              </ThemedText>
            </View>
            <View className="flex gap-[20px] w-[100%]">
              <View className="flex gap-[12px]">
                <TouchableOpacity
                  className={`border border-[${Colors.borderSecondary}] px-[32px] py-[20px] flex-row items-center justify-center gap-[12px] rounded-[28px]`}>
                  <Image
                    source={require("@/assets/Google.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <ThemedText
                    className="text-[16px] font-[600] text-center"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                    Continue with Google
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`border border-[${Colors.borderSecondary}] flex flex-row px-[32px] justify-center gap-[12px] py-[20px] rounded-[28px]`}>
                  <Image
                    source={require("@/assets/apple.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <ThemedText
                    className="text-[16px] font-[600]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                    Continue with Apple
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`border border-[${Colors.borderSecondary}] px-[32px] py-[20px] flex flex-row items-center justify-center gap-[12px] rounded-[28px]`}>
                  <Image
                    source={require("@/assets/fb.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <ThemedText
                    className="text-[16px] font-[600]"
                    style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                    Continue with Facebook
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.text}>Or Register with</Text>
                <View style={styles.line} />
              </View>
              <TextInput
                placeholder="Email address"
                placeholderTextColor={Colors.textSecondary}
                className={`bg-[${Colors.backgroundSecondary}] rounded-[12px] py-[16px] px-[20px]`}
              />
              <CustomButton
                title="Continue"
                onPress={() => {
                  router.navigate("/auth/account");
                }}
              />
            </View>
          </View>
          <View className="flex gap-[20px]">
            <ThemedText
              className={` text-[${Colors.textSecondary}] text-[13px] font-[400]`}>
              By signing up, you agree to our{" "}
              <ThemedText
                className={`text-[${Colors.textTertiary}] font-[500] underline`}  style={{ fontFamily:'SpaceGrotesk_500Medium'}}>
                {" "}
                Terms of Service{" "}
              </ThemedText>{" "}
              and{" "}
              <ThemedText
                className={`text-[${Colors.textTertiary}] font-[500] underline`}  style={{ fontFamily:'SpaceGrotesk_500Medium'}}>
                Privacy Policy
              </ThemedText>{" "}
              for creating your account.
            </ThemedText>
            <ThemedText
              className={` text-[${Colors.textSecondary}] text-[13px] font-[400]`}>
              Are you dealer? Create a{" "}
              <ThemedText
                className={`text-[${Colors.textTertiary}] font-[500]`}  style={{ fontFamily:'SpaceGrotesk_500Medium'}}>
                dealer account
              </ThemedText>{" "}
              instead.
            </ThemedText>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={Colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lineColor,
  },
  text: {
    fontSize: 15,
    color: Colors.textQuinary,
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "SpaceGrotesk_400Regular",
  },
});

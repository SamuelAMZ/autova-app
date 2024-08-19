import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import ThemedText from "@/components/ThemedText";

import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function SignUp() {
  return (
    <>
      <ScrollView className="flex-1 bg-[#fff] px-[15px] pt-[100px] w-full">
        <View className="items-start gap-[32px]">
          <View className="flex gap-[12px] items-start">
            <ThemedText
              className="text-[#070C0F] text-[15px] font-[600]"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Step 1 of 2
            </ThemedText>
            <ThemedText
              className="text-[#070C0F] text-[28px] font-[600]"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Create Your Account
            </ThemedText>
          </View>
          <View className="flex gap-[20px] w-[100%]">
            <View className="flex gap-[12px]">
              <TouchableOpacity className="border border-[#D8DADC] px-[32px] py-[20px] flex-row items-center justify-center gap-[12px] rounded-[28px]">
                <Image
                  source={require("@/assets/Google.png")}
                  style={{ width: 20, height: 20 }}
                />
                <ThemedText
                  className="text-[16px] font-[600] text-center"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Continue with Google
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#D8DADC] flex flex-row px-[32px] items-center justify-center gap-[12px] py-[20px] rounded-[28px]">
                <Image
                  source={require("@/assets/apple.png")}
                  style={{ width: 20, height: 20 }}
                />
                <ThemedText
                  className="text-[16px] font-[600]"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Continue with Apple
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#D8DADC] px-[32px] py-[20px] flex flex-row items-center justify-center gap-[12px] rounded-[28px]">
                <Image
                  source={require("@/assets/fb.png")}
                  style={{ width: 20, height: 20 }}
                />
                <ThemedText
                  className="text-[16px] font-[600]"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
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
              placeholderTextColor="#475467"
              className="bg-[#EFEFEF] rounded-[12px] py-[16px] px-[20px]"
            />
            <CustomButton
              title="Continue"
              onPress={() => {
                router.navigate("/auth/account");
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
            <ThemedText className=" text-[#475467] text-[13px] font-[400]">
              Are you dealer? Create a{" "}
              <ThemedText className="text-[#101828] font-[500]">
                dealer account
              </ThemedText>{" "}
              instead.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
    backgroundColor: "#ccc", // Couleur de la ligne
  },
  text: {
    fontSize: 15,
    color: "#1D2939", // Couleur du texte
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "PlusJakartaSans_400Regular",
  },
});

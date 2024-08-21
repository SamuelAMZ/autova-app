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

import { router } from "expo-router";

export default function Notif() {
  return (
    <>
      <View className="flex-1 bg-[#fff] px-[15px] py-[60px]">
        <View className="flex items-center justify-between h-full ">
          <View>
            <Image
              source={require("@/assets/notif.png")}
              style={{ width: 392, height: 392 }}
            />
            <View className="mt-[30px] flex gap-[12px]">
              <ThemedText
                className="text-[#070C0F] text-[28px] text-center font-[600]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Never Miss a Deal!
              </ThemedText>
              <ThemedText className="text-[15px] text-[#344054] text-center">
                Enable notifications to stay informed about new car listings,
                special offers, and important updates!
              </ThemedText>
            </View>
          </View>

          <View className="mt-[50px] flex gap-[12px] w-full">
            <TouchableOpacity className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%]">
              <ThemedText
                className="text-[17px] text-center font-[600] text-[#fff]"
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Enable notifications
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.navigate("/(app)/(navs)/");
              }}
              className="bg-[#fff] px-[20px]  py-[14px]  justify-center rounded-[12px] border border-[#D0D5DD]  ">
              <ThemedText
                className="text-[17px] text-center font-[500] text-[#101828]"
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Skip for now
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}

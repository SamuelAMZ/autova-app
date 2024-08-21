import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import ThemedText from "@/components/ThemedText";

import { router } from "expo-router";
import colors from "@/constants/Colors";

export default function Notif() {
  return (
    <>
      <View
        className={`flex-1 bg-[${colors.textPrimary}] px-[15px] py-[50px]`}>
        <View className="flex items-center justify-between h-full ">
          <View className="flex items-center">
            <Image
              source={require("@/assets/notif.png")}
              style={{ width: 392, height: 392 }}
            />
            <View className="mt-[10px] flex gap-[12px]">
              <ThemedText
                className={`text-[${colors.backgroundPrimary}] text-[28px] text-center font-[600]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Never Miss a Deal!
              </ThemedText>
              <ThemedText
                className={`text-[1.2rem] text-[${colors.textQuaternary}] text-center`}>
                Enable notifications to stay informed about new car listings,
                special offers, and important updates!
              </ThemedText>
            </View>
          </View>
          <View className="mt-[30px] flex gap-[12px] w-full">
            <TouchableOpacity
              className={`bg-[${colors.buttonPrimary}] px-[20px] py-[14px] rounded-[12px] w-[100%]`}>
              <ThemedText
                className={`text-[17px] text-center font-[600] text-[${colors.textPrimary}]`}
                style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                Enable notifications
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.navigate("/(app)/(navs)/");
              }}
              className={`bg-[${colors.textPrimary}] px-[20px] py-[14px] justify-center rounded-[12px] border border-[${colors.borderPrimary}]`}>
              <ThemedText
                className={`text-[17px] text-center font-[500] text-[${colors.textTertiary}]`}
                style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
                Skip for now
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={colors.textPrimary} barStyle="dark-content" />
    </>
  );
}

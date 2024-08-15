import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import ThemedText from "@/components/ThemedText";
export default function Index() {
  return (
    <>
      <View className="bg-[#070c0f] h-full items-center">
        <Image source={require("@/assets/images/car.png")} />
        <Image source={require("@/assets/images/Group.png")} style={{ width: 168, height:31}} />

        <LinearGradient
          colors={["#070c0f", "#070c0f", "#070c0f"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0.3, 0.9, 1]}
          style={{ flex: 1 }}>
          <View className="flex-1 items-center justify-between px-[15px] pb-[50px] ">
            <ThemedText className="text-[#fff] w-[60%] text-center text-[15px]">
              Verified cars, trusted history, and authentic users—all from your
              local area.
            </ThemedText>
            <View className="px-[15px] w-[73%] gap-4">
              <CustomButton title="Create an account" textFont='600'  onPress={() => { router.navigate('/auth/signup') }} />
              <CustomButton
                title="I already have an account"
                backgroundColor="#7878801F"
                onPress={() => {}}
                textFont='400'
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

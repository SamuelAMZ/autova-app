import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import ThemedText from "@/components/ThemedText";
import colors from "@/constants/Colors";

export default function Index() {
  return (
    <>
      <View
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
        className={`h-full items-center`}
      >
        <Image source={require("@/assets/images/car.png")} />
        <Image
          source={require("@/assets/images/Group.png")}
          style={{ width: 168, height: 31 }}
        />

        <LinearGradient
          colors={[
            colors.backgroundPrimary,
            colors.backgroundPrimary,
            colors.backgroundPrimary,
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0.3, 0.9, 1]}
          style={{ flex: 1 }}
          className="w-full"
        >
          <View
            style={{
              backgroundColor: colors.backgroundPrimary,
            }}
            className="flex-1 items-center justify-between px-[15px] pb-[50px] "
          >
            <ThemedText
              className={`text-[${colors.textPrimary}] text-center text-[15px]`}
            >
              Verified cars, trusted history, and authentic users—all from your
              local area.
            </ThemedText>
            <View className="w-full gap-4">
              <CustomButton
                title="Create an account"
                onPress={() => {
                  router.navigate("/auth/signup");
                }}
              />
              <CustomButton
                title="I already have an account"
                backgroundColor={colors.buttonBackground}
                onPress={() => {}}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

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

export default function Notif() {
  return (
    <>
      <ScrollView className="flex-1 bg-[#fff] px-[15px] pt-[100px]">
      <Image source={require("@/assets/Google.png")} />
      </ScrollView>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}

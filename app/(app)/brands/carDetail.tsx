import MySafeAreaView from "@/components/SafeAreaView";
import { ScrollView, View, Image } from "react-native";
import ThemedText from "@/components/ThemedText";

export default function CarDetail() {
  return (
    <>
      <MySafeAreaView>
        <ScrollView className="flex-1 px-[5%] pt-[1rem] pb-[1rem]"></ScrollView>
      </MySafeAreaView>
    </>
  );
}

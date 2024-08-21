import { View, FlatList } from "react-native";
import { router } from "expo-router";

import BrandCar from "./CarItem";
import { CarData } from "@/constants/CarData";
import ThemedText from "../ThemedText";

export default function RelatedCar() {
  return (
    <>
      <View className="flex gap-[10px]">
        <ThemedText className="text-[#1D2939] text-[20px] font-[600]">
          Related Cars
        </ThemedText>
        <FlatList
          data={CarData}
          renderItem={({ item }) => (
            <BrandCar
              imgHeight={140}
              car={item}
              onPress={() => router.navigate("/(app)/brands/carDetail")}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          scrollEnabled={true}
          horizontal={true}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 40 }} />}
        />
      </View>
    </>
  );
}

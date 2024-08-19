import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";

import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";

import { CarData } from "@/constants/CarData";
import CarItem from "@/components/cars/CarItem";

export default function Brand() {
  return (
    <View className="flex-1 bg-white">
      <CustomHeader />
      <ScrollView className="flex-1 px-[4%] pt-[1rem]">
        <FlatList
          data={CarData}
          renderItem={({ item }) => (
            <CarItem
              car={item}
              onPress={() => {
                router.navigate({
                  pathname: "/(app)/brands/carDetail",
                });
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: Platform.OS === "ios" ? 2 : 16 }} />
          )}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 40 }} />}
        />
      </ScrollView>
    </View>
  );
}

function CustomHeader({ title }: { title?: string }) {
  return (
    <Header>
      <View className="flex-row justify-start items-center gap-[13px] px-[4%] py-[16px]">
        <TouchableOpacity
          className="h-auto rounded-[100px] max-w-11 flex flex-row items-center justify-center bg-[#6C6BDB] p-[11px]"
          onPress={() => router.back()}
        >
          <ArrowLeft size={18} variant="Outline" color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText className="text-[#FFFFFF] text-[20px] font-[600]">
          Tesla Brand Cars
        </ThemedText>
      </View>
    </Header>
  );
}

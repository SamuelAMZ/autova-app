import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";

import BrandCar from "@/components/brands/car";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";

import { CarData } from "@/constants/CarData";

export default function Brand() {
  return (
    <View className="flex-1 bg-white">
      <CustomHeader />
      <ScrollView className="flex-1 px-[4%] pt-[1rem]">
        <FlatList
          data={CarData}
          renderItem={({ item }) => <BrandCar car={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
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
      <View className="flex-row justify-start items-center gap-[13px] px-[4%] py-[18px]">
        <TouchableOpacity
          style={{
            maxWidth: 45,
            height: "auto",
            borderRadius: 100,
          }}
          className="flex flex-row items-center justify-center bg-[#6C6BDB] p-[11px]"
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

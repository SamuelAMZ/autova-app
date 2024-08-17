import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ArrowLeft } from "iconsax-react-native";

import MySafeAreaView from "@/components/SafeAreaView";
import BrandCar from "@/components/brands/car";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";

export default function Brand() {
  return (
    <MySafeAreaView>
      <View className="flex-1 bg-white">
        <CustomHeader />
        <ScrollView className="flex-1 px-[5%] pt-[1rem]">
          <FlatList
            data={data}
            renderItem={({ item }) => <BrandCar car={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        </ScrollView>
      </View>
    </MySafeAreaView>
  );
}

function CustomHeader({ title }: { title?: string }) {
  return (
    <Header className="">
      <View className="flex-row justify-start items-center gap-[13px] px-[12px] py-[8px]">
        <TouchableOpacity
          style={{
            maxWidth: 45,
            height: "auto",
            borderRadius: 100,
          }}
          className="flex flex-row items-center justify-center bg-[#6C6BDB] p-[8px]"
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText className="text-[#FFFFFF] text-[20px] font-[600]">
          Tesla Brand Cars
        </ThemedText>
      </View>
    </Header>
  );
}

import teslaS from "@/assets/cars/teslaS.png";
import teslaX from "@/assets/cars/teslaX.png";
import teslaY from "@/assets/cars/teslaY.png";

const data = [
  {
    img: teslaS,
    name: "Tesla Model S",
    year: "2024",
    label: "After Est. Gas Savings $6,500",
    price: " $68,490",
  },
  {
    img: teslaX,
    name: "Tesla Model X",
    year: "2024",
    label: "After Est. Gas Savings $6,500",
    price: " $68,490",
  },
  {
    img: teslaY,
    name: "Tesla Model Y",
    year: "2024",
    label: "After Est. Gas Savings $6,500",
    price: " $68,490",
  },
];

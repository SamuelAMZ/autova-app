import BrandItem from "@/components/BrandItem";
import CarItem from "@/components/CarItem";
import FilterTag from "@/components/FilterTag";
import Header from "@/components/Header";
import { Notification } from "iconsax-react-native";
import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import AppIcon from "@/assets/icons/app-logo.svg";
import SearchCard from "@/components/SearchCard";
import { router } from "expo-router";

const HomePage = () => {
  return (
    <View className="flex-1">
      <CustomHeader />
      <ScrollView className="pt-4">
        <View className="px-[16px] flex-1 flex-row justify-between items-end">
          <Text className="font-semibold text-[18px]">Featured Dealers</Text>
          <Text className="text-[#007AFF] font-medium">View All</Text>
        </View>
        <FlatList
          className="my-5 px-[16px]"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ item }) => <BrandItem />}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          // keyExtractor={(item) => item}
        />

        <FlatList
          className="px-[16px]"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ index, item }) => (
            <FilterTag title="Title" active={index == 0} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          // keyExtractor={(item) => item}
        />

        <FlatList
          className="my-5 px-[16px]"
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ index, item }) => <CarItem />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;

function CustomHeader() {
  return (
    <Header className="flex flex-col justify-between items-center p-[16px] min-h-[126]">
      <View className="w-full flex-row items-center justify-between mb-[15]">
        <View className="items-center flex-row">
          <AppIcon height={36} />
        </View>
        <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
          <Notification color="white" size={20} />
        </View>
      </View>
      <SearchCard></SearchCard>
    </Header>
  );
}

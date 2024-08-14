import BrandItem from "@/components/BrandItem";
import CarItem from "@/components/CarItem";
import FilterTag from "@/components/FilterTag";
import Header from "@/components/Header";
import { Car, Notification } from "iconsax-react-native";
import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

const HomePage = () => {
  return (
    <View className="flex-1">
      <Header>
        <View className="flex-1 flex-row items-center justify-between">
          <View className="items-center flex-row">
            <Car size={25} color="white" />
            <Text className="pl-2 text-[26px] font-extrabold text-white">
              CARNEXT+
            </Text>
          </View>
          <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
            <Notification color="white" size={20} />
          </View>
        </View>
      </Header>
      <ScrollView className="mt-4 px-[16px]">
        <View className="flex-1 flex-row justify-between items-end">
          <Text className="font-semibold text-[18px]">Featured Dealers</Text>
          <Text className="text-[#007AFF] font-medium">View All</Text>
        </View>
        <FlatList
          className="my-5"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ item }) => <BrandItem />}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          // keyExtractor={(item) => item}
        />

        <FlatList
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
          className="my-5"
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ index, item }) => <CarItem />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          // keyExtractor={(item) => item}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;

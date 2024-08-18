import BrandItem from "@/components/BrandItem";
import CarItem from "@/components/CarItem";
import FilterTag from "@/components/FilterTag";
import Header from "@/components/Header";
import { CloseCircle, Notification } from "iconsax-react-native";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

import { useWindowDimensions } from "react-native";

import AppIcon from "@/assets/icons/app-logo.svg";
import SearchCard from "@/components/SearchCard";
import { router } from "expo-router";
import ThemedText from "@/components/ThemedText";
import { HorizontalSeperator, VerticalSeperator } from "@/components/Separator";
import { CarData } from "@/constants/CarData";
import BrandCar from "@/components/brands/car";

const HomePage = () => {
  const [isSheetOpened, setIsSheetOpened] = useState(false);
  const height = Dimensions.get("window").height;
  const { width } = useWindowDimensions();

  const openCloseModalSheet = () => {
    setIsSheetOpened(!isSheetOpened);
  };

  return (
    <View
      style={{
        maxWidth: width,
      }}
      className="flex-1 bg-[#FFFFFF]"
    >
      <CustomHeader />
      <ScrollView className="pt-4">
        <View className="flex gap-[20px]">
          <View className="px-[4%] flex-1 flex-row justify-between items-end">
            <ThemedText className="font-semibold text-[18px]">
              Featured Dealers
            </ThemedText>
            <TouchableOpacity onPress={openCloseModalSheet}>
              <ThemedText className="text-[#007AFF] font-medium">
                View All
              </ThemedText>
            </TouchableOpacity>
          </View>
          <FlatList
            className="px-[4%]"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({ length: 12 })}
            renderItem={({ item }) => (
              <BrandItem w={65} h={65} onPress={() => {}} />
            )}
            ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
          />

          <FlatList
            className="px-[4%]"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[{}, {}, {}, {}, {}, {}, {}]}
            renderItem={({ index, item }) => (
              <FilterTag title="Title" active={index == 0} />
            )}
            ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
          />

          {/* <FlatList
          className="my-5 p-[8px]"
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({ index, item }) => <CarItem />}
          ItemSeparatorComponent={() => <VerticalSeperator size={20} />}
          scrollEnabled={false}
        /> */}

          <FlatList
            className="px-[4%]"
            data={CarData}
            renderItem={({ item }) => (
              <BrandCar
                car={item}
                onPress={() => router.navigate("/(app)/brands/carDetail")}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        </View>
      </ScrollView>
      <Modal
        statusBarTranslucent
        visible={isSheetOpened}
        transparent
        className="relative"
      >
        <View
          style={{ maxHeight: height - 80 }}
          className="absolute bottom-0 right-0 left-0 bg-white rounded-t-2xl"
        >
          <View className="w-full flex-row justify-between items-center py-5 px-4">
            <ThemedText className="font-semibold text-[18px]">
              Top Brands
            </ThemedText>
            <TouchableOpacity onPress={openCloseModalSheet}>
              <CloseCircle size={26} variant="Bold" color="grey" />
            </TouchableOpacity>
          </View>
          <FlatList
            className="flex-1 py-3"
            data={Array.from({ length: 8 })}
            numColumns={4}
            keyExtractor={(item, index) => "#" + index}
            renderItem={() => (
              <BrandItem
                w={70}
                h={70}
                onPress={() => {
                  router.navigate("/brands");
                }}
              />
            )}
            ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HomePage;

function CustomHeader() {
  return (
    <Header className="flex flex-col justify-between items-center px-[4%] py-[22px]">
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

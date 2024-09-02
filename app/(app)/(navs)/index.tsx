import { Notification, SearchNormal1 } from "iconsax-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import AppIcon from "@/assets/icons/app-logo.svg";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";

import BrandItem from "@/components/BrandItem";
import CarItem from "@/components/cars/CarItem";
import CarHome from "@/components/cars/CarHome";
import FilterTag from "@/components/FilterTag";
import ThemedText from "@/components/ThemedText";
import SearchCard from "@/components/searchCard/SearchCard";
import { HorizontalSeperator, VerticalSeperator } from "@/components/Separator";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { CarData } from "@/constants/CarData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import Colors from "@/constants/Colors";

import { loadBrands } from "@/utils/loadBrands";
import { BrandItemSkeleton } from "@/components/skeleton/BrandItemSkeleton";

const HomePage = () => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["70%", "80%", "90%"], []);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // load brands
  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: loadBrands,
  });

  // console.log(brandQuery, "brandQuery");

  return (
    <View className={`flex-1 bg-[${Colors.background}]`}>
      <View
        style={{ paddingTop: insets.top + 10, paddingBottom: 20 }}
        className="px-4 w-full flex-row items-center justify-between"
      >
        <View className="items-center flex-row">
          <AppIcon height={36} />
        </View>
        <TouchableOpacity
          onPress={() => router.navigate("/(app)/search/carSearch")}
          className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
        >
          <SearchNormal1 size="20" color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false}>
        <Animated.View className="w-full px-[16px] pb-[30px]">
          <SearchCard></SearchCard>
        </Animated.View>
        <View className="flex gap-[30px] bg-white">
          <View className="px-[4%] flex-1 flex-row justify-between items-end mt-[30px]">
            <ThemedText
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
              }}
              className="font-semibold text-[18px]"
            >
              Featured Dealers
            </ThemedText>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <ThemedText className="text-[#007AFF] font-medium">
                View All
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Brands Items */}
          {brandQuery.isLoading ? (
            <View className="w-full px-4">
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={Array.from({ length: 10 })}
                renderItem={() => <BrandItemSkeleton />}
                ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
              />
            </View>
          ) : (
            <View className="w-full px-4">
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={brandQuery?.data}
                renderItem={({ item }) => (
                  <BrandItem size={70} onPress={() => {}} brand={item} />
                )}
                ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
              />
            </View>
          )}

          {/* Filter tags */}
          {/*  <View className="w-full px-4">
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={[{}, {}, {}, {}, {}, {}]}
              renderItem={({ index, item }) => (
                <FilterTag title="Title" active={index == 0} />
              )}
              ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
            />
          </View> */}

          {/* Car Items */}
          <FlatList
            className="px-[4%]"
            data={CarData}
            renderItem={({ item }) => (
              <CarHome
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
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        </View>
      </ScrollView>
      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        snapPoints={snapPoints}
        index={1}
      >
        <View
          style={{
            paddingTop: 14,
            paddingBottom: 30,
          }}
          className="w-full flex-row justify-between items-center px-4"
        >
          <ThemedText
            style={{
              fontFamily: "SpaceGrotesk_600SemiBold",
            }}
            className="font-semibold text-[18px]"
          >
            Top Brands
          </ThemedText>
          <TouchableOpacity onPress={handleCloseModal}>
            <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
              <AntDesign name="close" size={16} color="#3D3D3D" />
            </View>
          </TouchableOpacity>
        </View>

        {brandQuery.isLoading ? (
          <FlatList
            data={Array.from({ length: 8 })}
            numColumns={4}
            keyExtractor={(item, index) => "#" + index}
            renderItem={() => <BrandItemSkeleton />}
            ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
          />
        ) : (
          <FlatList
            data={brandQuery?.data}
            numColumns={4}
            keyExtractor={(item, index) => "#" + index}
            renderItem={({ item }) => (
              <BrandItem
                size={70}
                onPress={() => {
                  handleCloseModal();
                  router.navigate("/brands");
                }}
                brand={item}
              />
            )}
            ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
          />
        )}
      </CustomBottomSheetModal>
      <StatusBar style="light" translucent />
    </View>
  );
};

export default HomePage;

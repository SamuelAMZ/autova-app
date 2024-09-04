import { SearchNormal1 } from "iconsax-react-native";
import React, { useMemo } from "react";
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
import CarHome from "@/components/cars/CarHome";
import ThemedText from "@/components/ThemedText";
import SearchCard from "@/components/searchCard/SearchCard";
import { HorizontalSeperator, VerticalSeperator } from "@/components/Separator";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { CarData } from "@/constants/CarData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import Colors from "@/constants/Colors";
import postReq from "@/constants/postReq";

import { loadBrands } from "@/utils/loadBrands";
import { BrandItemSkeleton } from "@/components/skeleton/BrandItemSkeleton";
import { ErrorLoadingData } from "@/components/ErrorLoading";

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
          ) : null}
          {brandQuery.isSuccess ? (
            <View className="w-full px-4">
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={brandQuery?.data?.data}
                renderItem={({ item }) => (
                  <BrandItem size={70} onPress={() => {}} brand={item} />
                )}
                ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
              />
            </View>
          ) : null}

          {brandQuery.isError ? (
            <ErrorLoadingData refetch={brandQuery.refetch} />
          ) : null}

          {/* Car Items */}
          {/* <FlatList
            className="px-[4%]"
            data={listingCarsQuery?.data?.data}
            renderItem={({ item }) => (
              <CarHome
                car={item}
                onPress={() => {
                  router.navigate({
                    pathname: "/(app)/brands/carDetail",
                    params: {
                      carId: item._id,
                    },
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
          /> */}

          <View className="px-[4%]">
            <CarHome />
          </View>
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
        ) : null}
        {brandQuery.isSuccess ? (
          <View className="w-full px-4">
            <FlatList
              data={brandQuery?.data?.data}
              numColumns={4}
              keyExtractor={(item, index) => "#" + index}
              renderItem={({ item }) => (
                <View className="mr-7">
                  <BrandItem
                    size={70}
                    onPress={() => {
                      handleCloseModal();
                      router.navigate("/brands");
                    }}
                    brand={item}
                  />
                </View>
              )}
              ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
            />
          </View>
        ) : null}

        {brandQuery.isError ? (
          <ErrorLoadingData refetch={brandQuery.refetch} />
        ) : null}
      </CustomBottomSheetModal>
      <StatusBar style="light" translucent />
    </View>
  );
};

export default HomePage;

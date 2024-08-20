import { Notification } from "iconsax-react-native";
import React, { useMemo, useRef } from "react";
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

import BrandItem from "@/components/BrandItem";
import CarItem from "@/components/cars/CarItem";
import FilterTag from "@/components/FilterTag";
import ThemedText from "@/components/ThemedText";
import SearchCard from "@/components/SearchCard";
import { HorizontalSeperator, VerticalSeperator } from "@/components/Separator";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { CarData } from "@/constants/CarData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomePage = () => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["70%", "80%", "100%"], []);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1 bg-[#5856D6]">
      <View
        style={{ paddingTop: insets.top, paddingBottom: 10 }}
        className="px-4 w-full flex-row items-center justify-between"
      >
        <View className="items-center flex-row">
          <AppIcon height={36} />
        </View>
        <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
          <Notification color="white" size={20} />
        </View>
      </View>
      <ScrollView>
        <View className="w-full px-4 pb-4">
          <SearchCard></SearchCard>
        </View>
        <View className="flex gap-[20px] bg-white">
          <View className="px-[4%] flex-1 flex-row justify-between items-end mt-4">
            <ThemedText
              style={{
                fontFamily: "Poppins_600SemiBold",
              }}
              className="font-semibold text-[18px]"
            >
              Featured Dealers
            </ThemedText>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <ThemedText className="text-[#007AFF] font-medium text-[15px]">
                View All
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Brands Items */}
          <View className="w-full px-4">
            <FlatList
              // className="px-[4%]"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Array.from({ length: 12 })}
              renderItem={({ item }) => (
                <BrandItem size={70} onPress={() => {}} />
              )}
              ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
            />
          </View>

          {/* Filter tags */}
          <View className="w-full px-4">
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
          </View>

          {/* Car Items */}
          <FlatList
            className="px-[4%]"
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
            // initialNumToRender={5}
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
          className="w-full flex-row justify-between items-center px-[4%] "
        >
          <ThemedText
            style={{
              fontFamily: "Poppins_600SemiBold",
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
        <FlatList
          data={Array.from({ length: 8 })}
          numColumns={4}
          keyExtractor={(item, index) => "#" + index}
          renderItem={() => (
            <BrandItem
              size={70}
              onPress={() => {
                handleCloseModal();
                router.navigate("/brands");
              }}
            />
          )}
          ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
        />
      </CustomBottomSheetModal>
      <StatusBar style="light" translucent />
    </View>
  );
};

export default HomePage;

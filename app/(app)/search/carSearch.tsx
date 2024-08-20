import { router } from "expo-router";
import { ArrowLeft, SearchNormal, Setting5 } from "iconsax-react-native";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CarItem from "@/components/cars/CarItem";
import Header from "@/components/Header";
import {
  BodyStylesSearch,
  MakeModelsSearch,
  PriceRangeSearch,
} from "@/components/SearchCard";
import ThemedText from "@/components/ThemedText";
import { CarData } from "@/constants/CarData";

import CustomBottomSheetModal from "@/components/BottomSheetModal";

import AntDesign from "@expo/vector-icons/AntDesign";

const CarSearchScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["70%", "80%", "100%"], []);

  // callbacks
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <View className="flex-1 bg-white">
        <Header>
          <View className="flex-row justify-start items-center gap-[13px] px-[4%] py-[16px]">
            <TouchableOpacity
              className="h-auto rounded-[100px] max-w-11 flex flex-row items-center justify-center bg-[#6C6BDB] p-[11px]"
              onPress={() => router.back()}
            >
              <ArrowLeft size={18} variant="Outline" color="#FFFFFF" />
            </TouchableOpacity>
            <ThemedText className="text-[#FFFFFF] text-[20px] font-[600]">
              Cars by body styles
            </ThemedText>
          </View>
        </Header>

        <ScrollView className="flex-1">
          <View className="px-4 my-5 flex-row gap-3">
            <View className="flex-1 flex-row items-center gap-2 px-4 h-[48] border border-[#D0D5DD] rounded-xl">
              <SearchNormal color="#1D2939" />
              <TextInput
                className="flex-1"
                placeholder="Search..."
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className="justify-center items-center border h-[48] w-[48] border-[#D0D5DD] rounded-xl"
            >
              <Setting5 color="#1D2939" />
            </TouchableOpacity>
          </View>

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
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            // initialNumToRender={5}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        </ScrollView>
      </View>

      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        snapPoints={snapPoints}
        index={1}
      >
        <View className="w-full px-[4%]">
          <View className="py-5 flex-row justify-between items-center ">
            <ThemedText className="text-[20px] font-[600] text-[#000000]">
              Filter Search
            </ThemedText>
            <TouchableOpacity onPress={handleCloseModal}>
              <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                <AntDesign name="close" size={16} color="#3D3D3D" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="h-[100%] bg-[#F2F4F7] p-4 w-full">
            <ThemedText className="text-[#475467] font-semibold text-[16px] mb-4">
              Body Styles
            </ThemedText>
            <BodyStylesSearch />
            <ThemedText className="text-[#475467] font-semibold text-[16px] mt-2">
              Price Range
            </ThemedText>
            <PriceRangeSearch />
            <ThemedText className="text-[#475467] font-semibold text-[16px] mb-4">
              Make & Model
            </ThemedText>
            <MakeModelsSearch />
          </View>
        </View>
      </CustomBottomSheetModal>
    </>
  );
};

export default CarSearchScreen;

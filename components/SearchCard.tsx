import { PropsWithChildren, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import RangeSlider from "./RangeSlider";
import ThemedText from "./ThemedText";
import { router } from "expo-router";
import { searchTypesData } from "@/constants/searchTypes";
import { ArrowDown2, Chainlink } from "iconsax-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import CustomBottomSheetModal from "@/components/BottomSheetModal";

export interface SearchTypeProps {
  label: string;
  value: string;
}

const SearchCard = ({ children }: PropsWithChildren) => {
  const snapPoints = useMemo(() => ["25%", "35%", "50%", "90%"], []);

  const types = searchTypesData;
  const [searchType, setSearchType] = useState<SearchTypeProps>(types[0]);

  // callbacks
  const handleTypeChange = (idx: number) => {
    setSearchType(types.at(idx)!);
    handleCloseModal();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="bg-[#F2F4F7] w-full p-3 rounded-xl">
      <View className="w-full mb-3 flex-row items-center gap-3">
        <Text className="text-[#101828] text-[18px] font-semibold">
          Search cars by:
        </Text>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          className="flex-1 flex-row gap-2 items-center z-10 py-2"
        >
          <Text className="text-[#475467] text-[15px]">{searchType.label}</Text>
          <ArrowDown2 color="#475467" variant="Bold" size={18} />
        </TouchableOpacity>
      </View>
      <SearchContent type={searchType.value} />
      <CustomButton
        title="Search"
        onPress={() => router.navigate("/(app)/search/carSearch")}
      />

      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        snapPoints={snapPoints}
        index={1}
      >
        <View className="w-full px-[4%]">
          <View className="p-3 flex-row justify-between items-center">
            <ThemedText className="text-[18px]">Choose item</ThemedText>
            <TouchableOpacity onPress={handleCloseModal}>
              <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                <AntDesign name="close" size={16} color="#3D3D3D" />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={types}
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => handleTypeChange(item.index)}
                style={{
                  borderTopWidth: 1,
                  paddingVertical: 14,
                  borderColor: "#F2F4F7",
                }}
                className="p-3 flex-row gap-3 items-center"
              >
                <Chainlink color="#475467" variant="Bold" />
                <ThemedText className="text-[#475467]">
                  {item.item.label}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default SearchCard;

const SearchContent = ({ type }: { type: string }) => {
  return type === "model" ? (
    <MakeModelsSearch />
  ) : type === "price" ? (
    <PriceRangeSearch />
  ) : type == "body" ? (
    <BodyStylesSearch />
  ) : (
    <View className=""></View>
  );
};

export const MakeModelsSearch = () => {
  return (
    <View className="mb-3 flex-row justify-between">
      <View className="bg-white h-[80] w-[47%] shadow-sm rounded-lg">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">Make</ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Any Make
          </ThemedText>
        </View>
      </View>
      <View className="bg-white h-[80] w-[47%] shadow-sm rounded-lg">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Model
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Any Model
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export const PriceRangeSearch = () => {
  return (
    <View className="w-full z-0">
      <RangeSlider from={0} to={500000} />
      <View className="w-full flex-row justify-between my-4">
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">$0k</ThemedText>
        </View>
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">
            $50,000,00
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export const BodyStylesSearch = () => {
  return (
    <View className="mb-3 flex-col justify-between">
      <View style={{
        height:90
      }} className="bg-white w-full shadow-sm rounded-lg">
        <View className="h-[45%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Doors
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="flex-row h-[50%] w-full justify-between items-center px-3">
          {Array.from({ length: 5 }, (v, i) => (
            <View
              key={i}
              className="h-[30] w-[30] border border-[#D0D5DD] rounded-3xl justify-center items-center"
            >
              <ThemedText className="text-[#344054] font-semibold">
                {i + 2}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
      <View className="bg-white h-[80] w-full shadow-sm rounded-lg mt-3">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Body Type
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Convertible
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

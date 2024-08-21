import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { searchTypesData } from "@/constants/searchTypes";
import { ArrowDown2 } from "iconsax-react-native";
import SelectSearchTypeModal, { SearchTypeProps } from "./typSearchModals";
import MakeModelsSearch from "./makeModelSearch";
import PriceRangeSearch from "./priceRangeSearch";
import BodyStylesSearch from "./bodyStyleSearch";

const SearchCard = () => {
  const snapPoints = useMemo(() => ["25%", "35%", "50%", "90%"], []);
  const [searchType, setSearchType] = useState<SearchTypeProps>(
    searchTypesData[0]
  );

  // callbacks
  const handleTypeChange = (idx: number) => {
    setSearchType(searchTypesData.at(idx)!);
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

      <SelectSearchTypeModal
        isModalVisible={isModalVisible}
        selected={searchType}
        handleCloseModal={handleCloseModal}
        snapPoints={snapPoints}
        handleTypeChange={handleTypeChange}
      />
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

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
    <View className="bg-[#F2F4F7] w-full p-4 rounded-xl">
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
      <View className="mt-1"></View>
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

const initialFilterData = {
  selectedMakeItem: undefined,
  selectedModelItem: undefined,
  selectedBodyItem: undefined,
  rangeValue: { low: 0, high: 500000 },
  carDoors: 0,
};

const SearchContent = ({ type }: { type: string }) => {
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);

  // Make & Model Props change
  const handleMakeModalChange = (type: string, item: ItemDataProps) => {
    if (type == "models") {
      setFilterData({ ...filterData, selectedModelItem: item });
    } else {
      setFilterData({ ...filterData, selectedMakeItem: item });
    }
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    setFilterData({ ...filterData, rangeValue: { low, high } });
  };

  // Body Styles props change
  const handleBodyStyleChange = (item: ItemDataProps | number) => {
    if (typeof item == "number") {
      setFilterData({ ...filterData, carDoors: item });
    } else {
      setFilterData({ ...filterData, selectedBodyItem: item });
    }
  };

  return type === "model" ? (
    <MakeModelsSearch
      selectedModelItem={filterData.selectedModelItem}
      selectedMakeItem={filterData.selectedMakeItem}
      onChange={handleMakeModalChange}
    />
  ) : type === "price" ? (
    <PriceRangeSearch
      rangeValue={filterData.rangeValue}
      onValueChange={handlePriceRangeChange}
    />
  ) : type == "body" ? (
    <BodyStylesSearch
      selectedItem={filterData.selectedBodyItem}
      carDoors={filterData.carDoors}
      onBodyValueChange={handleBodyStyleChange}
    />
  ) : (
    <View className=""></View>
  );
};

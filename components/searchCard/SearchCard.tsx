import { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import { router, useFocusEffect } from "expo-router";
import { searchTypesData } from "@/constants/searchTypes";
import { ArrowDown2 } from "iconsax-react-native";
import SelectSearchTypeModal, { SearchTypeProps } from "./typSearchModals";
import { initialFilterData } from "@/constants";
import { FilterDataProps, ItemDataProps } from "@/constants/types";
import SearchContent from "./searchContent";
import ThemedText from "../ThemedText";
import { useTranslation } from "react-i18next";

function SearchCard() {
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["25%", "35%", "50%", "90%"], []);
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);
  const [searchType, setSearchType] = useState<SearchTypeProps>(
    searchTypesData[0]
  );

  useFocusEffect(
    useCallback(() => {
      setFilterData(initialFilterData);
    }, [])
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

  // Make & Model Props change
  const handleMakeModalChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type != undefined && type == "models") {
      setFilterData({ ...filterData, selectedModel: item });
    } else {
      setFilterData({ ...filterData, selectedMake: item });
    }
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    setFilterData({ ...filterData, rangeValue: { low, high } });
  };

  // Engine Type & Transmission Props change
  const handleEngTransChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type != undefined && type == "transmissions") {
      setFilterData({ ...filterData, selectedTransmission: item });
    } else {
      setFilterData({ ...filterData, selectedEngineType: item });
    }
  };

  return (
    <View className="bg-[#F2F4F7] w-full p-4 rounded-xl">
      <View className="w-full mb-3 flex-row items-center gap-3">
        <ThemedText className="text-[#101828] text-[18px] font-semibold">
          {t("components.searchCarsBy.title")}:
        </ThemedText>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          className="flex-1 flex-row gap-2 items-center z-10 py-2 "
        >
          <ThemedText className="text-[#475467] text-[15px]">
            {t(`components.searchCarsBy.${searchType.translateKey}`)}
          </ThemedText>
          <ArrowDown2 color="#475467" variant="Bold" size={18} />
        </TouchableOpacity>
      </View>
      <SearchContent
        type={searchType.value}
        filterData={filterData}
        onMakeModalChange={handleMakeModalChange}
        onPriceRangeChange={handlePriceRangeChange}
        onEngTransChange={handleEngTransChange}
      />
      <View className="mt-1"></View>
      {/* Search */}
      <CustomButton
        title={t("components.searchCarsBy.buttonTitle")}
        onPress={() =>
          router.navigate({
            pathname: "/(app)/search/carSearch",
            params: { searchData: JSON.stringify(filterData) },
          })
        }
      />

      {/* Option Modal */}
      <SelectSearchTypeModal
        isModalVisible={isModalVisible}
        selected={searchType}
        handleCloseModal={handleCloseModal}
        snapPoints={snapPoints}
        handleTypeChange={handleTypeChange}
      />
    </View>
  );
}

export default SearchCard;

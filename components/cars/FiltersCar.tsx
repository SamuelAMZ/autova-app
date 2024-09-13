import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import Colors from "@/constants/Colors";
import MakeModelsSearch from "@/components/searchCard/makeModelSearch";
import PriceRangeSearch from "@/components/searchCard/priceRangeSearch";
import OtherFilterSearch from "@/components/searchCard/OtherFilterSearch";
import CustomButton from "@/components/CustomButton";
import Icon from "@expo/vector-icons/AntDesign";
import { ArrowDown2 } from "iconsax-react-native";
import { FilterDataProps, ItemDataProps } from "@/constants/types";
import { useTranslation } from "react-i18next";

const OpenCloseItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full flex-row items-center justify-between my-4"
    >
      <ThemedText
        className={`text-[${Colors.textSecondary}] font-semibold text-[16px] `}
      >
        {title}
      </ThemedText>
      <ArrowDown2 variant="Bold" color="#101828" size={18} />
    </TouchableOpacity>
  );
};

interface CustomBottomSheetModalProps {
  filterData: FilterDataProps;
  itemIsOpen: any;
  handleOpenItem: (type: string) => void;
  handleMakeModalChange: (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => void;
  handleEngTransChange: (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => void;
  handlePriceRangeChange: (low: number, high: number) => void;
  onReset: () => void;
  refetchListing: () => void;
  setIsModalVisible: (value: boolean) => void;
  handleCloseModal: () => void;
}

const FiltersCarComponent: React.FC<CustomBottomSheetModalProps> = ({
  filterData,
  itemIsOpen,
  handleOpenItem,
  handleMakeModalChange,
  handleEngTransChange,
  handlePriceRangeChange,
  onReset,
  refetchListing,
  setIsModalVisible,
  handleCloseModal,
}) => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 w-full z-0">
      <View className="flex-1 w-full z-0">
        <View className="py-5 px-[4%] flex-row justify-between items-center ">
          <ThemedText
            className={`text-[20px] font-[600] text-[${Colors.textSenary}]`}
          >
            {t("components.filterSearch.title")}
          </ThemedText>
          <TouchableOpacity onPress={handleCloseModal}>
            <View
              className={`bg-[${Colors.backgroundTertiary}] rounded-full p-[6px]`}
            >
              <AntDesign name="close" size={16} color={Colors.iconPrimary} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          className={`flex-1 bg-[${Colors.backgroundQuaternary}] p2-3 px-4 w-full`}
        >
          <OpenCloseItem
            title={t("components.filterSearch.makeModel")}
            onPress={() => handleOpenItem("makeModel")}
          />
          {itemIsOpen.makeModel && (
            <MakeModelsSearch
              selectedModel={filterData.selectedModel}
              selectedMake={filterData.selectedMake}
              onChange={handleMakeModalChange}
            />
          )}

          {/* Price Range */}
          <OpenCloseItem
            title={t("components.filterSearch.priceRange")}
            onPress={() => handleOpenItem("priceRange")}
          />
          <View className="z-20">
            {itemIsOpen.priceRange && (
              <PriceRangeSearch
                style={{ zIndex: 30 }}
                rangeValue={filterData.rangeValue}
                onValueChange={handlePriceRangeChange}
              />
            )}
          </View>

          {/* E Type, Trans */}
          <OpenCloseItem
            title={t("components.filterSearch.engineTypeTransmission")}
            onPress={() => handleOpenItem("others")}
          />
          {itemIsOpen.others && (
            <OtherFilterSearch
              selectedTransmission={filterData.selectedTransmission}
              selectedEngineType={filterData.selectedEngineType}
              onChange={handleEngTransChange}
            />
          )}
        </View>
        <View
          style={{ bottom: Platform.OS == "ios" ? 40 : 30 }}
          className="px-4 flex-row mt-4 gap-3 absolute self-center"
        >
          <View className="flex-1">
            <CustomButton
              onPress={() => {
                refetchListing();
                setIsModalVisible(false);
              }}
              title={t("components.filterSearch.searchButton")}
            />
          </View>
          <TouchableOpacity
            onPress={() => onReset()}
            className="h-[48] w-[48] bg-[red] rounded-xl justify-center items-center"
          >
            <Icon name="close" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FiltersCarComponent;

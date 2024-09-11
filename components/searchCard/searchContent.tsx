import { View } from "react-native";
import BodyStylesSearch from "./bodyStyleSearch";
import PriceRangeSearch from "./priceRangeSearch";
import MakeModelsSearch from "./makeModelSearch";
import { FilterDataProps, ItemDataProps } from "@/constants/types";
import OtherFilterSearch from "./OtherFilterSearch";

const SearchContent = ({
  type,
  filterData,
  onMakeModalChange,
  onPriceRangeChange,
  onEngTransChange,
}: {
  type: string;
  filterData: FilterDataProps;
  onMakeModalChange: (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => void;
  onPriceRangeChange: (low: number, high: number) => void;
  onEngTransChange: (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => void;
}) => {
  // Make & Model Props change
  const handleMakeModalChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    onMakeModalChange(type, item);
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    onPriceRangeChange(low, high);
  };

  // EngineType & Transmission Props change
  const handleEngTransChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    onEngTransChange(type, item);
  };

  return type === "model" ? (
    <MakeModelsSearch
      selectedModel={filterData.selectedModel}
      selectedMake={filterData.selectedMake}
      onChange={handleMakeModalChange}
    />
  ) : type === "price" ? (
    <View className="mb-3">
      <PriceRangeSearch
        rangeValue={filterData.rangeValue}
        onValueChange={handlePriceRangeChange}
      />
    </View>
  ) : type == "others" ? (
    <OtherFilterSearch
      selectedTransmission={filterData.selectedTransmission}
      selectedEngineType={filterData.selectedEngineType}
      onChange={handleEngTransChange}
    />
  ) : (
    <View className=""></View>
  );
};

export default SearchContent;

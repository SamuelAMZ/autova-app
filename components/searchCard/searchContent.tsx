import { View } from "react-native";
import BodyStylesSearch from "./bodyStyleSearch";
import PriceRangeSearch from "./priceRangeSearch";
import MakeModelsSearch from "./makeModelSearch";

const SearchContent = ({
  type,
  filterData,
  onMakeModalChange,
  onPriceRangeChange,
  onBodyStyleChange,
}: {
  type: string;
  filterData: FilterDataProps;
  onMakeModalChange: (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => void;
  onPriceRangeChange: (low: number, high: number) => void;
  onBodyStyleChange: (item: ItemDataProps | number | undefined) => void;
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

  // Body Styles props change
  const handleBodyStyleChange = (item: ItemDataProps | number | undefined) => {
    onBodyStyleChange(item);
  };

  return type === "model" ? (
    <MakeModelsSearch
      selectedModelItem={filterData.selectedModelItem}
      selectedMakeItem={filterData.selectedMakeItem}
      onChange={handleMakeModalChange}
    />
  ) : type === "price" ? (
    <View className="mb-3">
      <PriceRangeSearch
        rangeValue={filterData.rangeValue}
        onValueChange={handlePriceRangeChange}
      />
    </View>
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

export default SearchContent;

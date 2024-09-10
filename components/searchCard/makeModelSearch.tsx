import { FlatList, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { useMemo, useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal";
import { ArrowDown2, Chainlink, TickCircle } from "iconsax-react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ClearFilter from "./clearFilter";
import {
  ItemDataProps,
  makeModalSearchProps,
  selectedTypeProps,
} from "@/constants/types";
import { useQuery } from "@tanstack/react-query";
import { Models } from "@/models/brand.model";
import { loadBrands, loadModels } from "@/utils/brandsRequest";

const MakeModelsSearch = ({
  onChange,
  selectedModelItem,
  selectedMakeItem,
}: {
  onChange: (type: string | undefined, item: ItemDataProps | undefined) => void;
  selectedModelItem?: ItemDataProps;
  selectedMakeItem?: ItemDataProps;
}) => {
  const snapPoints = useMemo(() => ["40%", "50%", "90%"], []);
  const [selectedType, setSelectedType] = useState<selectedTypeProps>();

  // Models
  const models = useQuery({
    queryKey: ["models"],
    queryFn: loadModels,
  });

  //  Makes
  const makes = useQuery({
    queryKey: ["makes"],
    queryFn: loadBrands,
  });

  // callbacks
  const handleTypeChange = (type: string) => {
    setSelectedType({ type, data: [] });
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectItem = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    onChange(type, item);
    setIsModalVisible(false);
  };

  const handleIsSelected = (item: ItemDataProps): boolean => {
    if (selectedType?.type == "models") {
      return selectedModelItem?._id == item._id;
    } else {
      return selectedMakeItem?._id == item._id;
    }
  };

  return (
    <>
      <View className="mb-3 flex-row justify-between">
        <TouchableOpacity
          onPress={() => handleTypeChange("makes")}
          className="bg-white h-[80] w-[47%] shadow-sm rounded-lg relative"
          style={{
            borderWidth: selectedMakeItem ? 1 : 0,
            borderColor: `${Colors.background}`,
          }}
        >
          <View className="h-[50%] w-full justify-center ml-3">
            <ThemedText className="text-[#344054] font-semibold">
              Make
            </ThemedText>
          </View>
          <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
          <View className="h-[50%] w-full justify-center ml-3">
            <View className="flex-row gap-3 items-center">
              <ThemedText className="text-[#344054] font-semibold">
                {selectedMakeItem?.name ?? "Select Make"}
              </ThemedText>
              <ArrowDown2 color="#344054" size={16} />
            </View>
          </View>
          {selectedMakeItem && (
            <ClearFilter onPress={() => handleSelectItem("make", undefined)} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTypeChange("models")}
          className="bg-white h-[80] w-[47%] shadow-sm rounded-lg relative"
          style={{
            borderWidth: selectedModelItem ? 1 : 0,
            borderColor: `${Colors.background}`,
          }}
        >
          <View className="h-[50%] w-full justify-center ml-3">
            <ThemedText className="text-[#344054] font-semibold">
              Model
            </ThemedText>
          </View>
          <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
          <View className="h-[50%] w-full justify-center ml-3">
            <View className="flex-row gap-3 items-center">
              <ThemedText className="text-[#344054] font-semibold">
                {selectedModelItem?.name ?? "Select Model"}
              </ThemedText>
              <ArrowDown2 color="#344054" size={16} />
            </View>
          </View>
          {selectedModelItem && (
            <ClearFilter
              onPress={() => handleSelectItem("models", undefined)}
            />
          )}
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <LaodDataModal
          makeModels={{ makes: makes.data.data, models: models.data.data }}
          handleIsSelected={handleIsSelected}
          handleSelectItem={handleSelectItem}
          type={selectedType?.type!}
          isModalVisible={isModalVisible}
          snapPoints={snapPoints}
          handleCloseModal={() => setIsModalVisible(false)}
          selectedMakeItem={selectedMakeItem}
        />
      )}
    </>
  );
};

export default MakeModelsSearch;

const LaodDataModal = ({
  type,
  isModalVisible,
  snapPoints,
  handleCloseModal,
  handleIsSelected,
  handleSelectItem,
  makeModels,
  selectedMakeItem,
}: {
  type: string;
  isModalVisible: boolean;
  snapPoints: any[];
  handleCloseModal: () => void;
  handleIsSelected: Function;
  handleSelectItem: Function;
  makeModels: makeModalSearchProps;
  selectedMakeItem: ItemDataProps | undefined;
}) => {
  const handleDisplayData = () => {
    if (type == "models" && selectedMakeItem) {
      console.log(makeModels["models"]);
      return makeModels["models"]
        .filter((e: Models) => e.brand?._id ?? "" == selectedMakeItem._id)
        .map((e) => e as ItemDataProps);
    }
    return makeModels[type] as ItemDataProps[];
  };

  return (
    <CustomBottomSheetModal
      isVisible={isModalVisible}
      onClose={handleCloseModal}
      snapPoints={snapPoints}
      index={1}
    >
      <View className="w-full px-[4%]">
        <View className="px-4 py-3 flex-row justify-between items-center">
          <ThemedText className="text-[18px]">Choose item</ThemedText>
          <TouchableOpacity onPress={handleCloseModal}>
            <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
              <AntDesign name="close" size={16} color="#3D3D3D" />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={handleDisplayData()}
          renderItem={(item) => {
            const isSelected = handleIsSelected(item.item);
            return (
              <TouchableOpacity
                onPress={() => handleSelectItem(type, item.item)}
                className="p-4 border-t border-[#F2F4F7] flex-row justify-between items-center"
              >
                <View className="flex-row gap-3 items-center">
                  <Chainlink
                    color={isSelected ? "#5856D6" : "#475467"}
                    variant="Bold"
                  />
                  <ThemedText className="text-[#475467]">
                    {item.item.name}
                  </ThemedText>
                </View>
                {isSelected && <TickCircle color="#5856D6" />}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </CustomBottomSheetModal>
  );
};

import { FlatList, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { useMemo, useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal";
import { ArrowDown2, Chainlink, TickCircle } from "iconsax-react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ClearFilter from "./clearFilter";

const mockData: any = {
  models: [
    { id: "1", label: "Model 1" },
    { id: "2", label: "Model 2" },
  ],
  makes: [
    { id: "1", label: "Make 1" },
    { id: "2", label: "Make 2" },
  ],
};

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

  // callbacks
  const handleTypeChange = (type: string) => {
    setSelectedType({ type, data: mockData[type] });
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
      return selectedModelItem?.id == item.id;
    } else {
      return selectedMakeItem?.id == item.id;
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
                {selectedMakeItem?.label ?? "Select Make"}
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
                {selectedModelItem?.label ?? "Select Model"}
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
      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        snapPoints={snapPoints}
        index={1}
      >
        <View className="w-full px-[4%]">
          <View className="px-4 py-3 flex-row justify-between items-center">
            <ThemedText className="text-[18px]">Choose item</ThemedText>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                <AntDesign name="close" size={16} color="#3D3D3D" />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedType?.data}
            renderItem={(item) => {
              const isSelected = handleIsSelected(item.item);
              return (
                <TouchableOpacity
                  onPress={() =>
                    handleSelectItem(selectedType?.type, item.item)
                  }
                  className="p-4 border-t border-[#F2F4F7] flex-row justify-between items-center"
                >
                  <View className="flex-row gap-3 items-center">
                    <Chainlink
                      color={isSelected ? "#5856D6" : "#475467"}
                      variant="Bold"
                    />
                    <ThemedText className="text-[#475467]">
                      {item.item.label}
                    </ThemedText>
                  </View>
                  {isSelected && <TickCircle color="#5856D6" />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </CustomBottomSheetModal>
    </>
  );
};

export default MakeModelsSearch;

import { FlatList, TouchableOpacity, View } from "react-native";
import CustomBottomSheetModal from "../BottomSheetModal";
import ThemedText from "../ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { Chainlink, TickCircle } from "iconsax-react-native";
import { searchTypesData } from "@/constants/searchTypes";

export interface SearchTypeProps {
  label: string;
  value: string;
}

interface SelectSearchTypeModalProps {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  snapPoints: any[];
  selected: SearchTypeProps;
  handleTypeChange: (idx: number) => void;
}

const SelectSearchTypeModal = ({
  isModalVisible,
  handleCloseModal,
  snapPoints,
  selected,
  handleTypeChange,
}: SelectSearchTypeModalProps) => {
  return (
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
          data={searchTypesData}
          renderItem={(item) => {
            const isSelected = selected.value == item.item.value;
            return (
              <TouchableOpacity
                onPress={() => handleTypeChange(item.index)}
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
  );
};

export default SelectSearchTypeModal;

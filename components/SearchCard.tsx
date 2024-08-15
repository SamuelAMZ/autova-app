import { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";

const SearchCard = ({ children }: PropsWithChildren) => {
  return (
    <View className="bg-white w-full p-3 rounded-xl">
      <View className="w-full mb-3 flex-row items-center">
        <Text className="text-[#101828] text-[18px] font-semibold">
          Search cars by:
        </Text>
        <View className="flex-1 ml-2">
          <Picker
            style={{ height: 30 }}
            selectedValue="body"
            onValueChange={(itemValue, itemIndex) => {}}
          >
            <Picker.Item label="Make & Model" value="model" />
            <Picker.Item label="Price Range" value="price" />
            <Picker.Item label="Body Styles" value="body" />
          </Picker>
        </View>
      </View>
      {children}
      <CustomButton onPress={() => {}} title="Search" />
    </View>
  );
};

export default SearchCard;

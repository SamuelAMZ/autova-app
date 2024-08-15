import { Picker } from "@react-native-picker/picker";
import { ArrowDown2 } from "iconsax-react-native";
import { Text, View } from "react-native";

const DropDown = () => {
  return (
    <View className="flex-1 h-[25] relative overflow-hidden">
      <View className="flex-row items-center z-[1]">
        <Text>Java</Text>
        <ArrowDown2 color="black" size={18} />
      </View>
      <Picker
        style={{ opacity: 0, top: -10, zIndex: 2 }}
        selectedValue="java"
        onValueChange={(itemValue, itemIndex) => {}}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default DropDown;

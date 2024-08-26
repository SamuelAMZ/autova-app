import Colors from "@/constants/Colors";
import { CloseCircle } from "iconsax-react-native";
import { TouchableOpacity } from "react-native";

const ClearFilter = ({ onPress }: { onPress: () => void }) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="absolute top-[-10] right-[-10] bg-white rounded-full"
    >
      <CloseCircle variant="Bold" color={Colors.background} />
    </TouchableOpacity>
  );
};

export default ClearFilter;

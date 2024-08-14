import { PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const CarItem = () => {
  return (
    <View className="border overflow-hidden">
      <View style={{ width: 120, height: 120 }}>
        <Image
          resizeMode="contain"
          source={require("@/assets/images/audi.png")}
        />
      </View>
      <View>
        <Text>Audi A4 2.0T Premium</Text>
        <Text>15,000 miles | New York, NY</Text>
        <Text>$25,000</Text>
      </View>
    </View>
  );
};

export default CarItem;

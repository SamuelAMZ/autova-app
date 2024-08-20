import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { More, Notification } from "iconsax-react-native";
import { Text, View } from "react-native";

const CollectionDetails = () => {
  return (
    <View>
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[16px]">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "Poppins_600SemiBold" }}
          >
            Used Cars
          </ThemedText>
          <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
            <More
              style={{ transform: [{ rotate: "90deg" }] }}
              color="white"
              size={20}
            />
          </View>
        </View>
      </Header>
      <Text></Text>
    </View>
  );
};

export default CollectionDetails;

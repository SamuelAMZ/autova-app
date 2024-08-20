import { router } from "expo-router";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  FlatList,
  ViewProps,
} from "react-native";
import ThemedText from "./ThemedText";
import { PropsWithChildren } from "react";

export const CollectionItem = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(app)/collections/collectionDetails")}
      className="flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl"
    >
      <View className="w-[80]">
        <FlatList
          data={[{}, {}, {}, {}]}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={(item) => {
            return (
              <GridItem className="border border-[#E2E8F0] rounded-md overflow-hidden relative">
                <Image
                  className="w-[100%] h-[100%]"
                  source={require("@/assets/images/audi.png")}
                />
              </GridItem>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
        />
      </View>
      <View className="flex-1 justify-around">
        <ThemedText className="text-[#101828] font-bold text-[16px]">
          Used Cars
        </ThemedText>
        <ThemedText className="text-[#667085]">3 items</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export const SavedCarItem = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(app)/brands/carDetail")}
      className="flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl"
    >
      <Image
        className="w-[80] h-[70] rounded-lg"
        source={require("@/assets/images/audi.png")}
      />
      <View className="flex-1 justify-between">
        <ThemedText className="text-[#101828] font-bold text-[16px]">
          Audi A4 2.0T Premium
        </ThemedText>
        <ThemedText className="text-[#667085]">
          15,000 miles | New York, NY
        </ThemedText>
        <View className="w-[100%] flex-row justify-between items-center">
          <ThemedText className="text-[#5856D6] font-extrabold text-[16px]">
            $25,000
          </ThemedText>
          <ThemedText className="text-[#667085]">16 Aug, 10:20 PM</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const GridItem = ({ children, ...rest }: PropsWithChildren & ViewProps) => (
  <View style={styles.item} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 2,
    height: 80 / 1.5 - 20,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

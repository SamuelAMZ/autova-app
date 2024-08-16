import { View, ScrollView, Image, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import MySafeAreaView from "@/components/SafeAreaView";
import Octicons from "@expo/vector-icons/Octicons";

import teslaS from "@/assets/cars/teslaS.png";
import teslaX from "@/assets/cars/teslaX.png";
import teslaY from "@/assets/cars/teslaY.png";

export default function Brand() {
  return (
    <MySafeAreaView>
      <ScrollView className="flex-1 px-[5%] pt-[1rem] pb-[1rem]">
        <View style={styles.card} className="p-[16px]">
          <View>
            <Image source={teslaX} style={styles.image} />
            <View>
              <Octicons name="heart-fill" size={24} color="black" />
            </View>
          </View>
          <View style={styles.content}>
            <View>
              <ThemedText>Tesla Model S</ThemedText>
            </View>
            <View>
              <ThemedText>2024</ThemedText>
              <ThemedText>After Est. Gas Savings $6,500</ThemedText>
            </View>
            <View>
              <ThemedText>$68,490</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

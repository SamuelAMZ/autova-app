import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { router } from "expo-router";
import { Notification } from "iconsax-react-native";
import React from "react";
import {
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/Colors";

const SavedPage = () => {
  return (
    <View className="flex-1 bg-white">
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
            Saved
          </ThemedText>
          <View
            className={`justify-center items-center w-[40] h-[40] bg-[${colors.buttonSecondary}] rounded-3xl`}>
            <Notification color="white" size={20} />
          </View>
        </View>
      </Header>
      <ScrollView bounces={false} className="px-4">
        <ThemedText className="font-bold text-[18px] mt-5">
          Saved Cars
        </ThemedText>

        <FlatList
          className="mt-5"
          data={Array.from({ length: 12 })}
          renderItem={({ item }) => <SavedCarItem />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 30 }} />}
        />
      </ScrollView>
    </View>
  );
};

export default SavedPage;

const SavedCarItem = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(app)/brands/carDetail")}
      className="flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl">
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
          <ThemedText
            className={`text-[${colors.background}] font-extrabold text-[16px]`}>
            $25,000
          </ThemedText>
          <ThemedText className="text-[#667085]">16 Aug, 10:20 PM</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

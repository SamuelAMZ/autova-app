import { CollectionItem, SavedCarItem } from "@/components/collection";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Add, Notification } from "iconsax-react-native";
import React from "react";
import { View, FlatList, ScrollView, TouchableOpacity } from "react-native";

const SavedPage = () => {
  return (
    <View className="flex-1 bg-white">
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[16px]">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Saved
          </ThemedText>
          <View className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl">
            <Notification color="white" size={20} />
          </View>
        </View>
      </Header>
      <ScrollView bounces={false} className="px-4">
        <ThemedText className="font-bold text-[18px] mt-5">
          My Collection's
        </ThemedText>

        <FlatList
          className="mt-5 mb-3"
          data={Array.from({ length: 2 })}
          renderItem={({ item }) => <CollectionItem />}
          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
        />

        <TouchableOpacity className="w-full items-center justify-center flex-row p-2">
          <Add color="#007AFF" />
          <ThemedText
            className="text-[#007AFF]"
            style={{ fontFamily: "Poppins_600ExtraBold" }}
          >
            New Collection
          </ThemedText>
        </TouchableOpacity>

        <ThemedText className="font-bold text-[18px] mt-5">
          Saved Cars
        </ThemedText>

        <FlatList
          className="mt-5"
          data={Array.from({ length: 3 })}
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

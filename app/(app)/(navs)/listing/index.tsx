/* import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Notification, Gps, SearchNormal1, Add } from "iconsax-react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const ListingPage = () => {
  return (
    <>
      <CustomHeader />
      <ScrollView className="bg-[#fff]">
        <View className="flex items-center px-[16px] py-[50px] gap-[30px] h-full justify-center ">
          <Image
            source={require("@/assets/empty.png")}
            style={{ width: 200, height: 200 }}
          />
          <View className="flex gap-[24px] ">
            <ThemedText
              className="text-[#101828] text-[20px] text-center"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              You don’t have any listing yet!
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-center text-[14px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              We make it easy to reach millions of potential buyers. Start your
              free listing by providing your location below:
            </ThemedText>
            <View className="flex gap-[16px] relative">
              <Gps
                size="24"
                color="#1D2939"
                style={{
                  position: "absolute",
                  right: 20,
                  top: Platform.OS === "android" ? 15 : 10,
                }}
              />
              <TextInput
                className={`bg-[#7878801F] relative border border-[${Colors.background}] py-[12px] px-[20px] rounded-[12px]`}
                placeholder="Enter ZIP code"
                placeholderTextColor="#1D2939"
              />
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/(app)/listCar/condition");
                }}
                className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%]`}>
                <ThemedText
                  className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
                  Start your listing
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ListingPage; */

import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  StyleSheet
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Notification, Gps, Add, Car } from "iconsax-react-native";
import { router } from "expo-router";
import CarItem from "@/components/cars/CarItem";
import { CarData } from "@/constants/CarData";
import Colors from "@/constants/Colors";

export default function MyListing() {
  return (
    <>
      <CustomHeader />
      <ScrollView className="flex-1 px-[16px] py-[30px] bg-[#fff] ">
        <View className="flex  justify-center gap-[30px]">
          <View className="bg-[#F9FAFB] p-[16px] rounded-[16px]  w-full gap-[16px]" style={styles.card}>
            <ThemedText
              className="text-[18px] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              List cars for free
            </ThemedText>
            <View className="flex gap-[16px] relative">
              <Gps
                size="24"
                color="#1D2939"
                style={{
                  position: "absolute",
                  right: 20,
                  top: Platform.OS === "android" ? 15 : 10,
                }}
              />
              <TextInput
                className={`bg-[#7878801F] relative border border-[${Colors.background}] py-[12px] px-[20px] rounded-[12px]`}
                placeholder="Enter ZIP code"
                placeholderTextColor="#1D2939"
              />
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/(app)/listCar/condition");
                }}
                className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%]`}
              >
                <ThemedText
                  className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Continue
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex items-start justify-start gap-[20px] w-full pb-[80px]">
            <ThemedText
              className="text-[20px] text-[#101828] "
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              My Listings
            </ThemedText>
            <FlatList
              className="w-full"
              data={[{}, {}, {}]}
              renderItem={({ index, item }) => (
                <CarItem
                  car={CarData[0]}
                  onPress={() => {
                    router.navigate({
                      pathname: "/(app)/brands/carDetail",
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function CustomHeader() {
  return (
    <>
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className={`text-[${Colors.textPrimary}] text-[22px]`}
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
            Listing
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(app)/listCar/condition");
            }}
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}>
            <Add size="28" color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </Header>
    </>
  );
}


const styles = StyleSheet.create({
  card: {
  

    // Different borders for each side
    borderTopWidth: 1,
    borderTopColor: "#0000001D",
    borderRightWidth: 1.5,
    borderRightColor: "#0000001D",
    borderBottomWidth: 2.5,
    borderBottomColor: "#0000001D",
    borderLeftWidth: 1.5,
    borderLeftColor: "#0000001D",
  },
});
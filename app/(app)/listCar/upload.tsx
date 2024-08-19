import React, { PropsWithChildren, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Gallery, MinusCirlce } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import UploadCloud from "@/assets/icons/upload-cloud.svg";

import * as ImagePicker from "expo-image-picker";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export default function Upload() {
  //
  const [images, setImages] = useState<string[]>([]);

  //
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const items = images;
    items.splice(index, 1);
    setImages([...items]);
  };

  return (
    <>
      <HeaderListing>
        <View className="flex flex-row w-full justify-between items-center mt-[15px]">
          <View className="flex flex-row gap-[12px] items-center">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
              style={{ backgroundColor: "#c1c1c1" }}
            >
              <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "Poppins_600SemiBold" }}
            >
              List Your Car
            </ThemedText>
          </View>
          <TouchableOpacity
            className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
            style={{ backgroundColor: "#c1c1c1" }}
          >
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </HeaderListing>
      <ScrollView
        className="flex px-[16px]  bg-[#fff]"
        style={{ paddingVertical: 30 }}
      >
        <View className="flex pb-[80px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "Poppins_600SemiBold" }}
            >
              Image/Video
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "Poppins_500Medium" }}
            >
              Upload the Image/Videos of your car
            </ThemedText>
          </View>

          <TouchableOpacity
            onPress={pickImage}
            className="bg-[#F2F4F7] rounded-xl my-4 h-[180px] w-full items-center justify-center border border-[#E2E8F0]"
          >
            <View className="p-3 border-[10px] rounded-full border-white">
              <UploadCloud color="#FF5722" width={24} />
            </View>
            <ThemedText
              style={{ fontFamily: "Poppins_600SemiBold" }}
              className="text-[#5856D6] mt-3"
            >
              Click to upload
            </ThemedText>
            <ThemedText
              className="mt-2 text-[#1E293B]"
              style={{ fontFamily: "Poppins_500Medium" }}
            >
              MP4, PNG, JPG or GIF (max. 100 mb)
            </ThemedText>
          </TouchableOpacity>

          <View className="w-full flex-row justify-between items-center">
            <FlatList
              data={[{}, {}, {}, {}, {}, {}]}
              scrollEnabled={false}
              numColumns={3}
              columnWrapperStyle={styles.row}
              renderItem={(item) => {
                const image = images[item.index];
                return (
                  <GridItem className="border border-[#E2E8F0] rounded-md overflow-hidden relative">
                    {!image ? (
                      <Gallery size={32} variant="Bold" color="#D0D5DD" />
                    ) : (
                      <>
                        <Image
                          className="w-full h-full"
                          source={{ uri: image }}
                        />
                        <TouchableOpacity
                          onPress={() => handleRemoveImage(item.index)}
                          className="absolute top-1 right-1 "
                        >
                          <MinusCirlce color="red" variant="Bold" size={20} />
                        </TouchableOpacity>
                      </>
                    )}
                  </GridItem>
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          </View>

          <View
            style={{
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.navigate("./contact");
              }}
              className="bg-[#5856D6] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]"
            >
              <ThemedText
                className="text-[17px] text-center font-[600] text-[#fff]"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Continue
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

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
    margin: 5,
    height: Dimensions.get("window").width / 3 - 20,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

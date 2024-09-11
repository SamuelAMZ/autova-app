import React, { PropsWithChildren, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Gallery, MinusCirlce } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import UploadCloud from "@/assets/icons/upload-cloud.svg";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";

import * as ImagePicker from "expo-image-picker";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Toast from "react-native-toast-message";
import { useProduct } from "@/context/carContext";

export default function Upload() {
  //
  const [images, setImages] = useState<string[]>([]);

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    
    updateProductData({ imagesUrls: images });
    router.navigate("./contact");
  };

  //
  const pickImage = async () => {
    if (images.length < 6) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: true,
      });
      const data = result.assets;
      handleUpdateImages(data);
    } else {
      toastMaximuFileUpload();
    }
  };

  const toastMaximuFileUpload = () => {
    Toast.show({
      type: "error",
      text1: "Upload error",
      text2: "Cannot upload more than 6 files",
      position: "bottom",
    });
  };

  const handleUpdateImages = (data: ImagePicker.ImagePickerAsset[] | null) => {
    let items = images;
    if (!data || data.length > 6) return toastMaximuFileUpload();
    const uploadedImages = data.map((e) => e.uri);
    const totalLength = data.length + images.length;
    if (totalLength > 6) {
      const rangeToRemove = totalLength - 6;
      items.splice(0, rangeToRemove);
    }
    items = items.concat(uploadedImages);
    setImages([...items]);
  };

  const handleRemoveImage = (index: number) => {
    const items = images;
    items.splice(index, 1);
    setImages([...items]);
  };

  return (
    <>
      <HeaderListing progress={13 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff]"
        style={{ paddingVertical: 30 }}
      >
        <View className="flex pb-[80px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Image/Video
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
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
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
              className={`text-[${Colors.background}] mt-3`}
            >
              Click to upload
            </ThemedText>
            <ThemedText
              className="mt-2 text-[#1E293B]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
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
              onPress={handleBrandSelect}
              className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[30px]`}
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
      </View>
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

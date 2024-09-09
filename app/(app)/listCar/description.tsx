import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { useProduct } from "@/context/carContext";

export default function Description() {
  const [text, setText] = useState("");
  const { isKeyboardVisible } = useKeyboardState();

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ note: text });
    router.navigate('/(app)/listCar/isHelectric')
  };

  return (
    <>
      <HeaderListing progress={11 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex px-[16px]  bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <View className="flex-1 gap-[30px]">
          <View className="flex items-start gap-[12px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Description
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              Enter a description for your car
            </ThemedText>
          </View>

          {isKeyboardVisible ? (
            ""
          ) : (
            <Image
              source={require("@/assets/comment.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
          )}

          <TextArea text={text} setText={setText} />
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
    </>
  );
}

const TextArea = ({ text, setText }: { text: string; setText: any }) => {
  const maxLength = 150;
  const [charCount, setCharCount] = useState(text.length);

  const handleTextChange = (value: string) => {
    setText(value);
    setCharCount(value.length);
  };

  return (
    <View className="bg-[#EFEFEF] rounded-[10px] px-[16px] py-[18px]">
      <TextInput
        style={{ textAlign: "left", textAlignVertical: "top" }}
        multiline
        className="h-[128px]"
        maxLength={500}
        numberOfLines={3}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter description"
        placeholderTextColor="#475467"
        blurOnSubmit={true}
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={{ textAlign: "right", color: "#475467", marginTop: 8 }}>
        {text.length}/{maxLength}
      </Text>
    </View>
  );
};

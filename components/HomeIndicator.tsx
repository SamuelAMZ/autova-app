import React, { useCallback } from "react";
import { View } from "react-native";

import LogoHeaderAppIcon from "@/assets/icons/logo-header.svg";
import { useNavigation } from "expo-router";
import { useFocusEffect } from "expo-router";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function HomeIndicator() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ headerShown: false });
    }, [])
  );

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.background,
        }}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center">
          <View className="items-center flex-row">
            <LogoHeaderAppIcon height={100} width={180} />
          </View>
        </View>
      </View>
      <StatusBar style="light" translucent />
    </>
  );
}

import { PropsWithChildren } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import ThemedText from "./ThemedText";

type BrandType = {
  name: string;
  logo: string;
  _id?: string;
};

const BrandItem = ({
  onPress,
  size = 70,
  brand,
}: PropsWithChildren & {
  onPress: () => void;
  size: number;
  brand: BrandType;
}) => {
  return (
    <View className="flex items-center">
      <TouchableOpacity
        onPress={onPress}
        style={{ height: size, width: size, borderRadius: 70 }}
        className={` border border-[#D0D5DD] flex justify-center items-center`}
      >
        <BrandLogo brand={brand} />
      </TouchableOpacity>
      <ThemedText className="font-semibold">{brand?.name}</ThemedText>
    </View>
  );
};

export default BrandItem;

import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SvgXml } from "react-native-svg";
import Colors from "@/constants/Colors";

const BrandLogo = ({ brand }: { brand: any }) => {
  const [svgData, setSvgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (brand?.logo && brand.logo.endsWith(".svg")) {
        // Fetch the SVG content from the remote URL using fetch API
        fetch(brand.logo)
          // Get the SVG text
          .then((response) => response.text())
          .then((data) => {
            setSvgData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching SVG:", error);
            setLoading(false);
          });
      }
    } catch (e) {
      console.log(e, "error fetching svg content");
    }
  }, [brand.logo]);

  if (loading) {
    return <ActivityIndicator color={Colors.background} />;
  }

  return (
    <View>
      {svgData ? (
        <SvgXml xml={svgData} width="45" height="45" />
      ) : (
        <Image
          source={require("@/assets/images/bmw.png")}
          style={{ height: 45, width: 45 }}
        />
      )}
    </View>
  );
};

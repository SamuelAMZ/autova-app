import { View } from "react-native";

export function ImageSliderSkeleton() {
  return (
    <View className="animate-pulse flex flex-row gap-[12px] items-center justify-start ">
      <View
        style={{
          height: 263,
          width: "100%",
        }}
        className=" bg-slate-700"
      ></View>
    </View>
  );
}

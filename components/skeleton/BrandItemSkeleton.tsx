import { View } from "react-native";

export function BrandItemSkeleton() {
  const size = 70;
  return (
    <View className="flex-1 items-center gap-[7px] animate-pulse">
      <View
        style={{ height: size, width: size, borderRadius: 70 }}
        className={` border border-[#D0D5DD] flex justify-center items-center`}
      >
        <View
          style={{
            height: 45,
            width: 45,
          }}
          className="bg-slate-500 rounded-full"
        />
      </View>
      <View className="bg-slate-500 h-3 w-3/4 rounded"></View>
    </View>
  );
}

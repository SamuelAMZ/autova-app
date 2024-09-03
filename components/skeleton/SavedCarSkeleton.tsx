import { View } from "react-native";

export function SavedCarSkeleton() {
  return (
    <View className="animate-pulse flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl">
      <View
        style={{
          height: 70,
          width: 70,
        }}
        className=" bg-slate-700 rounded-lg"
      />
      <View className="flex-1 gap-[9px]">
        <View
          style={{
            height: 16,
            width: "90%",
          }}
          className="bg-slate-500 rounded"
        ></View>
        <View
          style={{
            height: 14,
            width: "90%",
          }}
          className="bg-slate-500 rounded"
        ></View>
        <View
          style={{
            height: 12,
            width: "80%",
          }}
          className="bg-slate-500 rounded"
        ></View>
      </View>
    </View>
  );
}

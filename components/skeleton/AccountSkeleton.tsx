import { View } from "react-native";

export function AccountSkeleton() {
  return (
    <View className="animate-pulse flex flex-row gap-[12px] items-center justify-start ">
      <View
        style={{
          height: 64,
          width: 64,
          borderRadius: 100,
        }}
        className=" bg-slate-700"
      ></View>
      <View
        style={{
          height: 64,
          width: "100%",
        }}
        className="flex-1 justify-center gap-[10px] "
      >
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
            width: "60%",
          }}
          className="bg-[#667085] rounded"
        ></View>
      </View>
    </View>
  );
}

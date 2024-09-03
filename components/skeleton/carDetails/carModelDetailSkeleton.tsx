import { View } from "react-native";

export function CarModelDetailSkeleton() {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        width: "30%",
      }}
      className="animate-pulse "
    >
      <View
        style={{
          height: 21,
          width: 21,
        }}
        className=" bg-slate-700 rounded-lg"
      />
      <View
        style={{
          height: 16,
          width: "80%",
        }}
        className="bg-slate-500 rounded"
      ></View>
    </View>
  );
}

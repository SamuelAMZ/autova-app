import { View, StyleSheet } from "react-native";

export function CarItemSkeleton({
  className,
  page,
}: {
  className?: string;
  page?: string;
}) {
  return (
    <View className={`${className} animate-pulse`}>
      <View
        style={[styles.card, { gap: 18 }]}
        className="p-[16px] flex flex-col bg-[#FFFFFF]"
      >
        <View className="bg-slate-500 rounded max-w-[349px] h-[180px] aspect-auto w-full" />
        <View
          style={{
            paddingBottom: 12,
            gap: page === "home" ? 20 : 12,
          }}
          className="flex-col justify-center items-start"
        >
          <View
            style={{
              height: 18,
              width: "100%",
            }}
            className="bg-slate-500 rounded"
          ></View>

          <View className="flex-1 flex-row items-center justify-start w-full">
            <View
              style={{
                height: 18,
                width: "20%",
              }}
              className="bg-slate-500 rounded"
            ></View>
            <View
              style={{
                height: 18,
                width: "8%",
              }}
              className=""
            ></View>
            <View
              style={{
                height: 18,
                width: "72%",
              }}
              className="bg-slate-500 rounded"
            ></View>
          </View>
          {/* <View>
            <ThemedText
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
              }}
              className="text-[#101828] text-[17px]"
            >
              ${car.price}
            </ThemedText>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,

    // Different borders for each side
    borderTopWidth: 1,
    borderTopColor: "#0000001D",
    borderRightWidth: 1.5,
    borderRightColor: "#0000001D",
    borderBottomWidth: 2.5,
    borderBottomColor: "#0000001D",
    borderLeftWidth: 1.5,
    borderLeftColor: "#0000001D",
  },
});

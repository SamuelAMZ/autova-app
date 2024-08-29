import { View, FlatList } from "react-native";
import { HorizontalSeperator, VerticalSeperator } from "../Separator";

export function BrantItemSkeleton() {
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
      <View className="bg-slate-500 font-semibold h-3 w-3/4 rounded"></View>
    </View>
  );
}

export function BrandItemSkeletonFlatList() {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={Array.from({ length: 10 })}
      renderItem={() => <BrantItemSkeleton />}
      ItemSeparatorComponent={() => <HorizontalSeperator size={16} />}
    />
  );
}

export function AllBrandSkeletonFlatList() {
  return (
    <FlatList
      data={Array.from({ length: 8 })}
      numColumns={4}
      keyExtractor={(item, index) => "#" + index}
      renderItem={() => <BrantItemSkeleton />}
      ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
    />
  );
}

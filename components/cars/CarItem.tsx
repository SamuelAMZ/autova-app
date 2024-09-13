import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Heart } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { savedCar } from "@/utils/carRequest";
import { useQueryClient } from "@tanstack/react-query";
import Car from "@/models/car.model";
import { thousandSeparator } from "@/constants/utils";

export default function CarItem({
  car,
  onPress,
  imgHeight,
  className = "",
  savedCarsId = [],
}: {
  car: Car;
  onPress: () => void;
  imgHeight?: number;
  className?: any;
  savedCarsId?: Array<string>;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(savedCarsId?.includes(car._id) || false);
  }, [savedCarsId.length]);

  // console.log(savedCarsId, "savedCarsId", isLiked, "isLiked");

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Copy the array and remove the car._id from it
        const newSavedCarsId = [...savedCarsId];
        newSavedCarsId.splice(savedCarsId.indexOf(car._id), 1);

        // Update the saved cars
        await savedCar({
          carsId: newSavedCarsId,
          userId: "66d08d69f683984aa2acef6f",
        });
      } else {
        // Copy the array and add the car._id to it
        const newSavedCarsId = savedCarsId ? [...savedCarsId] : [];
        newSavedCarsId.push(car._id);

        // Update the saved cars
        await savedCar({
          carsId: newSavedCarsId,
          userId: "66d08d69f683984aa2acef6f",
        });
      }

      // refetch saved cars id
      queryClient.invalidateQueries({
        queryKey: ["get-saved-cars"],
        exact: true,
      });

      // refetch saved cars data
      queryClient.invalidateQueries({
        queryKey: ["get-saved-cars-list"],
        exact: true,
      });
    } catch (e) {
      console.log(e, "error saved car");
    }
  };

  // console.log(car, "car");

  return (
    <TouchableOpacity className={`${className}`} onPress={() => onPress()}>
      <View
        style={styles.card}
        className="p-[16px] flex flex-col gap-[17px] bg-[#FFFFFF]"
      >
        <View className="relative w-full">
          <Image
            source={{ uri: car.imagesUrls[0] }}
            style={{
              borderRadius: 10,
              width: "100%",
            }}
            className="h-[180px] aspect-auto w-full"
          />
          <TouchableOpacity
            onPress={handleLike}
            style={{
              borderRadius: 100,
            }}
            className="absolute right-2 top-2 bg-[#FFFFFF85] p-[10px]"
          >
            <Heart
              color={isLiked ? "#5856D6" : "black"}
              variant={isLiked ? "Bold" : "Linear"}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-col gap-[15px] justify-center items-start">
          <View className="w-full">
            <ThemedText
              numberOfLines={1}
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
              }}
              className="text-[#101828] text-[19px]"
            >
              {car?.name}
            </ThemedText>
          </View>
          <View className="flex flex-row items-center justify-start gap-4">
            <View
              style={{
                borderRadius: 100,
                backgroundColor: "#F2F4F7",
              }}
            >
              <ThemedText className="p-[5px_12px] text-[15px] font-[600] text-[#101828]">
                {car?.year}
              </ThemedText>
            </View>
            <ThemedText className="text-[#344054] font-[500] text-[16px]">
              $ {car?.salesPrice && thousandSeparator(+car?.salesPrice)}
            </ThemedText>
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
    </TouchableOpacity>
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

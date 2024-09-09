import { router } from "expo-router";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  FlatList,
  ViewProps,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedText from "./ThemedText";
import { PropsWithChildren } from "react";
import { Edit2, Trash } from "iconsax-react-native";

export const CollectionItem = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(app)/collections/collectionDetails")}
      className="flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl"
    >
      <View className="w-[80]">
        <FlatList
          data={[{}, {}, {}, {}]}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={(item) => {
            return (
              <GridItem className="border border-[#E2E8F0] rounded-md overflow-hidden relative">
                <Image
                  className="w-[100%] h-[100%]"
                  source={require("@/assets/images/audi.png")}
                />
              </GridItem>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
        />
      </View>
      <View className="flex-1 justify-around">
        <ThemedText
          className="text-[#101828]  text-[16px]"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          Used Cars
        </ThemedText>
        <ThemedText className="text-[#667085]">3 items</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export const SavedCarItem = ({
  onLongPress,
  onPress,
}: {
  onLongPress: () => void;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={() =>
        onPress ? onPress() : router.navigate("/(app)/brands/carDetail")
      }
      className="flex-row border bg-white border-[#D0D5DD] p-3 gap-3 rounded-xl"
    >
      <Image
        className="w-[80] h-[70] rounded-lg"
        source={require("@/assets/images/audi.png")}
      />
      <View className="flex-1 justify-between">
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
          className="text-[#101828] text-[16px]"
        >
          Audi A4 2.0T Premium
        </ThemedText>
        <ThemedText className="text-[#667085]">
          15,000 miles | New York, NY
        </ThemedText>
        <View className="w-[100%] flex-row justify-between items-center">
          <ThemedText className="text-[#5856D6] font-extrabold text-[16px]">
            $25,000
          </ThemedText>
          <ThemedText className="text-[#667085]">16 Aug, 10:20 PM</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CollectionOptionModal = ({
  renamePress,
  deletePress,
}: {
  renamePress?: () => void;
  deletePress?: () => void;
}) => {
  return (
    <View className="min-w-[120] bg-white absolute top-[40] right-[20] z-10 rounded-lg items-start border border-gray-300">
      {renamePress ? (
        <TouchableOpacity
          onPress={renamePress}
          className="p-4 flex-row items-center gap-3"
        >
          <Edit2 color="black" />
          <ThemedText style={{ fontFamily: "SpaceGrotesk_700Bold" }}>
            Rename
          </ThemedText>
        </TouchableOpacity>
      ) : null}
      {renamePress && deletePress ? (
        <View className="w-[100%] h-[0.7] bg-slate-400 "></View>
      ) : null}
      {deletePress ? (
        <TouchableOpacity
          onPress={deletePress}
          className="p-4 flex-row items-center gap-3"
        >
          <Trash color="red" />
          <ThemedText
            style={{ fontFamily: "SpaceGrotesk_700Bold", color: "red" }}
          >
            Delete
          </ThemedText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

interface ActionProps {
  childrenTop: React.ReactNode;
  childrenCenter: React.ReactNode;
  rightText: string;
  visible: boolean;
  cancelPress: () => void;
  okPress?: () => void;
}

export const CollectionActionModal = ({
  childrenTop,
  childrenCenter,
  rightText,
  visible,
  cancelPress,
  okPress,
}: PropsWithChildren & ActionProps) => {
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <TouchableWithoutFeedback onPress={cancelPress}>
        <View
          className="flex-1 px-4 items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg items-center justify-center px-5 py-5 w-full">
              {childrenTop}
              {childrenCenter}
              <View className="w-full flex-row justify-between">
                <TouchableOpacity
                  onPress={cancelPress}
                  className="w-[45%] rounded-lg justify-center border p-4 flex-row items-center gap-3 border-[#5856D6] bg-[#EEEEEF]"
                >
                  <ThemedText
                    style={{
                      fontFamily: "SpaceGrotesk_700Bold",
                      color: "#101828",
                    }}
                  >
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={okPress ? okPress : () => {}}
                  style={{
                    backgroundColor:
                      rightText.toLocaleLowerCase() == "delete"
                        ? "red"
                        : "#5856D6",
                  }}
                  className="w-[45%] rounded-lg justify-center p-4 flex-row items-center gap-3"
                >
                  <ThemedText
                    style={{
                      fontFamily: "SpaceGrotesk_700Bold",
                      color: "white",
                    }}
                  >
                    {rightText}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ActionContentRemove = () => {};
const ActionContentRename = () => {};

const GridItem = ({ children, ...rest }: PropsWithChildren & ViewProps) => (
  <View style={styles.item} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 2,
    height: 80 / 1.5 - 20,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

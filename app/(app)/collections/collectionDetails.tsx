import {
  CollectionActionModal,
  CollectionOptionModal,
  SavedCarItem,
} from "@/components/collection";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { router } from "expo-router";
import { ArrowLeft, More, TickCircle, Trash } from "iconsax-react-native";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MyCheckbox } from "../listCar/price";

interface modalInitialState {
  type: string;
  visible: boolean;
}

const mockData = Array.from({ length: 6 }).map((e, idx) => idx);

const CollectionDetails = () => {
  const [allItems, setAllItems] = useState<number[]>(mockData);
  const [moreVisible, setMoreVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState<modalInitialState>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handelModalVisible = (type: string) => {
    setMoreVisible(false);
    setmodalVisible({ type, visible: !modalVisible?.visible });
  };

  const handleLongPress = (idx: number) => {
    const items = selectedItems;
    const isSelected = handleIsSelected(idx);
    if (isSelected) {
      const index = items.findIndex((e) => e == idx);
      index >= 0 && items.splice(index, 1);
      setSelectedItems([...items]);
    } else {
      items.push(idx);
      setSelectedItems([...items]);
    }
  };

  const handleIsSelected = (idx: number): boolean => {
    const isSelected = selectedItems.find((e) => e == idx);
    return isSelected != undefined && isSelected != null;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const items = Array.from({ length: itemsLength }).map((e, idx) => idx);
      setSelectedItems([...items]);
    } else {
      setSelectedItems([]);
    }
  };

  const handleRemoveItem = (idx?: number) => {
    if (idx == 0 || idx) {
      const items = allItems;
      // const index = items.findIndex((e) => e == 0);
      // index >= 0 && items.splice(index, 1);
      items.pop();
      setAllItems([...items]);
    } else {
    }
    setmodalVisible(undefined);
  };

  const itemsLength = allItems.length;
  const itemsEmpty = selectedItems.length == 0;

  return (
    <>
      <Header className="z-10">
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[16px]">
          <View className="flex-row gap-4 items-center">
            <TouchableOpacity
              style={{
                maxWidth: 45,
                height: "auto",
                borderRadius: 100,
              }}
              className="flex flex-row items-center justify-center bg-[#6C6BDB] p-[11px]"
              onPress={() => router.back()}
            >
              <ArrowLeft size={18} variant="Outline" color="white" />
            </TouchableOpacity>
            <ThemedText
              className="text-[#fff] text-[22px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Used Cars
            </ThemedText>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: !itemsEmpty ? "red" : "#6C6BDB",
            }}
            onPress={() =>
              itemsEmpty
                ? setMoreVisible(!moreVisible)
                : handelModalVisible("delete")
            }
            className="justify-center items-center w-[40] h-[40] rounded-3xl relative"
          >
            {!itemsEmpty ? (
              <Trash color="white" size={20} />
            ) : (
              <More
                style={{ transform: [{ rotate: "90deg" }] }}
                color="white"
                size={20}
              />
            )}
            {moreVisible && (
              <CollectionOptionModal
                renamePress={() => handelModalVisible("rename")}
                deletePress={() => handelModalVisible("delete")}
              />
            )}
          </TouchableOpacity>
        </View>
      </Header>

      <View className="flex-1 bg-white">
        {!itemsEmpty && (
          <View className="flex-row mt-4 pb-4 px-4 items-center gap-2">
            <MyCheckbox onPress={handleSelectAll} />
            <ThemedText style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Select all items
            </ThemedText>
          </View>
        )}
        <FlatList
          className="z-0 p-4"
          data={allItems}
          renderItem={({ item }) => {
            const isActive = handleIsSelected(item);
            return (
              <View className="relative">
                <SwipeToRemove
                  onRemove={() => handelModalVisible("delete")}
                  pressable={!itemsEmpty}
                  onLongPress={() => handleLongPress(item)}
                />
                {isActive && (
                  <View className="absolute right-1 top-1">
                    <TickCircle color="#5856D6" variant="Bold" />
                  </View>
                )}
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => (
            <View style={{ height: Platform.OS == "android" ? 40 : 60 }} />
          )}
        />
      </View>
      <CollectionActionModal
        okPress={() => handleRemoveItem(0)}
        cancelPress={() => setmodalVisible(undefined)}
        childrenTop={
          <View className="p-5 rounded-full items-center justify-center bg-[#F5F5F5]">
            <Trash color="red" />
          </View>
        }
        childrenCenter={
          <View className="py-4 items-center">
            <ThemedText
              className="text-[18px]"
              style={{ fontFamily: "SpaceGrotesk_700Bold" }}
            >
              You are about to remove this item
            </ThemedText>
            <ThemedText className="text-center">
              This will remove your product from save Are you sure?
            </ThemedText>
          </View>
        }
        rightText="Delete"
        visible={modalVisible?.type == "delete" && modalVisible.visible}
      />
      <CollectionActionModal
        cancelPress={() => setmodalVisible(undefined)}
        childrenTop={
          <ThemedText
            className="text-[18px]"
            style={{ fontFamily: "SpaceGrotesk_700Bold" }}
          >
            Change collection folder name
          </ThemedText>
        }
        childrenCenter={
          <KeyboardAvoidingView className="w-full">
            <View className="pt-1 items-center w-[100%]">
              <ThemedText className="text-center">
                Previous name was “Used car”. Type a different name you want to
                use.
              </ThemedText>
              <View className="my-4 rounded-lg w-full border border-[#D0D5DD] overflow-hidden">
                <TextInput
                  placeholder="Collection name"
                  style={
                    Platform.OS == "ios" && {
                      height: 45,
                      paddingHorizontal: 14,
                    }
                  }
                  className={
                    Platform.OS == "android" ? "py-2 px-4 bg-[#F2F4F7]" : ""
                  }
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        }
        rightText="Change"
        visible={modalVisible?.type == "rename" && modalVisible.visible}
      />
    </>
  );
};

export default CollectionDetails;

const SwipeToRemove = ({
  onLongPress,
  pressable,
  onRemove,
}: {
  pressable: boolean;
  onLongPress: () => void;
  onRemove: () => void;
}) => {
  return (
    <Swipeable renderRightActions={() => <RighAction onRemove={onRemove} />}>
      <SavedCarItem
        onPress={pressable ? onLongPress : undefined}
        onLongPress={onLongPress}
      />
    </Swipeable>
  );
};

const RighAction = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <TouchableOpacity onPress={onRemove}>
      <View className="w-full items-center justify-center h-[100%] flex-1 bg-[#6C6BDB] px-4 rounded-lg">
        <Trash color="white" />
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_600SemiBold", color: "white" }}
        >
          Remove
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

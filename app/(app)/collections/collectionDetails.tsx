import {
  CollectionActionModal,
  CollectionOptionModal,
  SavedCarItem,
} from "@/components/collection";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { More, Trash } from "iconsax-react-native";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Swipeable, TextInput } from "react-native-gesture-handler";

interface modalInitialState {
  type: string;
  visible: boolean;
}

const CollectionDetails = () => {
  const [moreVisible, setMoreVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState<modalInitialState>();

  const handelModalVisible = (type: string) => {
    setMoreVisible(false);
    setmodalVisible({ type, visible: !modalVisible?.visible });
  };

  return (
    <>
      <Header className="z-10">
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[16px]">
          <ThemedText
            className="text-[#fff] text-[22px]"
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Used Cars
          </ThemedText>
          <TouchableOpacity
            onPress={() => setMoreVisible(!moreVisible)}
            className="justify-center items-center w-[40] h-[40] bg-[#6C6BDB] rounded-3xl relative"
          >
            <More
              style={{ transform: [{ rotate: "90deg" }] }}
              color="white"
              size={20}
            />
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
        <FlatList
          className="z-0 p-4"
          data={Array.from({ length: 12 })}
          renderItem={({ item }) => <SwipeToRemove />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 30 }} />}
        />
      </View>
      <CollectionActionModal
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
          <View className="pt-1 items-center w-[100%]">
            <ThemedText className="text-center">
              Previous name was “Used car”. Type a different name you want to
              use.
            </ThemedText>
            <TextInput
              placeholder="Collection name"
              className="my-4 py-2 px-3  w-[100%] border"
            />
          </View>
        }
        rightText="Change"
        visible={modalVisible?.type == "rename" && modalVisible.visible}
      />
    </>
  );
};

export default CollectionDetails;

const SwipeToRemove = () => {
  return (
    <Swipeable renderRightActions={RighAction}>
      <SavedCarItem />
    </Swipeable>
  );
};

const RighAction = (progress: any, dragX: any) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View className="w-full items-center justify-center h-[100%] flex-1 bg-[#6C6BDB] px-4 rounded-lg">
        <Trash color="white" />
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_600Bold", color: "white" }}
        >
          Remove
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

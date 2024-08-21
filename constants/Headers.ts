import { Dimensions } from "react-native";

export const Header_Max_Height = Dimensions.get("window").height / 2.4;
export const Header_Min_Height = 90;
export const Scroll_Distance = Header_Max_Height - Header_Min_Height;

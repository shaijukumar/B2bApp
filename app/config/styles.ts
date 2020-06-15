import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  linkButton: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: colors.lightMedium,
    borderRadius: 10,
  },
};

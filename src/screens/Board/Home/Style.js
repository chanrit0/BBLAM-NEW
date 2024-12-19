import { StyleSheet } from "react-native";
import { COLORS } from "styles";
import { ViewScale } from "utils";

export default StyleSheet.create({
  totalContainer: {
    marginVertical: ViewScale(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
  },
  investPolicy: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

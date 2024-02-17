import { StyleSheet, View } from "react-native";
import { ItemList } from "../components/ItemList";
import { colors } from "../constants";

export default function App() {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
    alignItems: "center",
    justifyContent: "center",
  },
});

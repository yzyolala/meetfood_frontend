import { StyleSheet } from "react-native";
import { AuthGuard } from "../components/AuthGuard";
import { CreateContentScreen } from "../components/CreateContentScreen";

export default function App() {
  return (
    <AuthGuard>
      <CreateContentScreen />
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { AuthGuard } from "../components/AuthGuard";

const UserProfileScreen = () => {
  const { user, signOut } = useAuthenticator((context) => [context.route]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Email: {user?.attributes?.email}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default function App() {
  return (
    <AuthGuard>
      <UserProfileScreen />
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Amplify } from "aws-amplify";
import { awsConfigs } from "../aws-configs";
import { colors } from "../constants";

Amplify.configure(awsConfigs);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="video/[id]"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          headerStyle: {
            backgroundColor: colors.mainBg,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.mainText : colors.secondaryText,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={20}
              color={focused ? colors.mainText : colors.secondaryText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createContent"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: (props) => (
            <View style={{ justifyContent: "center" }}>
              <FontAwesome.Button
                onPress={props.onPress}
                onBlur={props.onBlur}
                size={20}
                name="plus"
                style={{
                  paddingRight: 0,
                  backgroundColor: colors.primary,
                  width: 45,
                  flexDirection: "column",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          title: "Account",
          headerStyle: {
            backgroundColor: colors.mainBg,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.mainText : colors.secondaryText,
              }}
            >
              me
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={20}
              color={focused ? colors.mainText : colors.secondaryText}
            />
          ),
        }}
      />
    </Tabs>
  );
}

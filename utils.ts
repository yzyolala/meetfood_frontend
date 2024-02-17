import { Platform } from "react-native";
import * as Device from "expo-device";

// this is only applicable to dev environment
// change to host URL when deploy to PROD env
export const getBaseUrl = () => {
  if (Device.isDevice) {
    // NOTE: you might need to change local IP address
    return "http://192.168.1.67:3000";
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";
};

export const BASE_URL = getBaseUrl();

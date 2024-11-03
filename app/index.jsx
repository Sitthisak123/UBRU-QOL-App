import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.navigate("grades", { relativeToDirectory: false });
       router.navigate("auth", { relativeToDirectory: false });
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return <View />;
}

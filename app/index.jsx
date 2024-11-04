import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { View, AppState } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";


export default function Index() {

  const [appState, setAppState] = useState(AppState.currentState);
  const onResume = () => {
    // router.replace("auth", { relativeToDirectory: true });
  }

  useEffect(() => {

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        onResume();
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState, onResume]);



  useLayoutEffect(() => {

    const timer = setTimeout(() => {
      router.replace("auth", { relativeToDirectory: true });
    }, 500); // Add a slight delay to allow Root Layout mounting

    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);


  return <View />;
}

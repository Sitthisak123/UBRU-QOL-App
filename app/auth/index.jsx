import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { asyncStorage_setItem } from "@/utility/db/AsyncStorage";

export default function Auth() {


  useEffect(() => {

  }, []);

  return (
    <View style={customStyles.view}>
      <Button title='Test Auth'>Login</Button>
    </View>
  );
}

const customStyles = {
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accept_btn: {
    
  }
};

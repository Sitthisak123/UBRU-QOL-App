import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { asyncStorage_setItem } from "@/utility/db/AsyncStorage";

export default function Index() {

  const sendPostRequest = async () => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_AUTH,
        {
          txtUser: `${process.env.EXPO_PUBLIC_AUTH_TEXTUSER}`,
          txtPass: `${process.env.EXPO_PUBLIC_AUTH_TEXTPASS}`,
        },
        {
          headers: {
            // 'Cookie': 'ASP.NET_SessionId=kasc0mfw350ile45cy4fcnzi',
            // 'Content-Type': 'multipart/form-data', // Ensure correct content type for form data
          },
        }
      );
      const { SSID } = response.data;
      console.log("response messegae: ",response.data.msg);
      console.log("response Status: ",response.status);
      await asyncStorage_setItem('SSID', SSID);
    } catch (error) {
      console.error("Auth error:", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {

  }, []);

  return (
    <View style={customStyles.view}>
      <Button onPress={sendPostRequest} title='Test Auth'>Test Auth</Button>
      <Link href={'/grades'}>Grade</Link>
      <Link href={'/auth'}>Auth</Link>
      <Link href={'/class-schedules'}>schedules</Link>
    </View>
  );
}

const customStyles = {
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
};

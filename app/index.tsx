import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [viewStates, setViewStates] = useState([]);

  const sendGetRequest = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_TARGET_BASE_URL}`);
    console.log(response);

  }

  const sendPostRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("__VIEWSTATE", "/wEPDwUKMjEwOTcwMDg2N2RkZfX3x16ynxIkuAu6/myBQhuMOgo=");
      formData.append("__VIEWSTATEGENERATOR", "C2EE9ABB");
      formData.append("__EVENTVALIDATION", "/wEWBALX+LPxBALB2tiHDgLKw6LdBQLHyfnnAgn7xIzePhsiuCSgVq8YdaOuFJW/");
      formData.append("txtUser", `${process.env.EXPO_PUBLIC_AUTH_TEXTUSER}`);
      formData.append("txtPass", `${process.env.EXPO_PUBLIC_AUTH_TEXTPASS}`);
      formData.append("btLogin", "เข้าสู่ระบบ");

      const response = await fetch(`${process.env.EXPO_PUBLIC_PROXY_BASE_URL}/${process.env.EXPO_PUBLIC_TARGET_BASE_URL}/${process.env.EXPO_PUBLIC_TARGET_AUTH_URL}`, {
        method: "POST",
        headers: {
          'Cookie': 'ASP.NET_SessionId=kasc0mfw350ile45cy4fcnzi',
        },
        // credentials: "same-origin",
        body: formData,
      });



      const htmlResponse = await response.text()

    } catch (error) {
      console.error("Request error:", error);
    }
  };

  useEffect(() => {
    // sendGetRequest();
    sendPostRequest();
  }, [])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. "{process.env.EXPO_PUBLIC_TARGET_BASE_URL}"</Text>
    </View>
  );
}

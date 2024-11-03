import axios from "axios";
import { useEffect, useState } from "react";
import { Text, TextInput, useTheme, Button } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { asyncStorage_setItem } from "@/utility/db/AsyncStorage";
import { router } from "expo-router";

export default function Auth() {
  const maxSTDID = 11
  const [text, setText] = useState('')
  const theme = useTheme();
  const [isTextSecure, setIsTextSecure] = useState(true);
  const [dataInput, setDataInput] = useState({ STDID: '', pass: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isTextExceed, setTextExceed] = useState(false);
  const customStyles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 90,
    },
    accept_btn: {
      maxWidth: 130,
      minWidth: 130,
      marginHorizontal: 'auto',
      marginTop: 35,
    },
    text: {
      color: theme.colors.onSecondaryContainer,
      fontSize: 55,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 50,
    },
    textField: {
      maxWidth: 330,
      minWidth: 330,
      marginHorizontal: 'auto',
      marginVertical: 10,
    }
  });

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(process.env.EXPO_PUBLIC_API_AUTH,
        {
          txtUser: dataInput.STDID,
          txtPass: dataInput.pass,
        },
        {
          headers: {
            // 'Cookie': 'ASP.NET_SessionId=???',
            // 'Content-Type': 'multipart/form-data', // Ensure correct content type for form data
          },
        }
      );
      const { SSID } = response.data;
      console.log("response messegae: ", response.data.msg);
      console.log("response Status: ", response.status);
      await asyncStorage_setItem('SSID', SSID);
      router.replace("../grades", { relativeToDirectory: true });
    } catch (error) {
      setIsLoading(false)
      console.error("Auth error:", error.response.data.msg);
      alert(error.response.data.msg);
    }
  }

  const onSTDID_change = (text) => {
    if (text.length <= maxSTDID) {
      setDataInput({ ...dataInput, STDID: text });
      setTextExceed(false);
    } else {
      setTextExceed(true);
      return
    }
  }
  useEffect(() => {
  }, []);

  return (

    <SafeAreaView style={customStyles.view}>
      <Text style={customStyles.text} variant="displayLarge">Sign in</Text>
      <TextInput
        style={customStyles.textField}
        mode="outlined"
        label="STDID"
        // placeholder="STDID" 
        keyboardType="numeric"
        
        right={
          dataInput.STDID.length == maxSTDID
            ? <TextInput.Icon icon="check" />
            : <TextInput.Affix text={`${dataInput.STDID.length}/${maxSTDID}`} />
        }
        value={dataInput.STDID}
        onChangeText={(text)=>onSTDID_change(text)}
      />


      <TextInput
        style={customStyles.textField}
        mode="outlined" label="Password"
        // placeholder="Password"
        secureTextEntry={isTextSecure}
        value={dataInput.pass}
        onChangeText={(text)=>setDataInput({...dataInput, pass: text})}
        right={
          <TextInput.Icon
            icon={isTextSecure ? "eye-off" : "eye"}
            onPress={()=>setIsTextSecure(!isTextSecure)}
          />
        }
      />
      <Button
        style={customStyles.accept_btn}
        mode="elavated"
        onPress={onLogin}
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.onSecondary}
        loading={isLoading}
      >
        Login
      </Button>
    </SafeAreaView>
  );
}



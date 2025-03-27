import { Stack } from "expo-router";
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? { ...MD3DarkTheme } : { ...MD3LightTheme };


  return (
      <PaperProvider theme={paperTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: paperTheme.colors.backdrop,
            },
            headerTintColor: paperTheme.colors.onBackground,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false
          }}>
          <Stack.Screen name="index" />
        </Stack>
      </PaperProvider >
  );
}

import { theme } from "./src/global/styles/theme";
import { CategorySelect } from "./src/screens/category-select";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <View>
        <Text>aqui</Text>
      </View>
    );
  }

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1 }}
    >
      <ThemeProvider theme={theme}>
        <CategorySelect />
      </ThemeProvider>
    </View>
  );
}

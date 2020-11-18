import React from "react";

import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

import Home from "./src/screens/Home";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Home />
    </>
  );
}

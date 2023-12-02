import React, { useState } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

import Home from "./src/Screeens/Home";

const App = () => {
  const [fontsLoaded] = useFonts({
    ProductSansBold: require("./assets/fonts/ProductSansBold.ttf"),
    // Add more fonts if needed
  });

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={() => {}}
        onFinish={() => {}}
        onError={console.warn} // Optional: Add an error handler
      />
    );
  }

  return <Home />;
};

export default App;

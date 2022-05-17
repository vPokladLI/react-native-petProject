import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/store/authContex";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Routes from "./src/route/Routes";

const Root = () => {
  const [isReady, setIsReady] = useState(false);

  const loadApplication = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
    await Font.loadAsync({
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    });
    await Font.loadAsync({
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }
  return <Routes />;
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;

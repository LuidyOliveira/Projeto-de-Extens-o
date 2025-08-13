import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainStack from "./src/stacks/MainStack";
import UseContext from "./src/contexts/UserContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <UseContext>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UseContext>
    </SafeAreaProvider>
  );
}

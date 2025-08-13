import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../pages/Preload";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MainTab from "./MainTab";
import Barber from "../pages/Barber";
import Appointments from "../pages/Appointments";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Barber" component={Barber} />
      <Stack.Screen name="Appointments" component={Appointments} />
    </Stack.Navigator>
  );
}

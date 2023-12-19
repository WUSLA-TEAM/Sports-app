import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/Screens/Home";
import Team from "./app/Screens/Team";
import TeamDetails from "./app/Screens/Components/TeamDetails";
import Registration from "./app/Screens/Registration";
import Login from "./app/Screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "expo-dev-client";
import Appeal from "./app/Screens/Appeal";

const App = () => {
  const Stack = createNativeStackNavigator();

  function MainStack() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Team" component={Team} />
        <Stack.Screen name="TeamDetails" component={TeamDetails} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Appeal" component={Appeal} />
      </Stack.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});

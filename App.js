import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/Screens/Home";
import Team from "./app/Screens/Team";
import TeamDetails from "./app/Screens/Components/TeamDetails";

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
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

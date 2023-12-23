import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/Screens/Home";
import Team from "./app/Screens/Team";
import TeamDetails from "./app/Screens/Components/TeamDetails";
import Registration from "./app/Screens/Registration";
import Login from "./app/Screens/Login";
import Points from "./app/Screens/Points";
import PointsDetails from "./app/Screens/Components/PointsDetails";
import StudentDetails from "./app/Screens/Components/StudentDetails";
import Schedule from "./app/Screens/Schedule";

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
        <Stack.Screen name="Points" component={Points} />
        <Stack.Screen name="PointsDetails" component={PointsDetails} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="Schedule" component={Schedule} />
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

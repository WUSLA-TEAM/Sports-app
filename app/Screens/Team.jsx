import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import {
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const Team = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Sports Name</Text>
      </View>
      <View style={styles.wrapper}>
        <TouchableRipple
          onPress={() => navigation.navigate("TeamDetails", { teamId: 1 })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Team 1</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate("TeamDetails", { teamId: 2 })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Team 2</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate("TeamDetails", { teamId: 3 })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Team 3</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#242424",
    flex: 1,
  },
  topSection: {
    height: 161,
    backgroundColor: "#150050",
    borderBottomLeftRadius: 51,
    borderBottomRightRadius: 51,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleTop: {
    fontSize: 34,
    color: "#FFF",
    fontFamily: "NotoSans_700Bold",
  },
  wrapper: {
    padding: 20,
  },
  button: {
    height: 81,
    backgroundColor: "#ff4c29",
    borderRadius: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    padding: 20,
  },
  buttonText: {
    fontFamily: "NotoSans_500Medium",
    fontSize: 20,
    color: "#FFF",
  },
});

export default Team;

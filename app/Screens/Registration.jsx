import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const Registration = () => {
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [programm, setProgram] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Team</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.Form}>
          <TextInput
            label="Email"
            value={team}
            onChangeText={(team) => setTeam(team)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={name}
            onChangeText={(name) => setName(name)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={programm}
            onChangeText={(programm) => setProgram(programm)}
            style={styles.input}
          />
          <Button
            icon="check"
            mode="contained"
            onPress={() => console.log("Pressed")}
            textColor="#242424"
            buttonColor="#FFF"
            style={styles.buttonCheck}
          >
            Press me
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Registration;

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
  Form: {
    backgroundColor: "#ff4c29",
    height: 480,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  input: {
    width: 296,
    borderRadius: 4,
    paddingLeft: 10,
    textAlign: "justify",
    marginTop: 10,
  },
  buttonCheck: {
    width: 164,
    height: 53,
    borderRadius: 8,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

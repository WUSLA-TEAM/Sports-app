import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet, Text, Alert } from "react-native";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Registration() {
  const [teamId, setTeamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [newProgram, setNewProgram] = useState(""); // Added this line
  const [error, setError] = useState("");
  const [programs, setPrograms] = useState([]);

  const addProgram = (newProgram) => {
    if (programs.length < 3) {
      setPrograms([...programs, newProgram]);
      setNewProgram(""); // Clear the newProgram state variable
    } else {
      setError("You can only join up to 3 programs.");
    }
  };

  const handleRegistration = async () => {
    console.log("handleRegistration called");
    try {
      // Validate input

      // Check if team exists
      const teamDocRef = doc(db, "teams", teamId);
      console.log("Getting team doc");
      console.log(`Getting doc for teamId: ${teamId}`);
      const teamSnapshot = await getDoc(teamDocRef);
      console.log("Got team doc");

      if (!teamSnapshot.exists()) {
        setError("Team does not exist.");
        console.log(error, "Team error");
      }

      // Construct student document reference
      const studentDocRef = getStudentDocumentRef(teamId, studentId);

      // Check if student already exists
      const studentSnapshot = await getDoc(studentDocRef);
      if (!studentSnapshot.exists()) {
        setError("Student not exists.");
        console.log(error, "error");
        return;
      }

      // Create a new document for the student
      const studentData = {
        programs, // Changed this line
        teamId, // Add additional student data as needed
      };
      console.log("Setting student doc");

      await setDoc(studentDocRef, studentData);
      console.log("Set student doc");

      // Reset form fields and clear error message
      setTeamId("");
      setStudentId("");
      setNewProgram(""); // Changed this line
      setPrograms([]); // Added this line
      setError("");
      console.log("Registration successful!");
      Alert.alert("Registed Comleted");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(`Error during registration: ${error.code}`);
      Alert.alert("Registed Error", error);
    }
  };

  const getStudentDocumentRef = (teamId, studentId) => {
    // Choose the appropriate approach based on your data structure
    // Option 1: Access subcollection within team document
    return doc(db, "teams", teamId, "students", studentId);

    // Option 2: Access students collection directly
    // return doc(db, "students", studentId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Team</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.Form}>
          <TextInput
            label="Team"
            value={teamId}
            onChangeText={(teamId) => setTeamId(teamId)}
            style={styles.input}
          />
          <TextInput
            label="Name"
            value={studentId}
            onChangeText={(studentId) => setStudentId(studentId)}
            style={styles.input}
          />
          <TextInput
            label="Program"
            value={newProgram}
            onChangeText={(newProgram) => setNewProgram(newProgram)}
            style={styles.input}
          />
          <Button
            icon="plus"
            mode="contained"
            onPress={() => addProgram(newProgram)}
            textColor="#242424"
            buttonColor="#FFF"
            style={styles.buttonAddProgram}
          >
            Add Program
          </Button>
          <Button
            icon="check"
            mode="contained"
            onPress={handleRegistration}
            textColor="#242424"
            buttonColor="#FFF"
            style={styles.buttonCheck}
          >
            Press me
          </Button>
          {error && (
            <Text
              style={{
                color: "#FFF",
                fontSize: 12,
                fontFamily: "NotoSans_500Medium",
              }}
            >
              {error}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

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

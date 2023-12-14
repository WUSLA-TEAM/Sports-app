import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet, Text, Alert } from "react-native";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const PROGRAM_TYPES = {
  TEAM: "teamPrograms",
  INDIVIDUAL: "individualPrograms",
};

const MAX_PROGRAMS = {
  [PROGRAM_TYPES.TEAM]: 2,
  [PROGRAM_TYPES.INDIVIDUAL]: 3,
};

export default function Registration() {
  const [formData, setFormData] = useState({
    teamId: "",
    studentId: "",
    teamPrograms: [],
    individualPrograms: [],
    newTeamProgram: "",
    newIndividualProgram: "",
    error: "",
  });

  const handleAddProgram = (type, programName) => {
    const programType = type.charAt(0).toUpperCase() + type.slice(1);
    if (formData[type].length < MAX_PROGRAMS[type]) {
      setFormData({
        ...formData,
        [type]: [...formData[type], formData[`new${programType}Program`]],
        [`new${programType}Program`]: "", // This line clears the TextInput
      });
    } else {
      setFormData({
        ...formData,
        error: `You can only join up to ${MAX_PROGRAMS[type]} ${type} programs.`,
      });
      Alert.alert(
        "Limit Reached",
        `You have reached the limit. You can only join up to ${MAX_PROGRAMS[type]} ${type} programs.`
      );
    }
  };

  const handleRegistration = async () => {
    try {
      const teamDocRef = doc(db, "teams", formData.teamId);
      const teamSnapshot = await getDoc(teamDocRef);

      if (!teamSnapshot.exists()) {
        throw new Error("Team does not exist.");
      }

      const studentDocRef = getStudentDocumentRef(
        formData.teamId,
        formData.studentId
      );
      const studentSnapshot = await getDoc(studentDocRef);

      if (!studentSnapshot.exists()) {
        throw new Error("Student not exists.");
      }

      const studentData = {
        programs: [...formData.teamPrograms, ...formData.individualPrograms],
        teamId: formData.teamId,
      };

      await setDoc(studentDocRef, studentData);

      setFormData({
        teamId: "",
        studentId: "",
        teamPrograms: [],
        individualPrograms: [],
        newTeamProgram: "",
        newIndividualProgram: "",
        error: "",
      });

      Alert.alert("Registration completed.");
    } catch (error) {
      setFormData({
        ...formData,
        error: `Error during registration: ${error.message}`,
      });
      Alert.alert("Registration error", error.message);
    }
  };

  const getStudentDocumentRef = (teamId, studentId) => {
    return doc(db, "teams", teamId, "students", studentId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Team</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.Form}>
          <TextInput
            label="Team ID"
            value={formData.teamId}
            onChangeText={(teamId) => setFormData({ ...formData, teamId })}
            style={styles.input}
          />
          <TextInput
            label="Student ID"
            value={formData.studentId}
            onChangeText={(studentId) =>
              setFormData({ ...formData, studentId })
            }
            style={styles.input}
          />
          <TextInput
            label="New Team Program"
            value={formData.newTeamProgram}
            onChangeText={(newTeamProgram) =>
              setFormData({ ...formData, newTeamProgram })
            }
            style={styles.input}
          />
          <Button
            onPress={() =>
              handleAddProgram(PROGRAM_TYPES.TEAM, formData.newTeamProgram)
            }
          >
            Add Team Program
          </Button>
          <TextInput
            label="New Individual Program"
            value={formData.newIndividualProgram}
            onChangeText={(newIndividualProgram) =>
              setFormData({ ...formData, newIndividualProgram })
            }
            style={styles.input}
          />
          <Button
            onPress={() =>
              handleAddProgram(
                PROGRAM_TYPES.INDIVIDUAL,
                formData.newIndividualProgram
              )
            }
          >
            Add Individual Program
          </Button>
          <Button onPress={handleRegistration}>Register</Button>
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

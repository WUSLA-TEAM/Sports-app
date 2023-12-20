import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet } from "react-native";
import {
  TextInput,
  List,
  Provider,
  Button,
  Dropdown,
} from "react-native-paper";
import { db } from "../../firebase"; // Import your Firestore instance
import { collection, doc, getDoc } from "firebase/firestore"; // Import specific functions

const Registration = () => {
  const [teamId, setTeamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [groupPrograms, setGroupPrograms] = useState([]); // Holds selected group programs
  const [individualPrograms, setIndividualPrograms] = useState([]); // Holds selected individual programs
  const [programList, setProgramList] = useState([]); // List of available programs
  const [groupProgramInput, setGroupProgramInput] = useState(""); // Custom group program input

  const handlePress1 = () => {
    // Set initial state for open/closed status (optional)
    // Your accordion opening/closing logic
  };

  const handlePress2 = () => {
    // Handle any logic for "Individual" accordion if needed
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      const docRef = collection(db, "programs").doc("programmes"); // Updated document reference
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const programData = docSnap.data();
        setGroupPrograms(programData.group || []); // Set group programs or empty array
        setProgramList(programData.programs); // Set available program list
        if (programData.individual) {
          // Check if "individual" field exists
          setIndividualPrograms(programData.individual); // Set individual program data
        } else {
          setIndividualPrograms([]); // Set empty array if field is missing
          Alert.alert("Information", "No individual programs found."); // Optionally show alert
        }
      } else {
        Alert.alert("Error", "Programs document not found.");
      }
    };

    fetchPrograms();
  }, []); // Fetch programs only once on initial render

  const handleSubmit = async () => {
    if (
      !teamId ||
      !studentId ||
      !groupPrograms.length ||
      !individualPrograms.length
    ) {
      Alert.alert(
        "Error",
        "Please fill in all required fields and select programs."
      );
      return;
    }

    const docRef = doc(
      db,
      `teams/<span class="math-inline">\{teamId\}/students/</span>{studentId}`
    ); // Use the doc function

    try {
      const studentData = {
        groupPrograms,
        individualPrograms,
      };

      await docRef.update({
        programs: arrayUnion(studentData), // Update selected programs in student data
      });

      Alert.alert("Success", "Data uploaded successfully.");

      // Clear form after successful submission (optional)
      setTeamId("");
      setStudentId("");
      setGroupPrograms([]);
      setIndividualPrograms([]);
      setGroupProgramInput("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGroupProgramSelection = (selectedProgram) => {
    if (groupPrograms.includes(selectedProgram)) {
      const updatedGroupPrograms = groupPrograms.filter(
        (program) => program !== selectedProgram
      );
      setGroupPrograms(updatedGroupPrograms);
    } else {
      if (groupPrograms.length === 2) {
        // Handle maximum selected programs
        Alert.alert("Error", "Cannot select more than two group programs.");
        return;
      }
      setGroupPrograms([...groupPrograms, selectedProgram]);
    }
  };

  const handleGroupProgramSubmit = () => {
    if (!groupProgramInput) {
      Alert.alert("Error", "Please enter a group program.");
      return;
    }

    // Implement logic to check if custom group program is valid (against program list or other criteria)

    // Add valid program to groupPrograms state (limited to 2)

    setGroupProgramInput(""); // Clear input
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Team ID"
            value={teamId}
            onChangeText={setTeamId}
            style={styles.input}
          />
          <TextInput
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
          />
          {/* Removed Group Accordion since you didn't specify its purpose */}
          <List.Section>
            <List.Accordion
              title="Individual"
              expanded={false} // Replace with state variable if needed
              onPress={handlePress2}
              style={styles.buttonMenu}
              description="Limited to 3"
            >
              {individualPrograms.map((program) => (
                <List.Item
                  key={program.id || program.key} // Use appropriate key based on element structure
                  title={program.title} // Access program title or relevant property
                  // ... other props and event handlers
                />
              ))}
            </List.Accordion>
          </List.Section>
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
      </View>
    </Provider>
  );
};

export default Registration;

// your existing styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  form: {
    width: "80%",
    height: 480,
    borderRadius: 20,
    backgroundColor: "#ff4c29",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 296,
    height: 54,
    backgroundColor: "#ECDBBA",
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#fff",
    fontWeight: "900",
  },
  buttonMenu: {
    width: 244,
    borderRadius: 10,
  },
});

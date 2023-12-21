import {
  Button,
  Menu,
  Provider,
  TextInput,
  Checkbox,
  List,
  Text,
} from "react-native-paper";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const Registration = () => {
  const [teamName, setTeamName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [groupPrograms, setGroupPrograms] = useState([]);
  const [selectedGroupPrograms, setSelectedGroupPrograms] = useState([]);
  const [individualPrograms, setIndividualPrograms] = useState([]);
  const [selectedIndividualPrograms, setSelectedIndividualPrograms] = useState(
    []
  );

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const groupSnapshot = await getDocs(
          collection(db, "programs", "programmes", "Acategories")
        );
        const fetchedGroupPrograms = groupSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroupPrograms(fetchedGroupPrograms);

        const individualSnapshot = await getDocs(
          collection(db, "programs", "programmes", "Bcategories")
        );
        const fetchedIndividualPrograms = individualSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        setIndividualPrograms(fetchedIndividualPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
        Alert.alert("Error", "Failed to fetch programs.");
      }
    };

    fetchPrograms();
  }, []);

  const handleSelectProgram = (program, programType) => {
    const selectedPrograms =
      programType === "group"
        ? selectedGroupPrograms
        : selectedIndividualPrograms;
    const limit = programType === "group" ? 3 : 2;

    if (selectedPrograms.length < limit) {
      const updatedPrograms = selectedPrograms.includes(program.id)
        ? selectedPrograms.filter((selected) => selected !== program.id)
        : [...selectedPrograms, program.id];

      programType === "group"
        ? setSelectedGroupPrograms(updatedPrograms)
        : setSelectedIndividualPrograms(updatedPrograms);
    } else {
      Alert.alert("Limit Reached", `You can select up to ${limit} programs.`);
    }
  };

  const renderCheckIcon = (programId, programType) => {
    return (
      <Checkbox
        status={
          programType === "group"
            ? selectedGroupPrograms.includes(programId)
              ? "checked"
              : "unchecked"
            : selectedIndividualPrograms.includes(programId)
            ? "checked"
            : "unchecked"
        }
        onPress={() => {}}
      />
    );
  };

  const handleSubmit = async () => {
    try {
      const teamsRef = collection(db, "teams");
      const teamsQuery = query(teamsRef, where("name", "==", teamName));
      const teamsSnapshot = await getDocs(teamsQuery);

      if (teamsSnapshot.empty) {
        Alert.alert("Error", "Team does not exist.");
        return;
      }

      const teamDoc = teamsSnapshot.docs[0];
      const teamId = teamDoc.id;

      const studentRef = doc(db, "teams", teamId, "students", studentId);
      const studentDoc = await getDoc(studentRef);

      if (!studentDoc.exists()) {
        Alert.alert("Error", "Student does not exist in the team.");
        return;
      }

      const programsToAdd = [
        ...selectedGroupPrograms.map((programId) => ({
          id: programId,
          type: "group",
        })),
        ...selectedIndividualPrograms.map((programId) => ({
          id: programId,
          type: "individual",
        })),
      ];

      await updateDoc(studentRef, {
        programs: programsToAdd,
      });

      console.log("Submission successful!");
      setTeamName("");
      setStudentId("");
      setSelectedGroupPrograms([]);
      setSelectedIndividualPrograms([]);
      Alert.alert("Submission successful!");
    } catch (error) {
      console.error("Error during submission:", error);
      Alert.alert("Error", "Failed to submit.");
    }
  };

  const handleUpdatePrograms = async () => {
    try {
      const teamsRef = collection(db, "teams");
      const teamsQuery = query(teamsRef, where("name", "==", teamName));
      const teamsSnapshot = await getDocs(teamsQuery);

      if (teamsSnapshot.empty) {
        Alert.alert("Error", "Team does not exist.");
        return;
      }

      const teamDoc = teamsSnapshot.docs[0];
      const teamId = teamDoc.id;

      const addPrograms = async (category, programIds) => {
        for (const programId of programIds) {
          const programRef = doc(
            db,
            "programs",
            "programmes",
            category,
            programId,
            teamId,
            studentId
          );

          await setDoc(programRef, {
            field: "value",
            teamName: teamName,
            studentName: studentId,
          });
        }
      };

      await addPrograms("Acategories", selectedGroupPrograms);
      await addPrograms("Bcategories", selectedIndividualPrograms);

      console.log("Programs added successfully!");
      Alert.alert("Programs added successfully!");
    } catch (error) {
      console.error("Error adding program documents:", error);
      Alert.alert("Error", "Failed to add programs.");
    }
  };

  const handleButton = () => {
    handleUpdatePrograms();
    handleSubmit();
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Team Name"
            value={teamName}
            onChangeText={setTeamName}
            style={styles.input}
          />
          <TextInput
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
          />
          <ScrollView style={{ height: 500 }}>
            <List.Section style={styles.dropdown}>
              <List.Accordion
                title="A Categories"
                id="group-programs-accordion"
                rippleColor="#150050"
              >
                {groupPrograms.map((program) => (
                  <List.Item
                    key={program.id}
                    title={program.id}
                    left={() => renderCheckIcon(program.id, "group")}
                    onPress={() => handleSelectProgram(program, "group")}
                    rippleColor="#242424"
                  />
                ))}
              </List.Accordion>
            </List.Section>
          </ScrollView>
          <ScrollView style={{ height: 500 }}>
            <List.Section style={styles.dropdown}>
              <List.Accordion
                title="B Categories"
                id="individual-programs-accordion"
                rippleColor="#150050"
              >
                {individualPrograms.map((program) => (
                  <List.Item
                    key={program.id}
                    title={program.id}
                    left={() => renderCheckIcon(program.id, "individual")}
                    onPress={() => handleSelectProgram(program, "individual")}
                    rippleColor="#242424"
                  />
                ))}
              </List.Accordion>
            </List.Section>
          </ScrollView>
          <Button onPress={handleButton} style={styles.buttonsubmit}>
            Submit
          </Button>
        </View>
      </View>
    </Provider>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  form: {
    width: "80%",
    height: "70%",
    borderRadius: 20,
    backgroundColor: "#150050",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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
  buttonsubmit: {
    height: 50,
    width: 100,
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dropdown: {
    width: 296,
    backgroundColor: "#ECDBBA",
    borderRadius: 8,
  },
});

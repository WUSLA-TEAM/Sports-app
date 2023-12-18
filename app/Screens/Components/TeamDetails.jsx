import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TeamDetails = ({ route }) => {
  const { teamId } = route.params;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const studentsRef = collection(db, "teams", teamId, "students");
      const studentsSnapshot = await getDocs(studentsRef);

      const studentIds = [];
      studentsSnapshot.forEach((doc) => {
        studentIds.push(doc.id); // Push the document ID (student ID) into the array
      });

      setStudents(studentIds);
    };

    fetchTeamDetails();
  }, [teamId]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>Student IDs:</Text>
            {students &&
              students.map((studentId, index) => (
                <Text key={index} style={styles.text}>
                  {studentId}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: "flex",
    backgroundColor: "#242424",
    marginTop: 50,
  },
  wrapper: {
    display: "flex",
    padding: 20,
  },
  content: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
    paddingTop: 10,
    paddingLeft: 20,
  },
});

export default TeamDetails;

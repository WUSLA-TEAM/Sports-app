import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { collection, doc, getDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const TeamDetails = ({ route }) => {
  const { teamId } = route.params;
  const [teamData, setTeamData] = useState(null);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamDocRef = doc(db, "teams", teamId);
      const docSnapshot = await getDoc(teamDocRef);
      const data = docSnapshot.data();
      setTeamData(data);

      // Fetch students data from the team's student collection
      const studentsRef = collection(db, "teams", teamId, "students");
      const studentsQuery = query(studentsRef);
      onSnapshot(studentsQuery, (snapshot) => {
        const studentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudentsData(studentData);
      });
    };
    fetchTeamData();
  }, []);

  if (!teamData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Team Details</Text>
      <Text>Team Name: {teamData.name}</Text>
      <Text>Team Description: {teamData.description}</Text>
      <Text style={styles.header}>Students</Text>
      {studentsData.map((student) => (
        <Text key={students.id}>{student.id}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default TeamDetails;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TeamDetails = ({ route }) => {
  const { teamId } = route.params;
  const [students, setStudents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const studentsRef = collection(db, "teams", teamId, "students");
        const studentsSnapshot = await getDocs(studentsRef);

        const studentData = [];
        studentsSnapshot.forEach((doc) => {
          const studentId = doc.id;
          const studentNumber = doc.data().number;
          studentData.push({ id: studentId, number: studentNumber });
        });

        // Sort the students based on their numbers (ascending order)
        studentData.sort((a, b) => a.number - b.number);

        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  const handleStudentPress = (studentId) => {
    navigation.navigate("StudentDetails", { teamId, studentId });
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            {students &&
              students.map(({ id, number }, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.textContainer}
                  onPress={() => handleStudentPress(id)}
                >
                  <Text style={styles.text}>{`${id}`}</Text>
                  <Text style={styles.text}>{`${number}`}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    marginTop: 50,
  },
  wrapper: {
    display: "flex",
    padding: 20,
  },
  content: {},
  textContainer: {
    paddingBottom: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: "#fff",
    paddingTop: 10,
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "500",
  },
});

export default TeamDetails;

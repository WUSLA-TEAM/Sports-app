import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";

const StudentDetails = ({ route }) => {
  const { teamId, studentId } = route.params;
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentRef = doc(db, "teams", teamId, "students", studentId);
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
          setStudentData(studentDoc.data());
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [teamId, studentId]);

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            {studentData && (
              <View style={styles.textContainer}>
                <View style={styles.topText}>
                  <Text style={styles.text}>{`${studentId}`}</Text>
                  <Text style={styles.text}>{`${studentData.number}`}</Text>
                </View>
                <Text style={styles.text}>{`Programs:`}</Text>
                {studentData.programs.map((program, index) => (
                  <Text key={index} style={styles.text}>
                    {typeof program === "object" ? program.id : program}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001B79",
  },
  wrapper: {
    padding: 20,
  },
  content: {},
  textContainer: {},
  text: {
    color: "#EEF5FF",
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#5FBDFF",
    paddingTop: 10,
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default StudentDetails;

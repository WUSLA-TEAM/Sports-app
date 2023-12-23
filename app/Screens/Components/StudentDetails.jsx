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
                <Text style={styles.text}>{`ID: ${studentId}`}</Text>
                <Text
                  style={styles.text}
                >{`Number: ${studentData.number}`}</Text>
                <Text style={styles.text}>{`Programs:`}</Text>
                {studentData.programs.map((program, index) => (
                  <Text key={index} style={styles.text}>
                    {typeof program === "object"
                      ? JSON.stringify(program)
                      : program}
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
    backgroundColor: "#242424",
  },
  wrapper: {
    padding: 20,
  },
  content: {},
  textContainer: {},
  text: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "500",
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
});

export default StudentDetails;

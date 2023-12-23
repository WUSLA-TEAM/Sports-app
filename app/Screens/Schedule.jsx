import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Replace with your actual import path
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const scheduleRef = collection(
          db,
          "programs",
          "schedule",
          "programmes"
        );
        const scheduleSnapshot = await getDocs(scheduleRef);
        const scheduleArray = scheduleSnapshot.docs.map((doc) => doc.data());
        setScheduleData(scheduleArray);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.scheduleTitle}>Schedule</Text>
      {scheduleData.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#150050",
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFF",
  },
  item: {
    marginBottom: 16,
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

export default Schedule;
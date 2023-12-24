import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
        const scheduleQuery = query(scheduleRef, orderBy("number")); // Order by number
        const scheduleSnapshot = await getDocs(scheduleQuery);
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
          {/* <Text style={styles.textMiddle}>{item.number}</Text> */}
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
    paddingBottom: 40,
    backgroundColor: "#001B79",
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#EEF5FF",
  },
  item: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#5FBDFF",
    paddingTop: 10,
    paddingLeft: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "#EEF5FF",
    fontSize: 20,
    fontWeight: "500",
  },
  textMiddle: {
    color: "#001B79",
  },
});

export default Schedule;

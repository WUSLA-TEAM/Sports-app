import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PointsDetails = ({ route }) => {
  const { points } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Participents Number</Text>
      <FlatList
        data={points}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#001B79",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#EEF5FF",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#5FBDFF",
    color: "#EEF5FF",
  },
  text: {
    color: "#EEF5FF",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default PointsDetails;

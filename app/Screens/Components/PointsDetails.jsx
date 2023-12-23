import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PointsDetails = ({ route }) => {
  const { points } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ordered Points</Text>
      <FlatList
        data={points}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5FCFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
});

export default PointsDetails;

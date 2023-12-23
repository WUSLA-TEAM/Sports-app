import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Points = () => {
  const [categoriesAData, setCategoriesAData] = useState([]);
  const [categoriesBData, setCategoriesBData] = useState([]);
  const navigation = useNavigation(); // Initialize useNavigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from /programs/programmes/Acategories
        const categoriesASnapshot = await getDocs(
          collection(db, "programs", "programmes", "Acategories")
        );
        const categoriesAArray = categoriesASnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesAData(categoriesAArray);

        // Fetch data from /programs/programmes/Bcategories
        const categoriesBSnapshot = await getDocs(
          collection(db, "programs", "programmes", "Bcategories")
        );
        const categoriesBArray = categoriesBSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesBData(categoriesBArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (item) => {
    // Navigate to the OrderScreen and pass the points as a parameter
    navigation.navigate("PointsDetails", { points: item.scores });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories A Data</Text>
      <FlatList
        data={categoriesAData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.item}>
              <Text>{item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.heading}>Categories B Data</Text>
      <FlatList
        data={categoriesBData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.item}>
              <Text>{item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#242424",
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

export default Points;

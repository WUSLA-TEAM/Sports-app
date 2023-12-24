import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const Team = ({ navigation }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRef = collection(db, "teams");
      const querySnapshot = await getDocs(query(teamsRef));
      const teamData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name, // Access the 'name' field from the document data
      }));
      setTeams(teamData);
    };
    fetchTeams();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Teams</Text>
      </View>
      <View style={styles.wrapper}>
        {teams.map((team) => (
          <TouchableRipple
            key={team.id}
            onPress={() =>
              navigation.navigate("TeamDetails", { teamId: team.id })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>{team.name}</Text>
            {/* Display team name */}
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001B79",
    flex: 1,
  },
  topSection: {
    height: 161,
    backgroundColor: "#150050",
    borderBottomLeftRadius: 51,
    borderBottomRightRadius: 51,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleTop: {
    fontSize: 34,
    color: "#FFF",
    fontFamily: "NotoSans_700Bold",
    fontWeight: "900",
  },
  wrapper: {
    padding: 20,
  },
  button: {
    height: 81,
    backgroundColor: "#496fa8",
    borderRadius: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    padding: 20,
  },
  buttonText: {
    fontFamily: "NotoSans_500Medium",
    fontSize: 20,
    color: "#FFF",
  },
});

export default Team;

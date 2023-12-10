import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import {
  NotoSans_100Thin,
  NotoSans_200ExtraLight,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
  NotoSans_900Black,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { db } from "../../firebase";

const Home = () => {
  const [fontsLoaded, fontError] = useFonts({
    NotoSans_100Thin,
    NotoSans_200ExtraLight,
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
    NotoSans_800ExtraBold,
    NotoSans_900Black,
  });
  const navigation = useNavigation();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const [teamOneData, setTeamOneData] = useState({ name: "", score: 0 });
  const [teamTwoData, setTeamTwoData] = useState({ name: "", score: 0 });

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamOneDoc = await firestore()
        .collection("scores")
        .doc("teamOne")
        .get();
      const teamTwoDoc = await firestore()
        .collection("scores")
        .doc("teamTwo")
        .get();
      setTeamOneData({
        name: teamOneDoc.data().name,
        score: teamOneDoc.data().score,
      });
      setTeamTwoData({
        name: teamTwoDoc.data().name,
        score: teamTwoDoc.data().score,
      });
    };

    fetchTeamData();
  }, []);

  return (
    <ScrollView style={styles.homepage}>
      <View style={styles.topSection}>
        <Text style={styles.titleTop}>Sports Name</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.liveSoreBoc}>
          <Text style={styles.liveprogram}>Program</Text>
          <View style={styles.soreBox}>
            <View style={styles.Side}>
              <View style={styles.PointBox}>
                <Text style={styles.pointTextLive}>{teamOneData.name}</Text>
              </View>
              <Text style={styles.liveTeamPoints}>{teamOneData.score}</Text>
            </View>
            <View style={styles.Side}>
              <View style={styles.PointBox}>
                <Text style={styles.pointTextLive}>{teamTwoData.name}</Text>
              </View>
              <Text style={styles.liveTeamPoints}>{teamTwoData.score}</Text>
            </View>
          </View>
        </View>
        <View style={styles.upcomingBox}>
          <Text style={styles.upComing}>Up Coming</Text>
          <Text style={styles.ProgammComing}>PRogramm</Text>
        </View>
        <View style={styles.ButtonToNavigarte}>
          <TouchableRipple
            style={styles.button}
            onPress={() => navigation.navigate("Team")}
          >
            <Text style={styles.buttonText}>TEAM</Text>
          </TouchableRipple>
          <TouchableRipple
            style={styles.button}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.buttonText}>REGISTRATION</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.button}>
            <Text style={styles.buttonText}>POINTS</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.button}>
            <Text style={styles.buttonText}>Team</Text>
          </TouchableRipple>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homepage: {
    backgroundColor: "#242424",
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
  },
  wrapper: {
    padding: 20,
  },
  liveSoreBoc: {
    height: 235,
    backgroundColor: "#ff4c29",
    borderRadius: 20,
    display: "flex",
    justifyContent: "centre",
    alignItems: "center",
    padding: 20,
  },
  liveprogram: {
    fontSize: 12,
    fontFamily: "NotoSans_500Medium",
    color: "#FFF",
  },
  soreBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Side: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  PointBox: {
    height: 114,
    width: 114,
    borderRadius: 19,
    backgroundColor: "#f4f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pointTextLive: {
    fontSize: 40,
    fontFamily: "NotoSans_900Black",
    color: "#872341",
  },
  liveTeamPoints: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  upcomingBox: {
    height: 134,
    backgroundColor: "#150050",
    borderRadius: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  upComing: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "NotoSans_800ExtraBold", // Corrected fontFamily value
    marginBottom: 10,
  },
  ProgammComing: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSans_500Medium",
  },
  ButtonToNavigarte: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 357,
    height: 64,
    backgroundColor: "#579bb1",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "NotoSans_700Bold",
    color: "#FFF",
  },
});

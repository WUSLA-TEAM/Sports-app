import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

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

  let content = null;

  const [teamOneData, setTeamOneData] = useState({ name: "", score: 0 });
  const [teamTwoData, setTeamTwoData] = useState({ name: "", score: 0 });
  const [teamThreeData, setTeamThreeData] = useState({ name: "", score: 0 });

  useEffect(() => {
    const teamOneRef = doc(db, "scores", "teamOne");
    const teamTwoRef = doc(db, "scores", "teamTwo");
    const teamThreeRef = doc(db, "scores", "teamThree");

    const unsubscribeOne = onSnapshot(teamOneRef, (doc) => {
      setTeamOneData({
        name: doc.data()?.name || "",
        score: doc.data()?.score || 0,
      });
    });

    const unsubscribeTwo = onSnapshot(teamTwoRef, (doc) => {
      setTeamTwoData({
        name: doc.data()?.name || "",
        score: doc.data()?.score || 0,
      });
    });

    const unsubscribeThree = onSnapshot(teamThreeRef, (doc) => {
      setTeamThreeData({
        name: doc.data()?.name || "",
        score: doc.data()?.score || 0,
      });
    });

    return () => {
      unsubscribeOne();
      unsubscribeTwo();
      unsubscribeThree();
    };
  }, []);

  if (fontsLoaded || fontError) {
    content = (
      <ScrollView style={styles.homepage}>
        <View style={styles.topSection}>
          <Text style={styles.titleTop}>Sports Name</Text>
        </View>
        <View style={styles.wrapper}>
          <ScrollView style={styles.liveSoreBoc}>
            <Text style={styles.liveprogram}>Total Scores</Text>
            <View style={styles.soreBox}>
              <View style={styles.Side}>
                <View style={styles.PointBox}>
                  <Text style={styles.pointTextLive}>{teamOneData.score}</Text>
                </View>
                <Text style={styles.liveTeamPoints}>{teamOneData.name}</Text>
              </View>
              <View style={styles.Side}>
                <View style={styles.PointBox}>
                  <Text style={styles.pointTextLive}>{teamTwoData.score}</Text>
                </View>
                <Text style={styles.liveTeamPoints}>{teamTwoData.name}</Text>
              </View>
              <View style={styles.Side}>
                <View style={styles.PointBox}>
                  <Text style={styles.pointTextLive}>
                    {teamThreeData.score}
                  </Text>
                </View>
                <Text style={styles.liveTeamPoints}>{teamThreeData.name}</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableRipple onPress={() => navigation.navigate("Schedule")}>
            <View style={styles.upcomingBox}>
              <Text style={styles.upComing}>Up Coming</Text>
              <Text style={styles.ProgammComing}>Program</Text>
            </View>
          </TouchableRipple>
          <View style={styles.ButtonToNavigate}>
            <TouchableRipple
              style={styles.button}
              onPress={() => navigation.navigate("Team")}
            >
              <Text style={styles.buttonText}>TEAM</Text>
            </TouchableRipple>
            <TouchableRipple
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>REGISTRATION</Text>
            </TouchableRipple>
            <TouchableRipple
              style={styles.button}
              onPress={() => navigation.navigate("Points")}
            >
              <Text style={styles.buttonText}>POINTS</Text>
            </TouchableRipple>
            {/* <TouchableRipple
              style={styles.button}
              onPress={() => navigation.navigate("")}
            >
              <Text style={styles.buttonText}>Sign</Text>
            </TouchableRipple> */}
          </View>
        </View>
      </ScrollView>
    );
  }

  return content;
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
    backgroundColor: "#39306c",
    borderRadius: 20,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  liveprogram: {
    fontSize: 20,
    fontFamily: "NotoSans_500Medium",
    color: "#FFF",
    textAlign: "center",
  },
  soreBox: {
    // display: "flex",
    // alignItems: "center",
    // width: 500,
  },
  Side: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  PointBox: {
    height: 50,
    width: 50,
    borderRadius: 8,
    backgroundColor: "#f4f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pointTextLive: {
    fontSize: 20,
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
    fontFamily: "NotoSans_800ExtraBold",
    marginBottom: 10,
  },
  ProgammComing: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSans_500Medium",
  },
  ButtonToNavigate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 357,
    height: 64,
    backgroundColor: "#496fa8",
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

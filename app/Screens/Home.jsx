import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const teamOneRef = doc(db, "scores", "teamOne");
    const teamTwoRef = doc(db, "scores", "teamTwo");

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

    return () => {
      unsubscribeOne();
      unsubscribeTwo();
    };
  }, []);

  if (fontsLoaded || fontError) {
    content = (
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
            </View>
          </View>
          <View style={styles.upcomingBox}>
            <Text style={styles.upComing}>Up Coming</Text>
            <Text style={styles.ProgammComing}>Program</Text>
          </View>
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
            <TouchableRipple style={styles.button}>
              <Text style={styles.buttonText}>POINTS</Text>
            </TouchableRipple>
            <TouchableRipple
              style={styles.button}
              onPress={() => navigation.navigate("")}
            >
              <Text style={styles.buttonText}>Sign</Text>
            </TouchableRipple>
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
    display: "flex",
    justifyContent: "center",
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

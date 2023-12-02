import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View>
      <View style={styles.sectionTop}>
        <Text style={styles.logoText}>Sports Name</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTop: {
    height: 161,
    backgroundColor: "#C02727",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 51,
    borderBottomRightRadius: 51,
  },
  logoText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    // Use fontFamily directly without the 'fonts' prop
    fontFamily: "ProductSansBold",
  },
});

export default Home;

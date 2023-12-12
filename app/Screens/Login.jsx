import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { NotoSans_700Bold } from "@expo-google-fonts/noto-sans";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [fontsLoaded] = useFonts({ NotoSans_700Bold });
  const navigation = useNavigation();

  // State for form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in: ", userCredential.user);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in");
        // Navigate to a different screen here
      } else {
        console.log("User is not logged in");
        // Stay on the same screen
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  let content = null;

  if (fontsLoaded) {
    content = (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.textLogin}>Login Form</Text>
          <View style={styles.form}>
            <TextInput
              label="Email"
              right={<TextInput.Icon name="email" />}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              label="Password"
              secureTextEntry
              right={<TextInput.Icon name="eye" />}
              value={password}
              onChangeText={setPassword}
            />
            <Button icon="lock" mode="contained" onPress={handleLogin}>
              Press me
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 346,
    height: 465,
    borderRadius: 26,
    backgroundColor: "#150050",
  },
  textLogin: {
    color: "#fff",
    fontFamily: "NotoSans_700Bold",
  },
  form: {
    marginTop: 20,
    width: "80%",
  },
  input: {
    marginTop: 10,
  },
});

export default Login;

import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { db } from "../../firebase"; // adjust the path as necessary

const Appeal = () => {
  const [team, setTeam] = useState("");
  const [program, setProgram] = useState("");

  const handleSubmit = async () => {
    // Store the form data in Firestore
    await db.collection("appeals").add({
      team: team,
      program: program,
    });

    // Send a notification to the admin
    const message = {
      to: "/topics/admin", // topic for admin notifications
      notification: {
        title: "New appeal form submitted",
        body: `Team: ${team}, Program: ${program}`,
      },
    };

    await messaging().send(message);
  };

  return (
    <View>
      <TextInput value={team} onChangeText={setTeam} placeholder="Team" />
      <TextInput
        value={program}
        onChangeText={setProgram}
        placeholder="Program"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Appeal;

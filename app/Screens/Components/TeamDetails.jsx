import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TeamDetails = ({route}) => {
  const {teamId} = route.params;

  return (
    <View style={styles.container}>
      <Text>Team {teamId} Details</Text>
      {/* Add more details or components related to the team here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeamDetails;

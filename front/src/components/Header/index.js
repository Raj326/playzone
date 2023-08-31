import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ username, userImage }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#BA38FC",
    width: '100%'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
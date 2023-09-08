import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Icon name="user" size={30} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("CourtChoice")}
      >
        <Icon name="home" size={30} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <Icon name="search" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute", // Posição absoluta
    bottom: 0, // Coloca o footer no final da tela
    left: 0,
    right: 0,
    backgroundColor: "#9F5AC1",
  },
  icon: {
    alignItems: "center",
  },
});

export default Footer;

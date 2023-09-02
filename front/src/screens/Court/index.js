import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

const Court = () => {
  const sportsList = [
    "Vôlei de areia",
    "Vôlei de quadra",
    "Beach Tênis",
    "Tênis",
    "FuteVôlei",
    "Futmesa",
    "Futsal",
    "Basquete",
    "Futebol Society",
  ];

  const [nameCourt, setNameCourt] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405_1280.png"
  );

  const handleSportToggle = (sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(
        selectedSports.filter((selectedSport) => selectedSport !== sport)
      );
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const renderSportPair = (sport1, sport2, index) => (
    <View style={styles.sportPair} key={index}>
      <TouchableOpacity onPress={() => handleSportToggle(sport1)}>
        <Text
          style={[
            styles.sportText,
            selectedSports.includes(sport1) && styles.selectedSportText,
          ]}
        >
          {sport1}
        </Text>
      </TouchableOpacity>
      <View style={styles.rightSports}>
        <TouchableOpacity onPress={() => handleSportToggle(sport2)}>
          <Text
            style={[
              styles.sportText,
              selectedSports.includes(sport2) && styles.selectedSportText,
            ]}
          >
            {sport2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.titleForm}>Nome da Quadra</Text>

          <TextInput
            style={styles.nameInput}
            value={nameCourt}
            onChangeText={setNameCourt}
          />

          <Text style={styles.titleForm}>Esportes Suportados</Text>
          {Array.from(Array(Math.ceil(sportsList.length / 2)), (_, index) =>
            renderSportPair(sportsList[index * 2], sportsList[index * 2 + 1], index)
          )}

          <Text style={styles.titleForm}>Foto da quadra</Text>

          <TouchableOpacity onPress={handleImagePicker}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>

          <Text style={styles.titleForm}>Valor por hora</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>R$</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <Text style={styles.priceText}>/ Hora</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Court;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  formContainer: {
    flex: 1,
    marginTop: 50,
    padding: 10,
  },
  titleForm: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  nameInput: {
    width: 300,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20, // Define as bordas arredondadas
    borderWidth: 3,
    borderColor: "#6A5ACD",
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  sportText: {
    color: "black",
    fontSize: 16,
  },
  selectedSportText: {
    color: '#6A5ACD',
  },
  sportText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },    
  sportPair: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  rightSports: {
    width: "50%",
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    width: 310,
    height: 50,
    borderColor: "#6A5ACD",
    borderWidth: 3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 30,
  },
  buttonTxt: {
    color: "#9F5AC1",
    fontSize: 30,
    fontWeight: "bold",
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  priceInput: {
    borderBottomWidth: 2,
    height: 30,
    borderColor: '#6A5ACD',
    width: 50,
    marginRight: 5,
    textAlign: 'center',
    fontSize: 25,
    color: '#6A5ACD'
  },
  priceText: {
    fontSize: 25,
    color: '#6A5ACD',
    marginRight: 5
  }
});

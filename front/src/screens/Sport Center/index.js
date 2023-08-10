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

import { formatCep, validateCep } from "../../functions";
import { ApiCep } from "../../services/cep";
import WeekSchedule from "../../components/WeekSchedule";

const SportCenter = () => {
  const [nameCenter, setNameCenter] = useState("");
  const [cep, setCep] = useState("");
  const [errorCep, setErrorCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [complemento, setComplemento] = useState("");
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405_1280.png"
  );

  //Validação CEP
  const handleChangeCep = (text) => {
    const formattedCep = formatCep(text);
    setCep(formattedCep);
    setErrorCep("");
  };

  const handleValidationCep = () => {
    validateCep(cep) ? setErrorCep("") : setErrorCep("Cep inválido!");
    findCep();
  };

  async function findCep() {
    try {
      const newCep = cep.replace(/\D/g, "");
      const response = await ApiCep.get(`/${newCep}/json/`);
      setState(response.data.uf);
      setCity(response.data.localidade);
      setNeighborhood(response.data.bairro);
      setStreet(response.data.logradouro);
    } catch (error) {}
  }

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
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.titleForm}>Nome do Centro Esportivo</Text>

          <TextInput
            style={styles.nameInput}
            value={nameCenter}
            onChangeText={setNameCenter}
          />

          <Text style={styles.titleForm}>Endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeCep}
            onBlur={handleValidationCep}
            value={cep}
            placeholder="Cep"
            keyboardType="number-pad"
          />

          <Text style={errorCep === "" ? styles.textCorrect : styles.textError}>
            {errorCep}
          </Text>

          <View style={styles.shortInputContainer}>
            <TextInput
              style={styles.stateInput}
              onChangeText={setState}
              value={state}
              placeholder="UF"
              editable={false}
            />

            <TextInput
              style={styles.cityInput}
              onChangeText={setCity}
              value={city}
              placeholder="Cidade"
              editable={false}
            />
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setNeighborhood}
            value={neighborhood}
            placeholder="Bairro"
            editable={false}
          />

          <TextInput
            style={styles.input}
            onChangeText={setStreet}
            value={street}
            placeholder="Logradouro"
            editable={false}
          />

          <View style={styles.shortInputContainer}>
            <TextInput
              style={styles.shortInput}
              onChangeText={setNumber}
              value={number}
              placeholder="Número"
              textAlign="center"
            />

            <TextInput
              style={styles.shortInput}
              onChangeText={setComplemento}
              value={complemento}
              placeholder="Complemento"
              textAlign="center"
            />
          </View>
          <Text style={styles.titleForm}>Inserir foto</Text>

          <TouchableOpacity onPress={handleImagePicker}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>

          <Text style={styles.titleForm}>Horário de funcionamento</Text>
          <WeekSchedule />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Court")}
          >
            <Text style={styles.buttonTxt}>Cadastrar Quadras</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SportCenter;

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
  input: {
    width: 350,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: 2,
    fontSize: 22,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  shortInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityInput: {
    width: 200,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: 2,
    fontSize: 20,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 27,
    textAlign: "center",
  },
  stateInput: {
    width: 80,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: 2,
    fontSize: 20,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 27,
    alignItems: "center",
    textAlign: "center",
  },
  shortInput: {
    width: 150,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: 2,
    fontSize: 17,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 27,
  },
  textError: {
    color: "red",
    marginLeft: 2,
    marginBottom: 15,
  },
  textCorrect: {
    marginBottom: 0,
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

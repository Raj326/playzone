import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

const CadastroPage = () => {
  const [userType, setUserType] = useState("Client");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [cep, setCep] = useState("");
  const [errorCep, setErrorCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const styleTextClient =
    userType === "Client" ? styles.textSelect : styles.textUnSelect;
  const styleTextOwner =
    userType === "Owner" ? styles.textSelect : styles.textUnSelect;

  // Função para renderizar o formulário apropriado com base no tipo de usuário selecionado
  const renderForm = () => {
    if (userType === "Client") {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.titleForm}>Dados Pessoais</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nome"
            errorEmail={errorName}
          />

          <TextInput
            style={styles.input}
            onChangeText={setCpf}
            value={cpf}
            placeholder="CPF"
            errorEmail={errorCpf}
            keyboardType="number-pad"
          />

          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="Número (com DDD)"
            errorEmail={errorPhone}
            keyboardType="number-pad"
          />

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail"
            keyboardType="email-address"
            errorEmail={errorEmail}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Crie sua senha"
            secureTextEntry={true}
            errorEmail={errorPassword}
          />

          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            errorEmail={errorPassword}
          />

          <Text style={styles.titleForm}>Endereço</Text>

          <TextInput
            style={styles.input}
            onChangeText={setCep}
            value={cep}
            placeholder="Cep"
            keyboardType="number-pad"
            errorEmail={errorCep}
          />

          <View style={styles.shortInputContainer}>
            <TextInput
              style={styles.shortInput}
              onChangeText={setState}
              value={state}
              placeholder="Estado"
            />

            <TextInput
              style={styles.shortInput}
              onChangeText={setCity}
              value={city}
              placeholder="Cidade"
            />
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setStreet}
            value={street}
            placeholder="Logradouro"
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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (userType === "Owner") {
      return (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nome"
            errorEmail={errorName}
          />

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail"
            keyboardType="email-address"
            errorEmail={errorEmail}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Crie sua senha"
            secureTextEntry={true}
            errorEmail={errorPassword}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView>
        <Text style={styles.textSelectType}>Selecione o tipo de usuário:</Text>
        <View style={styles.selectContainer}>
          <TouchableOpacity onPress={() => handleUserTypeSelection("Client")}>
            <Text style={styleTextClient}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUserTypeSelection("Owner")}>
            <Text style={styleTextOwner}>Proprietário</Text>
          </TouchableOpacity>
        </View>

        {renderForm()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CadastroPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  formContainer: {
    flex: 1,
    marginTop: 25,
    padding: 10,
  },
  selectContainer: {
    width: "60%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSelectType: {
    marginTop: 100,
    marginBottom: 30,
    fontSize: 22,
    alignSelf: "center",
  },
  textSelect: {
    color: "blue",
    fontSize: 22,
    color: "#6A5ACD",
  },
  textUnSelect: {
    color: "black",
    fontSize: 22,
  },
  scrollViewContainer: {
    width: "100%",
  },
  input: {
    width: 350,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: 2,
    fontSize: 22,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 27,
  },
  textInput: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  titleForm: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 30,
  },
  shortInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  button: {
    width: 310,
    height: 50,
    backgroundColor: '#660099',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 30
  },
  buttonTxt: {
    color: '#F6F5F3',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

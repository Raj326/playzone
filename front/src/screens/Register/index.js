import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions
} from "react-native";

import { ApiCep } from "../../services/cep";
import {
  validateCpfChecksum,
  formatPhoneNumber,
  validateBrazilianPhoneNumber,
  validatePassword,
  validateCep,
  formatCep,
} from "../../functions";

import { useNavigation } from "@react-navigation/native";

import "../../utils/i18n";
import { useTranslation } from "react-i18next";

const HEIGHT =  Dimensions.get('window').height;
const WIDTH =  Dimensions.get('window').width;

const CadastroPage = () => {
  const { t, i18n } = useTranslation();
  const [userType, setUserType] = useState("Client");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
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

  // Validação de nome
  const handleChangeName = (text) => {
    const formattedName = text
      .toLowerCase()
      .replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());
    setName(formattedName);
    setErrorName("");
  };

  const handleValidationName = () => {
    const nameArray = name.trim().split(" ");
    const hasAtLeastTwoNames = nameArray.length >= 2;
    hasAtLeastTwoNames
      ? setErrorName("")
      : setErrorName(i18n.t('Digite pelo menos nome e sobrenome'));
  };

  // Validação de cpf
  const handleChangeCpf = (text) => {
    const formattedCpf = text.replace(/\D/g, "").slice(0, 11);
    setCpf(formattedCpf);
    setErrorCpf("");
  };

  const handleValidationCpf = () => {
    const cpfPattern = /^\d{11}$/;
    cpfPattern.test(cpf) && validateCpfChecksum(cpf)
      ? setErrorCpf("")
      : setErrorCpf(i18n.t('CPF inválido!'));
  };

  const formatCpf = () => {
    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    } else if (cpf.length <= 9) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
        9
      )}-${cpf.slice(9)}`;
    }
  };

  // Validação de Celular
  const handleChangePhone = (text) => {
    const formattedPhone = formatPhoneNumber(text);
    setPhone(formattedPhone);
    setErrorPhone("");
  };

  const handleValidationPhone = () => {
    validateBrazilianPhoneNumber(phone)
      ? setErrorPhone("")
      : setErrorPhone(i18n.t('Número de celular inválido!'));
  };

  // Validação de e-mail
  const handleChangeEmail = (text) => {
    const formattedEmail = text.toLowerCase();
    setEmail(formattedEmail);
    setErrorEmail("");
  };

  const handleValidationEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailPattern.test(email)
      ? setErrorEmail("")
      : setErrorEmail(i18n.t('E-mail inválido!'));
  };

  //Validação Senha
  const handleChangePassword = (text) => {
    setPassword(text);
    setErrorPassword("");
  };

  const handleValidationPassword = () => {
    validatePassword(password)
      ? setErrorPassword("")
      : setErrorPassword(
          i18n.t('Senha inválida! A senha deve conter no mínimo: 8 caracteres, pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial')
        );
  };

  // Validação de confirmação de senha
  const handleChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    setErrorConfirmPassword("");
  };

  const handleValidationConfirmPassword = () => {
    password === confirmPassword
      ? setErrorConfirmPassword("")
      : setErrorConfirmPassword(i18n.t('As senhas devem ser iguais'));
  };

  //Validação CEP
  const handleChangeCep = (text) => {
    const formattedCep = formatCep(text);
    setCep(formattedCep);
    setErrorCep("");
  };

  const handleValidationCep = () => {
    validateCep(cep) ? setErrorCep("") : setErrorCep(i18n.t('Cep inválido!'));
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

  const styleTextClient =
    userType === "Client" ? styles.textSelect : styles.textUnSelect;
  const styleTextOwner =
    userType === "Owner" ? styles.textSelect : styles.textUnSelect;

  // Função para renderizar o formulário apropriado com base no tipo de usuário selecionado
  const renderForm = () => {
    const navigation = useNavigation()
    if (userType === "Client") {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.titleForm}>{t('Dados Pessoais')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeName}
            onBlur={handleValidationName}
            value={name}
            placeholder={t('Nome')}
          />

          <Text
            style={errorName === "" ? styles.textCorrect : styles.textError}
          >
            {errorName}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeCpf}
            onBlur={handleValidationCpf}
            value={formatCpf()}
            placeholder="CPF"
            keyboardType="number-pad"
            maxLength={14}
          />

          <Text style={errorCpf === "" ? styles.textCorrect : styles.textError}>
            {errorCpf}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangePhone}
            onBlur={handleValidationPhone}
            value={phone}
            placeholder={t('Número de celular(com DDD)')}
            keyboardType="number-pad"
            maxLength={15}
          />

          <Text
            style={errorPhone === "" ? styles.textCorrect : styles.textError}
          >
            {errorPhone}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeEmail}
            onBlur={handleValidationEmail}
            autoCapitalize="none"
            value={email}
            placeholder="E-mail"
            keyboardType="email-address"
          />

          <Text
            style={errorEmail === "" ? styles.textCorrect : styles.textError}
          >
            {errorEmail}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangePassword}
            onBlur={handleValidationPassword}
            value={password}
            placeholder={t('Crie sua senha')}
            secureTextEntry={true}
          />

          <Text
            style={errorPassword === "" ? styles.textCorrect : styles.textError}
          >
            {errorPassword}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeConfirmPassword}
            onBlur={handleValidationConfirmPassword}
            value={confirmPassword}
            placeholder={t('Confirme sua senha')}
            secureTextEntry={true}
          />

          <Text
            style={
              errorConfirmPassword === ""
                ? styles.textCorrect
                : styles.textError
            }
          >
            {errorConfirmPassword}
          </Text>

          <Text style={styles.titleForm}>{t('Endereço')}</Text>

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
              placeholder={t('Cidade')}
              editable={false}
            />
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setNeighborhood}
            value={neighborhood}
            placeholder={t('Bairro')}
            editable={false}
          />

          <TextInput
            style={styles.input}
            onChangeText={setStreet}
            value={street}
            placeholder={t('Logradouro')}
            editable={false}
          />

          <View style={styles.shortInputContainer}>
            <TextInput
              style={styles.shortInput}
              onChangeText={setNumber}
              value={number}
              placeholder={t('Número')}
              textAlign="center"
            />

            <TextInput
              style={styles.shortInput}
              onChangeText={setComplemento}
              value={complemento}
              placeholder={t('Complemento')}
              textAlign="center"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxtClient}>{t('Cadastrar')}</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (userType === "Owner") {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.titleForm}>{t('Dados Pessoais')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeName}
            onBlur={handleValidationName}
            value={name}
            placeholder={t('Nome')}
          />

          <Text
            style={errorName === "" ? styles.textCorrect : styles.textError}
          >
            {errorName}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeCpf}
            onBlur={handleValidationCpf}
            value={formatCpf()}
            placeholder="CPF"
            keyboardType="number-pad"
            maxLength={14}
          />

          <Text style={errorCpf === "" ? styles.textCorrect : styles.textError}>
            {errorCpf}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeEmail}
            onBlur={handleValidationEmail}
            autoCapitalize="none"
            value={email}
            placeholder="E-mail"
            keyboardType="email-address"
          />

          <Text
            style={errorEmail === "" ? styles.textCorrect : styles.textError}
          >
            {errorEmail}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangePassword}
            onBlur={handleValidationPassword}
            value={password}
            placeholder={t('Crie sua senha')}
            secureTextEntry={true}
          />

          <Text
            style={errorPassword === "" ? styles.textCorrect : styles.textError}
          >
            {errorPassword}
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeConfirmPassword}
            onBlur={handleValidationConfirmPassword}
            value={confirmPassword}
            placeholder={t('Confirme sua senha')}
            secureTextEntry={true}
          />

          <Text
            style={
              errorConfirmPassword === ""
                ? styles.textCorrect
                : styles.textError
            }
          >
            {errorConfirmPassword}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SportCenter")}
          >
            <Text style={styles.buttonTxtOwner}>{t('Cadastrar centro esportivo')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <Text style={styles.textSelectType}>{t('Selecione o tipo de usuário:')}</Text>
        <View style={styles.selectContainer}>
          <TouchableOpacity onPress={() => handleUserTypeSelection("Client")}>
            <Text style={styleTextClient}>{t('Cliente')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUserTypeSelection("Owner")}>
            <Text style={styleTextOwner}>{t('Proprietário')}</Text>
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
    marginTop: HEIGHT * 0.08,
    marginBottom: HEIGHT * 0.03,
    fontSize: WIDTH * 0.05,
    alignSelf: "center",
  },
  textSelect: {
    color: "blue",
    fontSize: WIDTH * 0.05,
    color: "#6A5ACD",
  },
  textUnSelect: {
    color: "black",
    fontSize: WIDTH * 0.05,
  },
  scrollViewContainer: {
    width: "100%",
  },
  input: {
    width: WIDTH * 0.85,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: WIDTH * 0.006,
    fontSize: WIDTH * 0.05,
    paddingLeft: WIDTH * 0.01,
    paddingBottom: HEIGHT * 0.003,
    marginBottom: HEIGHT * 0.01,
  },
  titleForm: {
    fontSize: WIDTH * 0.06,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: HEIGHT * 0.03,
  },
  shortInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityInput: {
    width: WIDTH * 0.5,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: WIDTH * 0.006,
    fontSize: WIDTH * 0.05,
    paddingLeft: WIDTH * 0.01,
    paddingBottom: HEIGHT * 0.003,
    marginBottom: HEIGHT * 0.03,
    textAlign: "center",
  },
  stateInput: {
    width: WIDTH * 0.2,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: WIDTH * 0.006,
    fontSize: WIDTH * 0.05,
    paddingLeft: WIDTH * 0.01,
    paddingBottom: HEIGHT * 0.003,
    marginBottom: HEIGHT * 0.03,
    alignItems: "center",
    textAlign: "center",
  },
  shortInput: {
    width: WIDTH * 0.3,
    borderBottomColor: "#6A5ACD",
    borderBottomWidth: WIDTH * 0.006,
    fontSize: WIDTH * 0.04,
    paddingLeft: WIDTH * 0.01,
    paddingBottom: HEIGHT * 0.003,
    marginBottom: HEIGHT * 0.03,
  },
  button: {
    width: WIDTH * 0.65,
    height: HEIGHT * 0.06,
    backgroundColor: "#660099",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: WIDTH * 0.05,
    marginBottom: HEIGHT * 0.015,
    marginTop: HEIGHT * 0.03,
  },
  buttonTxtClient: {
    color: "#F6F5F3",
    fontSize: WIDTH * 0.05,
    fontWeight: "bold",
  },
  buttonTxtOwner: {
    color: "#F6F5F3",
    fontSize: WIDTH * 0.04,
    fontWeight: "bold",
  },
  textError: {
    color: "red",
    marginLeft: WIDTH * 0.005,
    marginRight: WIDTH * 0.01,
    marginBottom: HEIGHT * 0.01,
    fontSize: HEIGHT * 0.015
  },
  textCorrect: {
    marginBottom: 0,
  },
});

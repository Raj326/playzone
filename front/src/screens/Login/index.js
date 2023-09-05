import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../services/auth";
import "../../utils/i18n";

import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [language, setLanguage] = React.useState('pt')
  const changeLanguage = value =>{
    i18n.changeLanguage(value)
    .then( ()=>{
      setLanguage(value)
    })
    .catch((err) => {
      console.log(err)
    });
  }
  return (
    <View style={styles.container}>
       <StatusBar barStyle={'light-content'} backgroundColor="#141A31" />
      <View style={styles.languages}>
        <TouchableOpacity
          onPress={() => {changeLanguage('en')}}
          style={[
            styles.langButton,
            {
              borderColor: language === 'en' ? "#660099" : 'transparent'
            },
          ]}
        >
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {changeLanguage('pt')}}
          style={[
            styles.langButton,
            {
              borderColor: language === 'pt' ? "#660099" : 'transparent'
            },
          ]}
        >
          <Text style={styles.langText}>Portuguese</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginText}>{t("Login")}</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={t('E-mail')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={t('Senha')}
          secureTextEntry={true}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>{t("Esqueci minha senha")} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ClientHome")}
        >
          <Text style={styles.buttonTxt}>{t("Login")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonTxt}>{t("Crie sua conta")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  languages: {
    flexDirection: "row",
    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 30,
    top: StatusBar.currentHeight
      ? StatusBar.currentHeight + 18
      : StatusBar.currentHeight + 58,
  },
  langButton:{
    borderWidth: 2,
    padding: 4,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
  },
  loginText: {
    fontSize: 36,
    color: "#BA38FC",
    marginTop: 180,
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 2,
    paddingLeft: 10,
    borderColor: "#6A5ACD",
    borderRadius: 20,
    marginTop: 20,
  },
  forgotPassword: {
    color: "#6A5ACD",
    marginTop: 5,
    marginBottom: 20,
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: "#660099",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonTxt: {
    color: "#F6F5F3",
    fontSize: 22,
    fontWeight: "bold",
  },
});

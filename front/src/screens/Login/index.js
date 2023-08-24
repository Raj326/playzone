import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../services/auth";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
          secureTextEntry={true}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu sua senha? </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ClientHome")}
        >
          <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonTxt}>Crie sua conta</Text>
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

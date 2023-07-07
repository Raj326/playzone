import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import arena from './assets/arena.png'

export default function App() {
  return (
    <View style={styles.container}>
        <Text style={styles.textPlay}>PlayZone</Text> 
        <Image style={styles.logo} source={arena}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Proprietário</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  textPlay: {
    color: '#BA38FC',
    fontSize: 50,
    marginTop: 180,
    marginBottom: 50,
  },
  logo: {
    height: 190,
    width: 190,
    marginBottom: 50
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: '#660099',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonTxt: {
    color: '#F6F5F3',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/Register";
import Login from "../screens/Login";
import SportCenter from "../screens/Sport Center";
import Court from "../screens/Court";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SportCenter"
        component={SportCenter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Court"
        component={Court}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

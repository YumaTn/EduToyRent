import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation'
import SignUp from './components/Login/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatboxAI from './components/ChatboxAI/ChatboxAl';
import UserInfo from './components/Profile/UserInfo';
import FLowerDetail from './components/FlowerDetail/FLowerDetail';
import Cart from './components/Cart/Cart';
import OrderTracking from './components/OrderTracking/OrderTracking';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        style={styles.container}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="PlashScreen"
          component={PlashScreen} /> */}
        <Stack.Screen
          name="login"
          component={Login} />
        <Stack.Screen
          name="Navigation"
          component={Navigation} />
        <Stack.Screen
          name="SignUp"
          component={SignUp} />
          <Stack.Screen
          name="ChatboxAl"
          component={ChatboxAI} />
          <Stack.Screen
          name="Info"
          component={UserInfo} />
          <Stack.Screen
          name="FlowerDetail"
          component={FLowerDetail} />
          <Stack.Screen
          name="Cart"
          component={Cart} />
          <Stack.Screen
          name="OrderTracking"
          component={OrderTracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

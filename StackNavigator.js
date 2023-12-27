import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import PickUpScreen from './Screens/PickUpScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderScreen from './Screens/OrderScreen';
import Main from './Screens/Main';
import SplashScreen from './Screens/SplashScreen';
import OnboardingScreens from './Screens/OnboardingScreens';
import SettingScreen from './Screens/SettingScreen';

const StackNavigator = () => {
    const Stack=createNativeStackNavigator();
  return (

    <NavigationContainer>

      <Stack.Navigator>
         
         <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>

         <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreens} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
         <Stack.Screen name="Setting" component={SettingScreen} options={{headerShown:false}} />
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
         <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default StackNavigator

const styles = StyleSheet.create({})
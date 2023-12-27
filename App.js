// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from "./Store";
import StackNavigator from './StackNavigator';

export default function App() {
 

  return (
    <View style={appStyles.container}>
      <Provider store={store}>
          <View style={appStyles.container}>
            <StackNavigator />
            <StatusBar style="auto" />
          </View>
       
      </Provider>
    </View>
  );
}

const appStyles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
  },
 
   lottieAnimation: {
  width: 200,
  height: 200,
   },


  // Define other styles for App.js here if needed
});

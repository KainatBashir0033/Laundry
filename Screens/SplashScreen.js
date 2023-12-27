import React, { useEffect, useRef } from 'react';
import { View, Image, Text, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
       Duration:3000,         // Duration of the animation
      useNativeDriver: false, // We need to animate the background color
    }).start(() => navigation.replace('Onboarding'));
  }, [navigation, animatedValue]);

  
  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/splashh.png')} style={styles.logo} />
        <Text style={styles.text}>Laundry</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
    
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
  },
  text: {
    fontSize: 26, // Adjust as needed
    fontWeight: 'bold', // Adjust as needed
    color: "#318CE7", // White color text
    marginLeft:5,
  },
});

export default SplashScreen;

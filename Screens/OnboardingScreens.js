import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native'; // Make sure you have @react-navigation/native installed


const slides = [
  {
    key: 'signup',
    title: 'Sign Up',
    text: 'Create an account to start using our services',
    image: require('../images/b1.jpg'),
  },
  {
    key: 'home',
    title: 'Available Services',
    text: 'Select the laundry services you need',
    image: require('../images/onb2.png'),
  },
  {
    key: 'pickup',
    title: 'Schedule Pickup',
    text: 'Choose a pickup time that works for you',
    image: require('../images/aa3.png'),
  },
  {
    key: 'cart',
    title: 'Review Your Cart',
    text: 'Check your items before placing an order',
    image: require('../images/cart4.png'),
  },
  {
    key: 'order',
    title: 'Place Your Order',
    text: 'Get your laundry done with a single tap',
    image: require('../images/place-order5.png'),
  },
];


const OnboardingScreen = () => {
  const navigation = useNavigation(); // This hook allows you to access the navigation object

  const sliderRef = useRef(null);

  const onDone = () => {
    navigation.navigate('Main'); // Replace 'Home' with the actual route name of your home screen
  };

  const onSkip = () => {
    sliderRef.current.goToSlide(slides.length - 1, true);
  };

  const renderItem = ({ item }) => {
    
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};


 const renderNextButton = () => {
  return <Text style={[styles.button, styles.nextButton]}>Next</Text>;
};

const renderSkipButton = () => {
  return <Text style={[styles.button, styles.skipButton]}>Skip</Text>;
};

   const renderDoneButton = () => {
    return <Text style={[styles.button, styles.doneButton]}>Done</Text>;
  };


  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      onSkip={onSkip}
      showSkipButton
      ref={sliderRef}
      activeDotStyle={{ backgroundColor: '#318CE7' }}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 320,
    height: 360,
    marginVertical: -20,
 
  },
   title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40, // Keep or adjust this value for space above the title
    textAlign: 'center',
   // Title text color
  },
  text: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16, // Added for space between the title and the text
    textAlign: 'center',
    color: '#318CE7', // Description text color
  },
  button: {
    color: 'blue',
    fontSize: 18,
  },

  skipButton: {
  color: '#318CE7',
  borderColor: '#318CE7',
  borderWidth: 2,
  borderRadius: 20, // Increase border radius for smoother corners
  width: 80, // Adjusted width for better appearance
  paddingVertical: 5, // Adds vertical padding
  paddingHorizontal: 5, // Adds horizontal padding
  textAlign: 'center', // Ensures text is centered
},


  nextButton: {
    color: 'white',
    backgroundColor: '#318CE7',
    borderWidth: 2,
    borderColor:'#318CE7',
  borderRadius: 20, // Increase border radius for smoother corners
  width: 80, // Adjusted width for better appearance
  paddingVertical: 5, // Adds vertical padding
  paddingHorizontal: 5, // Adds horizontal padding
  textAlign: 'center', // Ensures text is centered

  },

doneButton:{
    color: 'white',
    backgroundColor: '#318CE7',
    borderWidth: 2,
    borderColor:'#318CE7',
  borderRadius: 20, // Increase border radius for smoother corners
  width: 80, // Adjusted width for better appearance
  paddingVertical: 5, // Adds vertical padding
  paddingHorizontal: 5, // Adds horizontal padding
  textAlign: 'center', // Ensures text is centered


  }
});

export default OnboardingScreen;

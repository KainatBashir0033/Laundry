import React from "react";
import { View, StyleSheet, Image } from "react-native";


  const Carousel = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
  ];

  return (
    <View>
      {images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={{
            borderRadius: 6,
            width: "94%",
            aspectRatio: 16 / 9, // Adjust the aspect ratio according to your image dimensions
            marginBottom: 10,
            marginRight: 10,     // Add margin to the right
            marginLeft: 10,   
            marginTop:10,   // Add margin to the left
            // Add other styling properties as needed
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Carousel;

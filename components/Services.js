import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';

const Services = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
     
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry"
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
     
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
   
  ];
  
  const toggleServiceSelection = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(serviceId => serviceId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 7 }}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable
            key={service.id}
            style={[
              styles.serviceButton,
              selectedServices.includes(service.id) && styles.selectedService
            ]}
            onPress={() => toggleServiceSelection(service.id)}
          >
            <Image source={{ uri: service.image }} style={{ width: 70, height: 70 }} />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceButton: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 7,
  },
  selectedService: {
    borderColor: 'red', // Change the border color to green when selected
    borderWidth: 2, // Ensure border width is set to make it visible
  },
});

export default Services;


 
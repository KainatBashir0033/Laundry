import { StyleSheet, Text, View, TextInput, SafeAreaView  ,ScrollView ,Pressable ,Alert} from 'react-native';
import React from 'react';
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import  { useState } from "react";
import  { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPickupDetails } from "../pickupDetailsSlice"; 
import { savePickupDetailsAsync } from '../cartActions';




const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); // Changed from array to string
  const [delivery, setDelivery] = useState(""); // Changed from array to string



       const dispatch = useDispatch();
       const cart = useSelector((state) => state.cart.cart);
       const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);


    // Ensure delivery is a string or a single value, not an array
         console.log('Delivery value:', delivery);


      const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 AM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  
  

   const navigation = useNavigation();
  const proceedToCart = () => {
      if(!selectedDate || !selectedTime || !delivery){
        Alert.alert(
            "Empty or invalid",
            "Please select all the fields",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      

      
        } else {
    const details = {
      pickUpDate: selectedDate,
      selectedTime: selectedTime,
      noOfDays: delivery,
    };
    dispatch(savePickupDetailsAsync(details));
    navigation.replace("Cart");
  }
};


  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};


  return (
    <>
    <SafeAreaView  >
      <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 10, marginTop: 50 }}>
        Enter Address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: 'gray',
          borderWidth: 0.7,
          paddingVertical: 80,
          borderRadius: 9,
          margin: 10,
        }}
      />


      {/*Pick up date*/}

      <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 10 }}>
        Pick Up Date
      </Text>
       <HorizontalDatepicker
          mode="gregorian"
          onSelectedDateChange={(date) => setSelectedDate(formatDate(date))}
          startDate={new Date("2023-02-21")}
          endDate={new Date("2023-03-28")}
          initialSelectedDate={new Date("2020-08-22")}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />


{/*Select time*/}
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
             </ScrollView>

{/*Delivery Date*/}

             <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery Date
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>




    </SafeAreaView>


{total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop:"auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | Rs {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});

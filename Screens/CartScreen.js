import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cleanCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {  getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { setCart, saveCartToAsyncStorage } from '../CartReducer';
import { fetchCartDataAsync } from '../cartActions';
import { setPickupDetails } from '../CartReducer';
import { onSnapshot} from 'firebase/firestore';



const CartScreen = () => {

  
  console.log("CartScreen rendering");
  // Rest of your component code

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  

    const pickupDetails = useSelector((state) => state.cart.pickupDetails);
    const cart = useSelector((state) => state.cart.cart);

   
    console.log('pickupDetails from Redux:', pickupDetails);

 // Replace your direct usage of store.getState() with useSelector

// Use pickupDetails here
  console.log(pickupDetails);


 
  // ... rest of your code


  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
   await setDoc(
  doc(db, "users", `${userUid}`),
  {
    orders: [...cart], // Ensure this is the correct structure for your orders
    pickupDetails, // Use the state from Redux directly
  },
  {
    merge: true,
  }
);
  };

 
  // Safely extracting params from route
  
  const userUid = auth.currentUser?.uid; // Check if user is logged in
  const total = cart.reduce((curr, item) => curr + item.quantity * item.price, 0);

  const navigateToAddMoreItems = () => {
    navigation.navigate('Home');
  };


 

// CartScreen.js
// CartScreen.js
 useEffect(() => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            dispatch(fetchCartDataAsync(userUid));
        }
    }, [dispatch]);

  console.log('pickupDetails from Redux:', pickupDetails);
   
  return (
    <>


      {/* Add More Items Button */}
        {total > 0 && (
          <Pressable
            onPress={navigateToAddMoreItems}
            style={styles.addMoreItemsButton}
          >
            <Text style={styles.addMoreItemsButtonText}>Add More Items</Text>
          </Pressable>
        )}


      <ScrollView style={{ marginTop: 50 }}>
      
        {total === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <Text style={{ marginTop: 270, fontSize: 26, textAlign: "center", color: "#6BB1CC" }}>
    Your cart is empty
  </Text>
</View>




        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ₹{total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >

                    {pickupDetails?.pickUpDate || 'Not specified'}
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
           {pickupDetails?.noOfDays || 'Not specified'}


                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                   
               {pickupDetails?.selectedTime || 'Not specified'}
           
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay(100.Rs for delivery)
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total +100}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
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
              {cart.length} items | $ {total}
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

          <Pressable onPress={placeOrder}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({

   addMoreItemsButton: {
    backgroundColor: "#088F8F",
    padding: 10,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: -50,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreItemsButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
});
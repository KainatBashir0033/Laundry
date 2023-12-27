import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
    TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
   const user = auth.currentUser;
  const [items,setItems] = useState([]);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Loading your location...');
  const navigateToCart = () => {
    navigation.navigate('Cart'); // No params needed
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);


  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    // Check for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Assuming the user's name is stored in the displayName property
        // If it's stored in a different property, adjust the code accordingly
        setUserName(authUser.displayName || authUser.email); 
      }
    });

    // Unsubscribe from the listener when unmounting
    return unsubscribe;
  }, []);


const [dropdownVisible, setDropdownVisible] = useState(false);

 const navigateToSettings = () => {
    setDropdownVisible(false); // Hide the dropdown
    navigation.navigate('Setting'); // Navigate to the Settings screen
  };

const [activeItem, setActiveItem] = useState(null);
  const renderDropdownItem = (label, onPress, iconName) => {
     const isActive = activeItem === label;
    return (
       <TouchableHighlight
        underlayColor="#318CE7"
        onPress={onPress}
        onShowUnderlay={() => setActiveItem(label)}
        onHideUnderlay={() => setActiveItem(null)}
        style={[styles.dropdownItem, isActive && { backgroundColor: '#318CE7', borderRadius: 5 }]}
        key={label}
      >
        <View style={styles.dropdownItemContent}>
          <Ionicons name={iconName} size={22} color={isActive ? 'white' : 'black'} style={styles.iconStyle} />
          <Text style={[styles.dropdownText, isActive && { color: 'white' }]}>
            {label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  
  };
       
        const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };
    
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable the location services',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }
  };
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Allow the app to use location services',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
        );
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (response.length > 0) {
          let address = `${response[0].city}, ${response[0].region}`;
          setDisplayCurrentAddress(address);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Location fetching failed', 'Failed to fetch the current location.');
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
 useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 50,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 70,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 100,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 70,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 100,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 80,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 70,
    },
  ];
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 20 }}
      >
        {/* Location and Profile */}
       {/* Header Section with Location, Profile, and Dropdown */}
        <View style={styles.header}>
          {/* Location */}
           <MaterialIcons name="location-on" size={30} color="#fd5c63" style={{ marginLeft: 8 , marginTop:-10}} />

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", marginLeft:-85 ,marginTop:-5}}>Home</Text>
            <Text  style={{ fontSize: 18,  marginLeft:-85  }}>{displayCurrentAddress}</Text>
          </View>

          {/* Profile and Dropdown */}
          <View style={styles.profileSection}>
           
            <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Text style={styles.profileInitials}>
                {userName ? userName.charAt(0).toUpperCase() : 'J'}
              </Text>
            </Pressable>


         
        {/* Shopping Cart Icon */}
        <TouchableOpacity onPress={navigateToCart} style={styles.cartIcon}>
          <FontAwesome name="shopping-cart" size={24} color="#fd5c63" />
        </TouchableOpacity>

            {/* Dropdown Menu */}
          {dropdownVisible && (
      <View style={styles.dropdown}>
        {renderDropdownItem("Settings & Beta", navigateToSettings, "settings-outline")}
        {renderDropdownItem("Log out", signOutUser, "log-out-outline")}
      </View>
    )}
    
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

          {total === 0 ? (
            null
          ) : (
            <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >
            <View>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  $ {total}</Text>
              <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
            </View>
    
            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
          )}
     
    </>
  );
};



const styles = StyleSheet.create({


  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#F0F0F0",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,

  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    marginRight:6
  },
  profileInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fd5c63',
    textAlign: 'center',
    lineHeight: 40,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

   // ... existing styles ...
  cartIcon: {
    position: 'absolute',
    top: -5,
    right: 60,
    padding: 10,
  },

  dropdown: {
    // Style for the dropdown menu
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    width: 180, // Set a fixed width or adjust as needed
    borderRadius: 7,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 6, // for Android shadow
    zIndex: 1000, // Ensure it's on top of other elements
  },
dropdownItem: {
    // Apply background color and padding here
    backgroundColor: 'transparent',
    padding: 10,
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    // Text color defaults to black and will change to white when pressed
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    marginRight: 6,
  },
});

export default HomeScreen;
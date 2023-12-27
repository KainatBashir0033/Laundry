import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';



const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

 
   const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  const register = () => {
    // Validation checks
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      reenterPassword === "" ||
      phone === ""
    ) {
      Alert.alert("Invalid Details", "Please fill all the details", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    if (password !== reenterPassword) {
      Alert.alert("Password Mismatch", "Password and Re-enter Password do not match", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    // Password validation checks
    const uppercaseRegex = /[A-Z]/;
    if (password.length < 8 || !uppercaseRegex.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be a minimum of 8 characters long and include at least one uppercase letter.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }

    // Email validation check
    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid Email", "Please enter a valid Gmail address (e.g., Xyz123@gmail.com) with at least one capital letter and only numbers."
, [
      {
        text: "OK",
      },
    ]);
    return;
  }

// Phone number validation check
// Phone number validation check

  // Log the phone number entered by the user
  console.log("Phone number entered by the user:", phone);

  const phoneNumberWithoutSpaces = phone.replace(/\s/g, '');
  // Log the phone number after removing spaces
  console.log("Phone number after removing spaces:", phoneNumberWithoutSpaces);

 // Assuming the user only enters the local part of their phone number, not including the country code.
const phoneNumberWithCountryCode = `+92${phone}`;

// This regex now expects a '+' followed by 12 digits, which includes the country code +92 and the 10 digits entered by the user.
if (!/^\+\d{12}$/.test(phoneNumberWithCountryCode)) {
  Alert.alert(
    "Invalid Phone Number",
    "Please enter a 10-digit phone number without the country code.",
    [
      { text: "OK" },
    ]
  );
  return;
}


    // Register the user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          firstName: firstName,
          lastName: lastName,
          email: user,
          phone: phone,
        });

        // Show success toast
         showToast('success', 'Registration Successful!');
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      })
      .catch((error) => {
        // Handle registration errors
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Email Already Registered", "Please use a different email address", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("",  [
            {
              text: "OK",
            },
          ]);
        }
        console.error(":");
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView>

       
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Register</Text>
            <Text style={styles.subHeaderText}>Create a new Account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputRow}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#318CE7" />
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputRow}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#318CE7" />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputRow}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#318CE7" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="key-outline" size={24} color="#318CE7" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.input}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#318CE7" />
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="key-outline" size={24} color="#318CE7" />
              <TextInput
                value={reenterPassword}
                onChangeText={(text) => setReenterPassword(text)}
                secureTextEntry={!showPassword}
                placeholder="Re-enter Password"
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.inputRow}>
              <Feather name="phone" size={24} color="#318CE7" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone No"
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <Pressable onPress={register} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()} style={styles.signInPressable}>
              <Text style={styles.signInText}>Already have an account? Sign in</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    <Toast
        ref={(ref) => Toast.setRef(ref)}
        config={{
          success: ({ text1, props, ...rest }) => (
            <View style={[styles.toastContainer, { backgroundColor: "#318CE7" }]}>
              <Text style={[styles.toastText, { color: 'white' }]}>{text1}</Text>
            </View>
          ),
          // Add other toast types if needed
        }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    
    alignItems: "center",
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: "#318CE7",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: "600",
    color: "black",
  },
  form: {
    marginTop: 50,
    marginLeft:20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

 customToast: {
    backgroundColor: "#318CE7",
    borderLeftColor: "#318CE7",
    borderLeftWidth: 5,
  },
  customToastText: {
    color: 'white',
  },
  input: {
    color: 'black',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 268,
    marginVertical: 10,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  registerButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  signInPressable: {
    marginTop: 20,
  },
  signInText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },

   toastContainer: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    // Add other styles as needed
  },
  toastText: {
    fontSize: 16,
    // Add other styles as needed
  },
});

export default RegisterScreen;

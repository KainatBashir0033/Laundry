import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from 'react-native-toast-message';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [showPassword, setShowPassword] = useState(false); 
  const navigation = useNavigation();

  const emailRegex = /\S+@\S+\.\S+/;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser && shouldRedirect) {
        Toast.show({
          type: 'success',
          text1: 'Successfully logged in!',
        });
        setTimeout(() => {
          navigation.replace("Home");
        }, 2000);
      }
    });

    return unsubscribe;
  }, [shouldRedirect]);

 const handleForgotPassword = () => {
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Display a toast on successful email send
        Toast.show({
          type: 'success',
          text1: 'Forgot password email sent successfully!',
          position: 'bottom',
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 40,
          props: { backgroundColor: 'purple', color: 'white' } // Customize as per your design
        });
      })
      .catch((error) => {
        // Optionally, show a toast for errors as well
        Toast.show({
          type: 'error',
          text1: 'Error sending reset email.',
          position: 'bottom',
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 40,
          props: { backgroundColor: 'purple', color: 'white' } // Customize as per your design
        });
      });
  } else {
    // Show an error toast if email is not entered
    Toast.show({
      type: 'error',
      text1: 'Email is required for password reset.',
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      bottomOffset: 40,
      props: { backgroundColor:"#318CE7", color: 'white' } // Customize as per your design
    });
  }
};

  const login = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user details", user);
        setShouldRedirect(true);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Email or password is incorrect.");
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {loading ? (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size="large" color={"white"} />
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.keyboardView}>
          <View style={styles.signInTextView}>
            <Text style={styles.signInText}>Sign In</Text>
            <Text style={styles.signInToAccountText}>Sign In to your account</Text>
          </View>



          <View style={styles.inputFieldsView}>
            <View style={styles.emailInputView}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#318CE7" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="black"
                style={styles.input}
              />
            </View>

            <View style={styles.passwordInputView}>
          <Ionicons name="key-outline" size={24} color="#318CE7" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Update based on showPassword state
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.input}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
  name={showPassword ? "eye" : "eye-off"} 
  size={24} 
  color="#318CE7"
   style={{ marginLeft: -1 }}
   // Adjust the margin value as needed
/>
          </Pressable>
        </View>

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            <Pressable onPress={login} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Register")} style={styles.signUpPressable}>
              <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </Pressable>

            <Pressable onPress={handleForgotPassword} style={styles.forgotPasswordPressable}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>

        </KeyboardAvoidingView>
      )}
      <Toast
        ref={(ref) => Toast.setRef(ref)}
        config={{
          success: ({ text1, props, ...rest }) => (
            <View style={[styles.toastContainer, { backgroundColor: "#318CE7" }]}>
              <Text style={[styles.toastText, { color: 'white' }]}>{text1}</Text>
            </View>
          ),
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
   marginTop:-100
  },

 
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  loadingText: {
    marginRight: 10,
    color:"#318CE7"
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  signInTextView: {
    alignItems: "center",
    marginTop: 100,
  },
  signInText: {
    fontSize: 25,
    color: "#318CE7",
    fontWeight: "bold",
  },
  signInToAccountText: {
    fontSize: 18,
    marginTop: 8,
    color: "black",
    fontWeight: "600",
  },
  inputFieldsView: {
    marginTop: 50,
    marginLeft:10,
  },

   passwordInputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjust as needed for layout
  },
  emailInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: 'black',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 260,
    marginVertical: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  signUpPressable: {
    marginTop: 20,
  },
  signUpText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
  forgotPasswordPressable: {
    marginTop: 20,
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "#318CE7",
    fontSize: 16,
  },
  toastContainer: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 80,
  },
  toastText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;

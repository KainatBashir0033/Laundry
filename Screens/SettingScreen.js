import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Button,
  Switch,
} from 'react-native';
import { AntDesign, FontAwesome5, MaterialIcons,  Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase'; // Ensure these are correctly imported
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';
import {  useEffect } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


import { storage } from 'firebase/storage';


import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SettingScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

   const [PhoneNumber, setPhoneNumber] = useState("");
   const [FirstName, setFirstName] = useState("");
   const [LastName, setLastName] = useState("");
   const [Email, setEmail] = useState("");

 
   // State variables to control edit mode
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);



  const [fullName, setFullName] = useState("");
  
  useEffect(() => {
    const getUserData = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(`${userData.firstName} ${userData.lastName}`);
        }
      }
    };
    getUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
       uploadImageToFirebase(result.uri);
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      uploadImageToFirebase(result.uri);

    }
    setModalVisible(false);
  };

   useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
        
          setPhoneNumber(userData.phone);
           setEmail(userData.email);
          if (userData.profileImageUrl) {
            setProfileImage(userData.profileImageUrl);
          }
        } else {
          console.log('No user data found');
        }
      }
    };

    fetchUserData();
  }, []);

  // Function to handle saving the updated profile information
  const handleSaveProfile = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        firstName: FirstName,
        lastName: LastName,
        phone: PhoneNumber,
        // profileImageUrl: profileImage, // Uncomment if handling image uploading
      });
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
      // Turn off editing mode after saving
      setIsEditingFirstName(false);
      setIsEditingLastName(false);
      setIsEditingPhoneNumber(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert('Error', 'There was an error updating your profile.');
    }
  };
  

 const uploadImageToFirebase = async (imageUri) => {
  const currentUserUid = auth.currentUser.uid;
  const fileName = `profile_${currentUserUid}_${Date.now()}`;
  const storage = getStorage();
  const reference = storageRef(storage, `profileImages/${fileName}`);
  const response = await fetch(imageUri);
  const blob = await response.blob();

  try {
    await uploadBytes(reference, blob);
    const downloadURL = await getDownloadURL(reference);

    const userRef = doc(db, 'users', currentUserUid);
    await updateDoc(userRef, {
      profileImageUrl: downloadURL,
    });

    setProfileImage(downloadURL);
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    Alert.alert('Error', 'There was an error uploading your profile image.');
  }
};


const handleResetPassword = () => {
  Alert.alert(
    "Reset Password",
    "Do you want to send a password reset email?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Send",
        onPress: () => {
          if (auth.currentUser && auth.currentUser.email) {
            sendPasswordResetEmail(auth, auth.currentUser.email)
              .then(() => {
                Alert.alert("Success", "Password reset email sent.");
              })
              .catch(error => {
                Alert.alert("Error", error.message);
              });
          }
        }
      }
    ]
  );
};
const handleDeleteProfileImage = async () => {
  const currentUserUid = auth.currentUser.uid;
  const storage = getStorage();
  const reference = storageRef(storage, profileImage);

  try {
    await deleteObject(reference);
    const userRef = doc(db, 'users', currentUserUid);
    await updateDoc(userRef, {
      profileImageUrl: null,
    });

    setProfileImage(null);
  } catch (error) {
    console.error('');
    
  }
};

  return (
    <ScrollView style={styles.container}>

     <View style={styles.profileContent}>
            
            <Text style={styles.userName}>Welcome User {fullName}</Text>
          </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Profile Image</Text>
        {profileImage && (
          <TouchableOpacity onPress={handleDeleteProfileImage} style={styles.modalDeleteIcon}>
            <Ionicons name="trash-outline" size={24} color='#318CE7' />
          </TouchableOpacity>
        )}
      </View>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <FontAwesome5 name="camera" size={24} color="black" />
              <Text style={styles.modalText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <MaterialCommunityIcons name="image-area" size={24} color="black" />
              <Text style={styles.modalText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.profileContainer}>
 <View>
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    {profileImage ? (
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
    ) : (
      <View style={styles.profilePlaceholder}>
        <AntDesign name="plus" size={24} color="#318CE7" />
      </View>
    )}
  </TouchableOpacity>

  
</View>


        </View>

        {/* Input for Email */}
      <View style={{ marginTop: 10 }}>




    <View style={{ flexDirection: "row", alignItems: "center" , marginTop:-10 }}>
  <View style={{ flexDirection: "row", alignItems: "center", gap: -2 ,marginTop:-20}}>
    <Ionicons name="person-outline" size={24} color="#318CE7" style={{ marginLeft: 10 }} />
<Text style={{ fontSize: 18, color: "#318CE7", marginLeft: 16 }}>First Name</Text>
</View>
  
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom:-2 }}>
     <TouchableOpacity onPress={() => setIsEditingFirstName(true)}>
  <Feather name="edit"  size={24} color="#318CE7" style={{ marginTop: 25, marginRight: -100,marginBottom:-30 ,marginLeft:196}} />
  </TouchableOpacity>
  <TextInput
    value={FirstName}
    onChangeText={(text) => setFirstName(text)}
    secureTextEntry={false}
    editable={isEditingFirstName}
    placeholderTextColor="#318CE7"
    style={{
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingTop: 55,
      // Adds space above the text input
      width: 290,
      marginLeft:-200,
    }}
  />
</View>

</View>


 <View style={{ flexDirection: "row", alignItems: "center" , marginTop:-10 }}>
  <View style={{ flexDirection: "row", alignItems: "center", gap: -2 ,marginTop:-20}}>
    <Ionicons name="person-outline" size={24} color="#318CE7"  style={{ marginLeft:10}}/>
    <Text style={{ fontSize: 18, color: "#318CE7", marginLeft: 16 }}>Last Name</Text>
  </View>
   <View style={{ flexDirection: "row", alignItems: "center", marginBottom:-2 }}>
    <TouchableOpacity onPress={() => setIsEditingLastName(true)}>
  <Feather name="edit"  size={24} color="#318CE7" style={{ marginTop: 25, marginRight: -100,marginBottom:-30 ,marginLeft:197}} />
  </TouchableOpacity>
  <TextInput
    value={LastName}
    onChangeText={(text) => setLastName(text)}
    secureTextEntry={false}
    editable={isEditingLastName}
    placeholderTextColor="#318CE7"
    style={{
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingTop: 55, // Adds space above the text input
      width: 290,
      marginLeft:-200,
    }}
  />
</View>
</View>

<View style={{ flexDirection: "row", alignItems: "center" , marginTop:-10 }}>
  <View style={{ flexDirection: "row", alignItems: "center", gap: -2 ,marginTop:-20}}>
    <Ionicons name="mail-outline" size={24} color="#318CE7" style={{ marginLeft: 10 }} />
<Text style={{ fontSize: 18, color: "#318CE7", marginLeft: 16 }}>Email</Text>
</View>
  
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom:-2 }}>
  
  
  <TextInput
    value={Email}
    onChangeText={(text) => setEmail(text)}
    secureTextEntry={false}
    placeholderTextColor="#318CE7"
    style={{
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingTop: 55,
     // Adds space above the text input
      width: 290,
      marginLeft:-38,
    }}
  />
</View>

</View>
<View style={{ flexDirection: "row", alignItems: "center" , marginTop:-10 }}>
  <View style={{ flexDirection: "row", alignItems: "center", gap: -2 ,marginTop:-20}}>
    <Ionicons name="call-outline" size={24} color="#318CE7"  style={{ marginLeft:10}}/>
    <Text style={{ fontSize: 18, color: "#318CE7", marginLeft: 16 }}>Phone Name</Text>
  </View>
   <View style={{ flexDirection: "row", alignItems: "center", marginBottom:-2 }}>

    <TouchableOpacity onPress={() => setIsEditingPhoneNumber(true)}>
  <Feather name="edit"  size={24} color="#318CE7" style={{ marginTop: 25, marginRight: -110,marginBottom:-30 ,marginLeft:185}} />
  </TouchableOpacity>
  <TextInput
    value={PhoneNumber}
    onChangeText={(text) => setPhoneNumber(text)}
    secureTextEntry={false}
      editable={isEditingPhoneNumber}
    placeholderTextColor="#318CE7"
    style={{
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingTop: 55,
      width: 290,
      marginLeft:-190,
    }}
  />
</View>
</View>

         <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
    <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
  </TouchableOpacity>
      </View>

   

       {/* Save Changes Button */}
<View style={styles.notificationSetting}>
  <Text style={styles.notificationSettingText}>Enable Notifications</Text>
  <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
    onValueChange={toggleNotifications}
    value={notificationsEnabled}
  />
</View>



      
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderColor:'#318CE7',
  },

 
  profileImage: {
  width: 120,
  height: 120,
  borderRadius: 60,
  borderWidth: 1, // Set the width of the border
  borderColor: '#318CE7', // Set the color of the border
  marginBottom: 10,
},

  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor:'#318CE7',
  },

 
  phoneInputContainer: {
    marginBottom: 20,
    borderColor:  '#318CE7',
  },
  saveButton: {
    backgroundColor: '#318CE7',
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    width:170,
    marginLeft:90,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 120,
  paddingBottom: 20, // Or adjust as needed
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft:-1,
},

modalDeleteIcon: {
  // Style if needed
  marginLeft:14,
  color:'#318CE7',
},

 userName: {
    color: "#FF6347",
    marginLeft: 75,
    fontSize: 18,
    marginTop:15,
  },

   profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginTop: 8,
    textAlign: 'center',
  },

   resetPasswordButton: {
    backgroundColor: '#FF6347', // Tomato color for distinction
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 170,
    marginLeft: 90,
  },
  resetPasswordButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  notificationSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20
  },
  notificationSettingText: {
    fontSize: 18,
    color: '#318CE7'
  },
});

export default SettingScreen;
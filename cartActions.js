import { setCart, setPickupDetails } from './CartReducer'; // Adjust the import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase'; // Ensure this is correctly imported

// This action is for saving pickup details asynchronously
export const savePickupDetailsAsync = (pickupDetails) => async (dispatch) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      await setDoc(doc(db, "users", userUid), { pickupDetails }, { merge: true });
      dispatch(setPickupDetails(pickupDetails));
    }
  } catch (error) {
    console.error('Failed to save pickup details:', error);
  }
};


// Fetches cart data and pickup details
export const fetchCartDataAsync = (userUid) => async (dispatch) => {
  try {
    const pickupDetailsFromStorage = await AsyncStorage.getItem('pickupDetails');
    if (pickupDetailsFromStorage !== null) {
      dispatch(setPickupDetails(JSON.parse(pickupDetailsFromStorage)));
    }

    const docRef = doc(db, 'users', userUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.orders) {
        dispatch(setCart(Object.values(userData.orders)));
      }
      if (userData.pickupDetails) {
        dispatch(setPickupDetails(userData.pickupDetails));
      }
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

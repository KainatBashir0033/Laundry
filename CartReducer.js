import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore'; // Import from Firebase
import { db, auth } from './firebase'; // Import your Firebase config
import { fetchCartDataAsync } from './cartActions';
import { onSnapshot } from 'firebase/firestore';

// Helper function to update cart in Firebase
const updateCartInFirebase = async (cart) => {
  const userUid = auth.currentUser?.uid;
  if (userUid) {
    await setDoc(doc(db, "users", userUid), { orders: cart }, { merge: true });
  }
};


// Helper function to update pickup details in Firebase and AsyncStorage
const savePickupDetailsToStorageAndFirebase = async (pickupDetails) => {
  const userUid = auth.currentUser?.uid;
  if (userUid) {
    await AsyncStorage.setItem('pickupDetails', JSON.stringify(pickupDetails));
    await setDoc(doc(db, "users", userUid), { pickupDetails }, { merge: true });
  }
};
export const savePickupDetails = async (pickupDetails) => {
  try {
    // Save to AsyncStorage
    await AsyncStorage.setItem('pickupDetails', JSON.stringify(pickupDetails));
    // Save to Firebase
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      await setDoc(doc(db, "users", userUid), { pickupDetails }, { merge: true });
    }
  } catch (error) {
    // Check for any errors thrown
    console.error('Failed to save pickup details', error);
  }
};


// Define the function to save cart data to AsyncStorage
const saveCartToAsyncStorage = async (cart) => {
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
};
export const CartSlice = createSlice({
    name: "cart",
     initialState: {
    cart: [],
    pickupDetails: {}
  },
    reducers: {
       addToCart: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      saveCartToAsyncStorage(state.cart);
      updateCartInFirebase(state.cart, auth.currentUser?.uid);
    },
        removeFromCart: (state, action) => {
            const newCart = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = newCart;
            saveCartToAsyncStorage(newCart);
            updateCartInFirebase(newCart, auth.currentUser?.uid);
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity++;
                saveCartToAsyncStorage(state.cart);
                updateCartInFirebase(state.cart, auth.currentUser?.uid);
            }
        },

setPickupDetails: (state, action) => {
      state.pickupDetails = action.payload;
    },

       decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.cart = state.cart.filter((item) => item.id !== action.payload.id);
                }
                saveCartToAsyncStorage(state.cart);
                updateCartInFirebase(state.cart, auth.currentUser?.uid);
            }
        },
        cleanCart: (state) => {
            state.cart = [];
            saveCartToAsyncStorage(state.cart);
            updateCartInFirebase(state.cart, auth.currentUser?.uid);
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart, setCart, setPickupDetails } = CartSlice.actions;

export default CartSlice.reducer;


export const subscribeToCartUpdates = () => (dispatch) => {
  const userUid = auth.currentUser?.uid;
  if (userUid) {
    return onSnapshot(doc(db, "users", userUid), (doc) => {
      const data = doc.data();
      if (data) {
        dispatch(setCart(data.orders || []));
        dispatch(setPickupDetails(data.pickupDetails || {}));
      }
    });
  }
};

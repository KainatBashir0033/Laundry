import { createSlice } from '@reduxjs/toolkit';

export const pickupDetailsSlice = createSlice({
  name: 'pickupDetails',
  initialState: {
    pickUpDate: null,
    selectedTime: null,
    noOfDays: null,
  },
  reducers: {
    setPickupDetails: (state, action) => {
      const { pickUpDate, selectedTime, noOfDays } = action.payload;
      state.pickUpDate = pickUpDate;
      state.selectedTime = selectedTime;
      state.noOfDays = noOfDays;
    },
  },
});

export const { setPickupDetails } = pickupDetailsSlice.actions;
export default pickupDetailsSlice.reducer;

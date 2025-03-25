// features/reservationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReservationState {
  carModel: string;
  providerId: string | null;
  pickupDate: string;
  returnDate: string;
}

const initialState: ReservationState = {
  carModel: '',
  providerId: null,
  pickupDate: '',
  returnDate: '',
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setCarModel(state, action: PayloadAction<string>) {
      state.carModel = action.payload;
    },
    setProviderId(state, action: PayloadAction<string>) {
      state.providerId = action.payload;
    },
    setPickupDate(state, action: PayloadAction<string>) {
      state.pickupDate = action.payload;
    },
    setReturnDate(state, action: PayloadAction<string>) {
      state.returnDate = action.payload;
    },
    clearReservationData(state) {
      state.carModel = '';
      state.providerId = null;
      state.pickupDate = '';
      state.returnDate = '';
    },
  },
});

export const { setCarModel, setProviderId, setPickupDate, setReturnDate, clearReservationData } = reservationSlice.actions;
export default reservationSlice.reducer;

// features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  userId: string | null;
}

const initialState: UserState = {
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    clearUserData(state) {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setUserToken, setUserId, clearUserData } = userSlice.actions;
export default userSlice.reducer;

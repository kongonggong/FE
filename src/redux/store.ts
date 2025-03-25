// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage as the default storage engine
import userReducer from './features/userSlice';
import reservationReducer from './features/reservationSlice';
import { combineReducers } from 'redux';

// Create a persist configuration
const persistConfig = {
  key: 'root', // Key to store in the localStorage
  storage,     // Storage engine (localStorage)
};

// Combine reducers if needed
const rootReducer = combineReducers({
  user: userReducer,
  reservation: reservationReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

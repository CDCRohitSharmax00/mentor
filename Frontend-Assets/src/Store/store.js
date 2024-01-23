import { combineReducers,configureStore } from "@reduxjs/toolkit";
import mentorSlice from "../Reducers/mentorSlice";
import userReducer from "../Reducers/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from "../Reducers/auth";

const rootReducer = combineReducers({ user: userReducer,mentor : mentorSlice, auth: auth});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
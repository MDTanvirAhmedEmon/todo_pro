import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { authSlice } from './features/auth/authSlice';
import { baseApi } from './api/baseApi';

const persistConfig = {
    key: "todo_pro",
    storage,
    blacklist: ["baseApi"],
};

const rootReducer = combineReducers({
    logInUser: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

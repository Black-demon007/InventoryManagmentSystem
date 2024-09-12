import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/userRedux';
import productReducer from '../features/productRedux';
import editReducer from '../features/editRedux'; 
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'appRoot',
    version: 1,
    storage,
};


const combinedReducers = combineReducers({
    user: userReducer,
    products: productReducer,
    edit: editReducer,
});


const persistentReducer = persistReducer(persistConfig, combinedReducers);


export const store = configureStore({
    reducer: persistentReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(store);

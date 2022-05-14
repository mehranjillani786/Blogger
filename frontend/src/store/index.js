import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux' 
import  userSlice  from './features/user/UserSlice' 
import blog from "./features/blog/BlogSlice" 
import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import CryptoJS from 'crypto-js'; 
import {SECRET_KEY, NODE_ENV} from "../helper/constants"   
// only encrypt login user data
const encrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), SECRET_KEY);
    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  },
  { whitelist: ['user'] }
); 

export const reducer = combineReducers({ 
  user: userSlice,
  blog:blog
}) 

const rootReducer = (state, action) => {  
  if (action.type === "user/logout") { // check for action type 
    state.user = undefined; 
    storage.removeItem(`persist:auth`) 
  }
  return reducer(state, action);
};
const persistConfig = {
  key: 'auth',
  whitelist: ['user'],
  storage,
  transforms: [encrypt]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: NODE_ENV !== 'p',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;




import { createSlice } from '@reduxjs/toolkit';
import { addContact, loginUser, registerUser } from "./UserAction"
import toast from 'react-hot-toast';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    isAuthenticated: false
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false; 
      return state;
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      state.isFetching = false
      state.isSuccess = false
      toast.success("Successfully Log out")
      state.isError = false
      state.isAuthenticated = false
    },
    setLoading: (state, { payload }) => {
      state.isFetching = payload;
    },
    setMsg: (state, { payload }) => {
      state.errorMessage = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isFetching = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.token = action.payload.jwt;
        toast.success( "User Login Successfully" )
        return state;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        toast.error( "Login Failed" )
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        toast.success("Register Successfully")   
        return state;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isFetching = false; 
        toast.error("Registration Failed") 
        state.isError = true;
        state.isAuthenticated = false;
      })
      .addCase(addContact.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isFetching = false;
        toast.success("Message Send")
        return state;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isFetching = false;
        toast.success("Message Sending Failed")

      })
  },
});


export const { clearState, logout, setLoading, setMsg } = userSlice.actions
export default userSlice.reducer
export const userSelector = (state) => state.user;
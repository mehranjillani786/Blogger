import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequestAxio } from '../../../helper/Axios'; 
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, thunkAPI) => { 
    try {
      let res = await apiRequestAxio("POST", `api/auth/local`, {identifier:email, password }, { "Content-Type": "application/json" })
      return res.data
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })
 
export const registerUser = createAsyncThunk(
  'users/register',
  async (data, thunkAPI) => { 
    try {
      let res = await apiRequestAxio("POST", `api/auth/local/register`, {name:data.name,username:data.email, password:data.password, email:data.email}, { "Content-Type": "application/json" })
      return res.data
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }) 


  export const addContact = createAsyncThunk(
    'auth/add-contact',
    async (data, thunkAPI) => {
      try {
        let res = await apiRequestAxio("POST", `api/contacts`, { data }, { "Content-Type": "application/json" })
        return res.data
      } catch (err) {
        if (!err.response) {
          throw err
        }
        return thunkAPI.rejectWithValue(err.response.data)
      }
    })
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequestAxio } from '../../../helper/Axios';  
export const getBlogs = createAsyncThunk(
  'auth/get-blogs',
  async (thunkAPI) => {
    try {
      let res = await apiRequestAxio("GET", `api/blogs?populate=*`, { "Content-Type": "application/json" })
      return res.data
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  })

  export const getBlogBySlug = createAsyncThunk(
    'auth/get-blog',
    async (slug,thunkAPI) => {
      try {
        let res = await apiRequestAxio("GET", `api/blogs?filters[slug][$eq]=${slug}&populate=*`, { "Content-Type": "application/json" })
        return res.data
      } catch (err) {
        if (!err.response) {
          throw err
        }
        return thunkAPI.rejectWithValue(err.response.data)
      }
    })
    

    export const loadComments = createAsyncThunk(
      'auth/get-comments',
      async (thunkAPI) => {
        try {
          let res = await apiRequestAxio("GET", `api/comments?populate=*`, { "Content-Type": "application/json" })
          return res.data
        } catch (err) {
          if (!err.response) {
            throw err
          }
          return thunkAPI.rejectWithValue(err.response.data)
        }
      })

      export const loadCommentsByid = createAsyncThunk(
        'auth/get-comments-by-id',
        async (id,thunkAPI) => {
          try {
            let res = await apiRequestAxio("GET", `api/comments/${id}?populate=*`, { "Content-Type": "application/json" })
            return res.data
          } catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkAPI.rejectWithValue(err.response.data)
          }
        })

        
        export const addComment = createAsyncThunk(
          'auth/add-comment',
          async ( data, thunkAPI) => {
            try { 
              let res = await apiRequestAxio("POST", `api/comments?populate=*`,{data}, { "Content-Type": "application/json" }) 
              return res.data
            } catch (err) {
              if (!err.response) {
                throw err
              }
              return thunkAPI.rejectWithValue(err.response.data)
            }
          })


          export const updateComment = createAsyncThunk(
            'auth/update-comment',
            async ( data, thunkAPI) => {
              try { 
                let res = await apiRequestAxio("PUT", `api/comments/${data.id}?populate=*`,{data}, { "Content-Type": "application/json" }) 
                return res.data
              } catch (err) {
                if (!err.response) {
                  throw err
                }
                return thunkAPI.rejectWithValue(err.response.data)
              }
            })

            export const deleteComment = createAsyncThunk(
              'auth/delete-comment',
              async ( data, thunkAPI) => {
                try { 
                  let res = await apiRequestAxio("DELETE", `api/comments/${data.id}`,{data}, { "Content-Type": "application/json" }) 
                  return res.data
                } catch (err) {
                  if (!err.response) {
                    throw err
                  }
                  return thunkAPI.rejectWithValue(err.response.data)
                }
              })
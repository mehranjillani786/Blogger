import { createSlice } from '@reduxjs/toolkit'; 
import toast from 'react-hot-toast';
import {addComment, deleteComment, getBlogBySlug, getBlogs, loadComments, loadCommentsByid, updateComment} from "./BlogAction"

export const BlogSlice = createSlice({
  name: 'blog',
  initialState: { 
    isFetching:false,
    blog:[],
    selectedBlog:null,
    comments:[]
  },
  reducers: {  
    clearComment:(state, action) => {  
      state.comments = [] 
    },
    setCommentsArray:(state, action)=>{
      state.comments = [...state, ...action.payload]
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => { 
        state.blog = action?.payload?.data;
        state.isFetching = false 
        return state;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.blog = action?.payload;
        state.isFetching = false
      }) 
      .addCase(getBlogBySlug.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getBlogBySlug.fulfilled, (state, action) => { 
        state.selectedBlog = Array.isArray(action?.payload?.data) && action?.payload?.data.length>0?action?.payload?.data[0]:null;
        state.isFetching = false 
        return state;
      })
      .addCase(getBlogBySlug.rejected, (state, action) => {
        state.selectedBlog = action?.payload;
        state.isFetching = false
      }) 

      .addCase(loadComments.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => { 
        state.comments =action?.payload?.data
         state.isFetching = false 
        return state;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.selectedBlog = action?.payload;
        state.isFetching = false
      })
      
      .addCase(loadCommentsByid.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadCommentsByid.fulfilled, (state, action) => { 
        // state.comments =action?.payload?.data?. 
        let index = state.comments.findIndex(f=>f.id===action?.payload?.data?.id)
        if(index !== -1){
          state.comments[index]=  action?.payload?.data
        } 
         state.isFetching = false 
        return state;
      })
      .addCase(loadCommentsByid.rejected, (state, action) => { 
        state.isFetching = false
      })
      .addCase(addComment.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addComment.fulfilled, (state, action) => { 
        state.comments = [...state.comments, action?.payload?.data];
        state.isFetching = false 
        toast.success("Comment Added Successfully") 
        return state;
      })
      .addCase(addComment.rejected, (state, action) => { 
        state.isFetching = false
        toast.error("Request Failed") 

      })
      .addCase(updateComment.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {  
        let index = state.comments.findIndex(f=>f.id===action?.payload?.data?.id)
        if(index !== -1){
          state.comments[index]=   action?.payload?.data 
        } 
        state.isFetching = false 
        toast.success("Comment Successfully Updated") 
        return state;
      })
      .addCase(updateComment.rejected, (state, action) => { 
        state.isFetching = false
        toast.error("Request Failed") 

      })
      .addCase(deleteComment.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {  
        let index = state.comments.findIndex(f=>f.id===action?.payload?.data?.id) 
        if(index !== -1){
          state.comments.splice(index, 1)
        } 
        state.isFetching = false 
        toast.success("Comment Deleted") 
        return state;
      })
      .addCase(deleteComment.rejected, (state, action) => { 
        state.isFetching = false
        toast.error("Request Failed") 

      })
  },
});
 
export const { clearComment, setCommentsArray} = BlogSlice.actions

export default BlogSlice.reducer 
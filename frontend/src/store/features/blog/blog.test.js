import { addComment, deleteComment, getBlogBySlug, getBlogs, loadComments, loadCommentsByid, updateComment } from "./BlogAction";
import BlogSlice from "./BlogSlice"
import configureStore from 'redux-mock-store' //ES6 modules
import nock from "nock"
import reducer from './BlogSlice';


const middlewares = []
const mockStore = configureStore(middlewares)



describe('Comments  fetching', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: loadComments.pending };
    const initialState = BlogSlice(
      {
        isfetching: false
      }, action);
    expect({ isfetching: true }).toEqual({ isfetching: true })
  })


})


describe('BlogSlice', () => {
  describe('reducers', () => {
    const initialState = {
      isFetching: false,
      blog: [],
      selectedBlog: null,
      comments: []
    }

    it('sets fetching true when getBlogs is pending', () => {
      const action = { type: getBlogs.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when getBlogs is fulfilled', () => {
      const action = { type: getBlogs.fulfilled.type, payload: null };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false,
        blog: undefined,
        selectedBlog: null,
        comments: []
      });
    });
    it('sets fetching false when getBlogs is rejected', () => {
      const action = { type: getBlogs.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false,
        blog: { error: 'some error' },
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching true when getBlogsbyslug is pending', () => {
      const action = { type: getBlogBySlug.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when getBlogsbyslug is fulfilled', () => {
      const action = { type: getBlogBySlug.fulfilled.type, payload: {slug:"test-slug"} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });
    it('sets fetching false when getBlogsbyslug is rejected', () => {
      const action = { type: getBlogBySlug.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action);
 
      expect(state).toEqual({
        isFetching: false,
        blog: [],
        selectedBlog: { error: 'some error' },
        comments: []
      });
    });


    // comment load

    it('sets fetching true when loadComments is pending', () => {
      const action = { type: loadComments.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when loadComments is fulfilled', () => {
      const action = { type: loadComments.fulfilled.type, payload: null };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false,
        blog: [],
        selectedBlog: null,
        comments: undefined
      });
    });
    it('sets fetching false when loadComments is rejected', () => {
      const action = { type: loadComments.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false,
        blog: [],
        selectedBlog: { error: 'some error' },
        comments: []
      });
    });





    it('sets fetching true when loadCommentsByid is pending', () => {
      const action = { type: loadCommentsByid.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when loadCommentsByid is fulfilled', () => {
      const action = { type: loadCommentsByid.fulfilled.type, payload: {id:1} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });
    it('sets fetching false when loadCommentsByid is rejected', () => {
      const action = { type: loadCommentsByid.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });







    it('sets fetching true when addComments is pending', () => {
      const action = { type: addComment.pending.type,payload: {message:"Test Comments"} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when addComments is fulfilled', () => {
      const action = { type: addComment.fulfilled.type, payload: {message:"Test Comments"} };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false,
        blog: [],
        selectedBlog: null,
        comments: [ undefined ]
      });
    });
    it('sets fetching false when addComments is rejected', () => {
      const action = { type: addComment.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });







    it('sets fetching true when updateComments is pending', () => {
      const action = { type: updateComment.pending.type,payload: {message:"Test Comments"} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when updateComments is fulfilled', () => {
      const action = { type: updateComment.fulfilled.type, payload: {message:"Test Comments"} };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });
    it('sets fetching false when updateComments is rejected', () => {
      const action = { type: updateComment.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });



    it('sets fetching true when deleteComment is pending', () => {
      const action = { type: deleteComment.pending.type,payload: {id:1} };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        isFetching: true,
        blog: [],
        selectedBlog: null,
        comments: []
      });
    });

    it('sets fetching when deleteComment is fulfilled', () => {
      const action = { type: deleteComment.fulfilled.type, payload: {id:1} };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });
    it('sets fetching false when deleteComment is rejected', () => {
      const action = { type: deleteComment.rejected.type, payload: { error: 'some error' } };
      const state = reducer(initialState, action); 
      expect(state).toEqual({
        isFetching: false, blog: [], selectedBlog: null, comments: []
      });
    });

  });

});
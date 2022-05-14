import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Contact, Login, Register, Home, Header, Category1, Category2, Footer, Blog, Feature } from "./components"
import { category } from "./helper/constants"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from './store/features/blog/BlogAction';
import toast, { Toaster } from 'react-hot-toast';
function App() {

  const { isAuthenticated, isFetching, isSuccess, isError } = useSelector(state => state.user)

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBlogs());
  }, [])


  return (
    <div>
      <Toaster position='top-right' />
      {isFetching ? <div className="text-center overlay">
        <div className="spinner-border position-absolute top-50" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : null}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}
        {/* <Route path={category[0]?.path} element={<Category1 />} />
        <Route path={category[1]?.path} element={<Category2 />} /> */}
        <Route path="/blog" element={<Blog />} />

      </Routes>
      
      <Footer />

    </div>
  );
}

export default App;

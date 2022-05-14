import React from "react";
import ReactDOM  from "react-dom";
import Category1 from "./Category1"
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import {Provider} from "react-redux";
import store from "../../store/index"



test('renders Category1 without crashing',()=>{ 
    const div = document.createElement("div");
    render(<Provider store={store}><Category1/></Provider>,div) 
})

 


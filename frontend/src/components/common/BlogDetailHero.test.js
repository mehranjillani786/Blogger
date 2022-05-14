import React from "react";
import ReactDOM  from "react-dom";
import BlogDetailHero from "./BlogDetailHero"
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"


afterEach(cleanup)

it("renders BlogDetailHero without crashing", ()=>{
    const div = document.createElement("div");
    render(<BlogDetailHero></BlogDetailHero>,div)
})

it("renders BlogDetailHero correctly", () => {
    const {queryByTestId}  = render(<BlogDetailHero title="Test Title" tagline="test tagline" image="" publishedAt={new Date().toDateString()}></BlogDetailHero>)
    expect(queryByTestId('blogItem')).toHaveTextContent("Test Title")
}) 



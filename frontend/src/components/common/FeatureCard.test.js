import React from "react";
import ReactDOM  from "react-dom";
import FeatureCard from "./FeatureCard"
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"


afterEach(cleanup)

it("renders FeatureCard without crashing", ()=>{
    const div = document.createElement("div");
    render(<FeatureCard></FeatureCard>,div)
})

it("renders FeatureCard correctly", () => {
    const {queryByTestId}  = render(<FeatureCard title="We're Living Some Strange Times" slug="we-re-living-some-strange-times" tagline="This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer." image="" publishedAt={new Date().toDateString()}></FeatureCard>)
    expect(queryByTestId('featureItem')).toHaveTextContent("We're Living Some Strange Times")
})
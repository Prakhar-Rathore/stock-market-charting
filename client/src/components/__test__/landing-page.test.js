import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./../landing-page";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<BrowserRouter><LandingPage/></BrowserRouter>));
});

it("renders correctly", () => {
  render(<BrowserRouter><LandingPage/></BrowserRouter>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<BrowserRouter><LandingPage/></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
})
import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./../navbar";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Navbar/>));
});

it("renders correctly", () => {
  render(<Navbar/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Navbar/>).toJSON();
  expect(tree).toMatchSnapshot();
})
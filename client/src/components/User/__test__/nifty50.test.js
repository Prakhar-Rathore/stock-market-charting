import React from "react";
import ReactDOM from "react-dom/client";
import Nifty50 from "./../nifty50";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Nifty50/>));
});

it("renders correctly", () => {
  render(<Nifty50/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Nifty50/>).toJSON();
  expect(tree).toMatchSnapshot();
})
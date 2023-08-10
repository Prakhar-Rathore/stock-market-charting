import React from "react";
import ReactDOM from "react-dom/client";
import MarketDirection from "./../marketDirection";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<MarketDirection/>));
});

it("renders correctly", () => {
  render(<MarketDirection/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<MarketDirection/>).toJSON();
  expect(tree).toMatchSnapshot();
})


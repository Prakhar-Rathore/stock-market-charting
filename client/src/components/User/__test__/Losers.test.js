import React from "react";
import ReactDOM from "react-dom/client";
import Losers from "./../Losers";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Losers/>));
});

it("renders correctly", () => {
  render(<Losers/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Losers/>).toJSON();
  expect(tree).toMatchSnapshot();
})
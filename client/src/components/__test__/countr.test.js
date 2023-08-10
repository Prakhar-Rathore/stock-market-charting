import React from "react";
import ReactDOM from "react-dom/client";
import Countr from "./../countr";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Countr/>));
});

it("renders correctly", () => {
  render(<Countr/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Countr/>).toJSON();
  expect(tree).toMatchSnapshot();
})
import React from "react";
import ReactDOM from "react-dom/client";
import Sensex from "./../sensex";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Sensex/>));
});

it("renders correctly", () => {
  render(<Sensex/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Sensex/>).toJSON();
  expect(tree).toMatchSnapshot();
})
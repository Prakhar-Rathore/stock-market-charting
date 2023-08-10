import React from "react";
import ReactDOM from "react-dom/client";
import Country from "./../country";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<Country/>));
});

it("renders correctly", () => {
  render(<Country/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<Country/>).toJSON();
  expect(tree).toMatchSnapshot();
})

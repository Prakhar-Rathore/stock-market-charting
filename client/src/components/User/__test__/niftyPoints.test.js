import React from "react";
import ReactDOM from "react-dom/client";
import NiftyPoints from "./../niftyPoints";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<NiftyPoints/>));
});

it("renders correctly", () => {
  render(<NiftyPoints/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<NiftyPoints/>).toJSON();
  expect(tree).toMatchSnapshot();
})
import React from "react";
import ReactDOM from "react-dom/client";
import BiggestGainers from "./../biggestGainers";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<BiggestGainers/>));
});

it("renders correctly", () => {
  render(<BiggestGainers/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<BiggestGainers/>).toJSON();
  expect(tree).toMatchSnapshot();
})



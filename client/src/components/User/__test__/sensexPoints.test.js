import React from "react";
import ReactDOM from "react-dom/client";
import SensexPoints from "./../sensexPoints";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<SensexPoints/>));
});

it("renders correctly", () => {
  render(<SensexPoints/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<SensexPoints/>).toJSON();
  expect(tree).toMatchSnapshot();
})

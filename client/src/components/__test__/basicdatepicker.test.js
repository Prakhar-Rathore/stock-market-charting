import React from "react";
import ReactDOM from "react-dom/client";
import BasicDatePicker from "./../basicdatepicker";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<BasicDatePicker/>));
});

it("renders correctly", () => {
  render(<BasicDatePicker/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<BasicDatePicker/>).toJSON();
  expect(tree).toMatchSnapshot();
})
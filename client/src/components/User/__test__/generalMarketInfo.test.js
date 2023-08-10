import React from "react";
import ReactDOM from "react-dom/client";
import GeneralMarketInfo from "./../generalMarketInfo";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<GeneralMarketInfo/>));
});

it("renders correctly", () => {
  render(<GeneralMarketInfo/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<GeneralMarketInfo/>).toJSON();
  expect(tree).toMatchSnapshot();
})

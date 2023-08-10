import React from "react";
import ReactDOM from "react-dom/client";
import LeaderIndex from "./../leaderIndex";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<LeaderIndex/>));
});

it("renders correctly", () => {
  render(<LeaderIndex/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<LeaderIndex/>).toJSON();
  expect(tree).toMatchSnapshot();
})

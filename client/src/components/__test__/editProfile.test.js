import React from "react";
import ReactDOM from "react-dom/client";
import EditProfile from "./../editProfile";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<EditProfile/>));
});

it("renders correctly", () => {
  render(<EditProfile/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<EditProfile/>).toJSON();
  expect(tree).toMatchSnapshot();
})
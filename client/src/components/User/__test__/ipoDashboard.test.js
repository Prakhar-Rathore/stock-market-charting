import React from "react";
import ReactDOM from "react-dom/client";
import IpoDashboard from "./../ipoDashboard";
import Header from "./../Header";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

jest.mock("./../Header", () => {
    return {
      __esModule: true,
      default: () => {
        return <div/>;
      },
      Header: () => {
        return <div/>;
      },
    };
  });

it("renders without crashing", async() => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act( async () => render(<IpoDashboard/>));
});

it("renders correctly", () => {
  render(<IpoDashboard/>)
})

it("matches snapshot", () => {
  const tree = renderer.create(<IpoDashboard/>).toJSON();
  expect(tree).toMatchSnapshot();
})

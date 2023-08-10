import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';



test('renders app', async() => {
  await act( async () => render(<BrowserRouter><App /></BrowserRouter>));
});

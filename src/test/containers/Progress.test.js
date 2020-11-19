import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AppWrapper from '../initialize';

axios.defaults.adapter = require('axios/lib/adapters/http');

beforeEach(async () => {
  render(<AppWrapper />);
});

afterEach(() => {
  cleanup();
});

describe('Progress component', () => {
  test('renders component', async () => {
    const inputEmail = screen.getAllByRole('textbox');
    const inputPassword = screen.getByTestId('login-password')
    const loginButton = screen.getByText('Login')
    
    fireEvent.change(inputEmail[0], {
      target: { value: 'a@mail.com' }
    });

    fireEvent.change(inputPassword, {
      target: { value: '12345' }
    });

    fireEvent.click(loginButton);
    fireEvent.click(await screen.findByTestId('progress-link'));
    
    const progressLoading = await screen.findByTestId('progress-loading');

    expect(progressLoading).toBeVisible();
  });
});

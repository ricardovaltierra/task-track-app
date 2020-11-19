import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AppWrapper from '../initialize';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

axios.defaults.adapter = require('axios/lib/adapters/http');

beforeEach(async () => {
  render(<AppWrapper />);
});

afterEach(() => {
  cleanup();
});

describe('Profile component', () => {
  test('renders component and delete account', async () => {
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
    fireEvent.click(await screen.findByTestId('profile-link'));

    const profileButton = await screen.findAllByRole('button');
    fireEvent.click(profileButton[0])

    const homeTitle = await screen.findByTestId('home-title');
    expect(homeTitle).toBeInTheDocument();
    
  });
});

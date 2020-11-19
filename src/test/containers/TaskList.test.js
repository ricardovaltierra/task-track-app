import React from 'react';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
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

describe('TaskList component', () => {
  test('renders component and creates new task', async () => {
    const inputEmail = screen.getAllByRole('textbox');
    const inputPassword = screen.getByTestId('login-password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(inputEmail[0], {
      target: { value: 'a@mail.com' },
    });

    fireEvent.change(inputPassword, {
      target: { value: '12345' },
    });

    fireEvent.click(loginButton);
    fireEvent.click(await screen.findByTestId('tasklist-link'));

    await screen.findByText('Loading...');

    fireEvent.click(await screen.findByText('New task'));

    const inputTaskName = await screen.findByPlaceholderText('Your awesome task...');
    const inputDescription = await screen.findByPlaceholderText('Describe it a bit');
    const inputCompletion = await screen.findByPlaceholderText('Covered');

    fireEvent.change(inputTaskName, {
      target: { value: 'Task here again' },
    });

    fireEvent.change(inputDescription, {
      target: { value: 'Test description' },
    });

    fireEvent.change(inputCompletion, {
      target: { value: 0 },
    });

    fireEvent.click(await screen.findByText('Save task'));
  });
});

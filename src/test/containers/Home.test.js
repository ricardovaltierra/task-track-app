import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AppWrapper from '../initialize';

beforeEach(() => {
  render(<AppWrapper />);
})

describe('Home', () => {
  test('renders Home component', () => {

    const homeTitle = screen.getByText(/Tasktracker/);
    const logInWelcome = screen.getByText(/Welcome/);
    const logInSignUpButtons = screen.getAllByRole('listitem');

    expect(homeTitle).toBeInTheDocument();
    expect(logInWelcome).toBeInTheDocument();
    expect(logInSignUpButtons[0]).toHaveClass('active');
  });

  test('show error log in pasword', async () => {

    const loginInput = screen.getAllByRole('textbox');
    const loginButton = screen.getByText('Login')

    await userEvent.type(loginInput[0], 'a@mail.com');
    await userEvent.type(loginInput[1], '1234');
    
    const message = null;

    (async function () {
      await userEvent.click(loginButton)
      const message = await screen.findByText(/Authentication failed/)
      expect(message).toBeInTheDocument()
    })();
  });

  test('user logs in', async () => {

    const loginInput = screen.getAllByRole('textbox');
    const loginButton = screen.getByText('Login')

    await userEvent.type(loginInput[0], 'a@mail.com');
    await userEvent.type(loginInput[1], '12345');
    
    const message = null;

    (async function () {
      await userEvent.click(loginButton)
      const message = await screen.findByText(/Authentication failed/)
      expect(message).toBeNull()
    })();
  });
});

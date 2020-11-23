import React from 'react';
import { render } from '@testing-library/react';
import AppWrapper from '../initialize';

describe('App', () => {
  test('renders App component', () => {
    render(<AppWrapper />);
  });
});

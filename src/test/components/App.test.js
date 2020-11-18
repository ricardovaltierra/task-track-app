import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import rootReducer from '../../reducers/index';
import App from '../../components/App';

describe('App', () => {
  test('renders App component', () => {

    const store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});

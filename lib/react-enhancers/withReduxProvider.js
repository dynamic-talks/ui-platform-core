import React from 'react';
import { Provider } from 'react-redux';



export const withReduxProvider = (store) => (Component) => {
  const ReduxProvider = (props) => (
    <Provider store={store} {...props}>
      <Component/>
    </Provider>
  );

  return ReduxProvider;
}

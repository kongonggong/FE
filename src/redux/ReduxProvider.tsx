'use client';  // Mark this as a Client Component

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const ReduxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children} {/* Children will now have access to Redux state */}
    </Provider>
  );
};

export default ReduxProvider;

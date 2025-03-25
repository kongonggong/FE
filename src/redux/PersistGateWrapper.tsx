'use client';  // This marks the file as a Client Component

import React, { ReactNode, useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

const PersistGateWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this code runs only client-side
  }, []);

  if (!isClient) {
    return null; // Don't render until client-side
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistGateWrapper;

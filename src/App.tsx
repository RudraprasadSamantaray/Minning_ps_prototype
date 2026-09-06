import React from 'react';
import { MiningProvider } from './context/MiningContext';
import { AppShell } from './components/layout/AppShell';

function App() {
  return (
    <MiningProvider>
      <AppShell />
    </MiningProvider>
  );
}

export default App;

// src/App.js

import React from 'react';
import PrimeMemberForm from './components/PrimeMemberForm';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PrimeMemberForm />
      </>
    </ThemeProvider>
  );
}

export default App;

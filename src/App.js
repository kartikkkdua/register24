import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import PrimeMemberForm from './components/PrimeMemberForm.jsx';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <PrimeMemberForm />
  </ThemeProvider>
);

export default App;

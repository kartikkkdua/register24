import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.jsx';
import theme from './styles/theme.jsx';
import PrimeMemberForm from './components/PrimeMemberForm.jsx';
import SuccessPage from './components/sucessPage.jsx';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <PrimeMemberForm />
    <SuccessPage />
  </ThemeProvider>
);

export default App;

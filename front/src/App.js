import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from "./routes";
import { theme } from "./theme";
import { Container } from '@material-ui/core';
import { GlobalStyles } from "./global";

import { AppContextProvider } from './context/state';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <GlobalStyles />

        <Container maxWidth="sm" disableGutters>

          <Routes />
        </Container>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;

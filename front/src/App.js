import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from "./routes";
import { theme } from "./theme";
import { Container } from '@material-ui/core';
import { GlobalStyles } from "./global";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />

      <Container maxWidth="sm" disableGutters>

        <Routes />
      </Container>

    </ThemeProvider>
  );
}

export default App;

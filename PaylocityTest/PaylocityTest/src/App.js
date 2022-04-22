import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer/MainContainer';
import { AppContext, AppProvider } from './context/AppContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <AppProvider>
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <MainContainer />
                </BrowserRouter>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;

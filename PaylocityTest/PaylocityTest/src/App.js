import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer/MainContainer';
import { AppContext, AppProvider } from './context/AppContext';

const App = () => {


    return (
        <AppProvider>
            <BrowserRouter>
                <MainContainer />
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;

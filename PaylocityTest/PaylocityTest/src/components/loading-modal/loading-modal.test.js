
import LoadingModal from './loading-modal';
import React from "react";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';


describe('loading modal tests',() => {
    let wrapper = null;
    let loading = false;

    beforeEach(() =>{
        wrapper = ({children}) => (
        <AppContext.Provider value={{ loading : loading }} >
            <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                {children}
            </MemoryRouter>
        </AppContext.Provider>
      )
    });
    


    it("Does not render the loading modal when loading is false", async () => {

    
        render(
            <LoadingModal />
            , {wrapper});
    
    
        const modal = screen.queryByText(/^Loading... Please wait/);
        
        expect(modal).toBeNull();
    
    });
    
    it("Renders the loading modal when loading is true", async () => {

        wrapper = ({children}) => (
            <AppContext.Provider value={{ loading: true }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )

        render(
            <LoadingModal />
            , {wrapper});
    
    
        
        expect(screen.getByText(/^Loading... Please wait/)).toBeInTheDocument();
    
    });
    
})

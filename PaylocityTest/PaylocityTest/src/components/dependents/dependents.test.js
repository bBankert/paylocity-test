
import Dependents from './dependents';
import React from "react";
import { MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';

describe('Dependents tests',() => {

    let wrapper = null;
    let dispatch = null;

    beforeEach(() =>{
        dispatch = jest.fn();
        wrapper = ({children}) => (
        <AppContext.Provider value={{ dispatch }} >
            <MemoryRouter initialEntries={[{ pathname: '/employee-detail/2' }]} >
                {children}
            </MemoryRouter>
        </AppContext.Provider>
      )

    });

    it("Displays no dependents if there are none", async () => {
    
    
    
        render(
            <Dependents  dependents={[]}/>
            , {wrapper});
    
        
        expect(screen.queryByText(/^Spouse|Child/)).toBeNull();
    });

    it("Displays child dependents if there are some", async () => {
    
    
    
        render(
            <Dependents  dependents={[{name:'timmy',type:2}]}/>
            , {wrapper});
    
        expect(screen.getByText(/^timmy/)).toBeInTheDocument();
        expect(screen.getByText(/^Child/)).toBeInTheDocument();
    });

    it("Displays spouse dependents if there are some", async () => {
    
    
    
        render(
            <Dependents  dependents={[{name:'sharon',type:1}]}/>
            , {wrapper});
    
        expect(screen.getByText(/^sharon/)).toBeInTheDocument();
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();
    });

    
})


import EmployeeDetail from './employee-detail';
import React from "react";
import { MemoryRouter,Route,Routes } from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';

describe('Employee detail tests',() => {

    let wrapper = null;
    let dispatch = null;
    let employees = [
        {
            name: 'tom',
            type: 0,
            dependents: [],
            id: 1
        }
    ];
    let dependents = [];

    beforeEach(() =>{
        dispatch = jest.fn();
        wrapper = ({children}) => (
        <AppContext.Provider value={{ dispatch,employees,dependents }} >
            <MemoryRouter initialEntries={[{ pathname: '/employee-detail/2' }]} >
                {children}
            </MemoryRouter>
        </AppContext.Provider>
      )
    });

    it("Displays loading message if no employee is found with id", async () => {
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch,employees,dependents }} >
                <MemoryRouter initialEntries={[{ pathname: '/employee-detail/2' }]} >
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <EmployeeDetail />
            , {wrapper});
    
        
        expect(screen.getByText(/^Loading Employee/)).toBeInTheDocument();
    });


    it("Displays employee if one is found with id", async () => {
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch,employees,dependents }} >
                <MemoryRouter initialEntries={[{ pathname: '/employee-detail/1' }]} >
                    <Routes>
                        <Route path='employee-detail/:id' element={children} />
                    </Routes>
                </MemoryRouter>
            </AppContext.Provider>
          )


        render(
            <EmployeeDetail />
            , {wrapper});
    
        
        expect(screen.getByText(/^tom/)).toBeInTheDocument();
        expect(dispatch).toBeCalled();
    });
    
})

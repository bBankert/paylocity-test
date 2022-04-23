
import EditEmployee from './edit-employee';
import React from "react";
import { MemoryRouter,Route,Routes } from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';
import { act } from 'react-dom/test-utils';


describe('Employee edit tests',() => {

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
            <MemoryRouter initialEntries={[{ pathname: '/edit-employee/1' }]} >
                <Routes>
                    <Route path='edit-employee/:id' element={children} />
                </Routes>
            </MemoryRouter>
        </AppContext.Provider>
      )
    });

    afterEach(() =>{
        wrapper = null;
        dispatch = null;
        dependents = null;
    });


    it("Displays employee with dependents", async () => {

        employees = [
            {
                name: 'tom',
                type: 0,
                dependents: [],
                id: 1
            }
        ];

        dependents = [
            {
                name:'timmy',
                type:2
            } 
        ]

        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch,employees,dependents }} >
                <MemoryRouter initialEntries={[{ pathname: '/edit-employee/1' }]} >
                    <Routes>
                        <Route path='edit-employee/:id' element={children} />
                    </Routes>
                </MemoryRouter>
            </AppContext.Provider>
          )
        


        render(
            <EditEmployee />
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^tom/)).toBeInTheDocument();
        expect(screen.getByText(/^timmy/)).toBeInTheDocument();

        expect(dispatch).toBeCalled();
    });

    it("Displays employee without dependents", async () => {



        render(
            <EditEmployee />
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^tom/)).toBeInTheDocument();
        expect(screen.getByText(/^No dependents found.../)).toBeInTheDocument();
        expect(dispatch).toBeCalled();
    });

    it("Updates the employee on submit", async () => {



        render(
            <EditEmployee />
            , {wrapper});
    
        await act(async () => {
            const submitButton = screen.getByText(/^Submit/);
            await submitButton.click();
        });
        
        
        expect(dispatch).toBeCalledTimes(2);
    });
    
})

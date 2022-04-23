
import Employees from './employees';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';


describe('employees tests',() => {


    afterEach(() => {
        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore();
    });

    it("renders employee data", async () => {
        const employees = [
            {
                name: "Joni Baez",
                id: 1,
                type: 0,
                depedents: []
            }
        ];
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(employees)
            })
        );
    
        const loading = false;
        const dispatch = jest.fn();
    
        const wrapper = ({children}) => (
            <AppContext.Provider value={{ employees, loading, dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <Employees />
            , {wrapper});
    
    
        
        expect(dispatch).toBeCalledTimes(2);
        expect(screen.getByText(/^Joni Baez/)).toBeInTheDocument();
    
    });
    
    it("renders text if no employees returned", async () => {
        const fakeEmployees = [];
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeEmployees)
            })
        );
    
        const employees = [];
        const loading = false;
        const dispatch = jest.fn();
    
        const wrapper = ({children}) => (
            <AppContext.Provider value={{ employees, loading, dispatch }} >
              {children}
            </AppContext.Provider>
          )
        // Use the asynchronous version of act to apply resolved promises
        render(
            <Employees />
            , {wrapper});
    
        expect(dispatch).toBeCalledTimes(2);
        expect(screen.getByText(/^No employees found.../)).toBeInTheDocument()
    
        
    });
    
})

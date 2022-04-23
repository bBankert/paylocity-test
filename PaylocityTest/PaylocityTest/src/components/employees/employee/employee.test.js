
import Employee from './employee';
import React from "react";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { AppContext } from '../../../context/AppContext';


describe('employee tests',() => {
    let wrapper = null;
    let dispatch = null;

    beforeEach(() =>{
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(true)
            })
        );
        dispatch = jest.fn();
        wrapper = ({children}) => (
        <AppContext.Provider value={{ dispatch }} >
            <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                {children}
            </MemoryRouter>
        </AppContext.Provider>
      )
    });

    afterEach(() => {
        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore();
    });
    


    it("renders employee data with 0 dependents if null", async () => {

    
        render(
            <Employee id={1} dependents={null} name="tom" />
            , {wrapper});
    
    
        
        expect(screen.getByText(/^tom/)).toBeInTheDocument();
        expect(screen.getByText(/^Dependents: 0/))
    
    });
    
    it("renders employee data with dependent count", async () => {

    
    
        const dependents = [
            {
                name: 'timmy',
                type: 2
            },
            {
                name: 'sharon',
                type: 1
            }
        ];

        render(
            <Employee id={1} dependents={dependents} name="tom" />
            , {wrapper});
    
    
        
        expect(screen.getByText(/^tom/)).toBeInTheDocument();
        expect(screen.getByText(/^Dependents: 2/))
    
    });


    it("deletes an employee on deletion click", async () => {

        let dependents = [
            {
                name: 'timmy',
                type: 2
            },
            {
                name: 'sharon',
                type: 1
            }
        ];

        render(
            <Employee id={1} dependents={dependents} name="tom" />
            , {wrapper});


        const deleteButton = screen.getByTestId('delete-employee-button');
        //await fetch result
        await deleteButton.click();

        expect(dispatch).toBeCalled();
    
    });
    
})


import EmployeeForm from './employee-form';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';
import { act } from 'react-dom/test-utils';


describe('Employee form tests',() => {

    let wrapper = null;
    let dispatch = null;
    let dependents = [];

    beforeEach(() => {
        dispatch = jest.fn();
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(true)
            })
        );
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dependents, dispatch }} >
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

    it("Renders dependents if there were some added", async () => {
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dependents: [{name:'tommy',type:2},{name:'sharon',type:1}], dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
        render(
            <EmployeeForm />
            , {wrapper});
    
        //renders tommy as a child
        expect(screen.getByText(/^tommy/)).toBeInTheDocument();
        expect(screen.getByText(/^Child/)).toBeInTheDocument();
        //renders sharon as spouse
        expect(screen.getByText(/^sharon/)).toBeInTheDocument();
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();
    
    });

    it("Renders no dependents message if there are no dependents", async () => {
    
        render(
            <EmployeeForm />
            , {wrapper});
    
        //renders tommy as a child
        expect(screen.getByText(/^No dependents found.../)).toBeInTheDocument();
    });


    it("Adds an employee on submit", async () => {
    
        render(
            <EmployeeForm />
            , {wrapper});
    

        await act(async() => {
            await fireEvent(
                screen.getByText(/^Submit/),
                new MouseEvent('click',{
                    bubbles: false,
                    cancelable: false
                })
            );
        })
        
        expect(dispatch).toBeCalledTimes(2);
        
    });

    
})

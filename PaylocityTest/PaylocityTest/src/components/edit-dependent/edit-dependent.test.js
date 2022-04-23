
import EditDependent from './edit-dependent';
import React from "react";
import { MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';
import { act } from 'react-dom/test-utils';

describe('Edit dependent tests',() => {

    let wrapper = null;
    let dispatch = null;

    let fetchSpy = null;

    const setEditing = jest.fn();

    beforeEach(() =>{
        dispatch = jest.fn();
        wrapper = ({children}) => (
        <AppContext.Provider value={{ dispatch }} >
            <MemoryRouter initialEntries={[{ pathname: '/employee-detail/2' }]} >
                {children}
            </MemoryRouter>
        </AppContext.Provider>
      )

      fetchSpy = jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(true)
            })
        );
    });

    afterEach(() => {
        global.fetch.mockRestore();
    });

    it("Displays child dependent information", async () => {
    
    
    
        render(
            <EditDependent  setEditing={setEditing} name="timmy" type="2" id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^timmy/)).toBeInTheDocument();
        expect(screen.getByText(/^Child/)).toBeInTheDocument();
    });

    it("Displays spouse dependent information", async () => {
    
    
    
        render(
            <EditDependent  setEditing={setEditing} name="sharon" type="1" id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^sharon/)).toBeInTheDocument();
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();
    });

    
    it("Updates dependent on submit on employee detail page", async () => {
    
    
    
        render(
            <EditDependent  setEditing={setEditing} name="sharon" type="1" id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^sharon/)).toBeInTheDocument();
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();


        await act(async () => {
            const submitButton = screen.getByText(/^Update Dependent/);
            await submitButton.click();
        });

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchSpy).toBeCalledTimes(1);
    });

    it("Updates dependent on submit on non-employee detail page", async () => {
    
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/employee-edit/2' }]} >
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )

    
        render(
            <EditDependent  setEditing={setEditing} name="sharon" type="1" id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByDisplayValue(/^sharon/)).toBeInTheDocument();
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();


        await act(async () => {
            const submitButton = screen.getByText(/^Update Dependent/);
            await submitButton.click();
        });

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchSpy).toBeCalledTimes(0);
    });

    
})

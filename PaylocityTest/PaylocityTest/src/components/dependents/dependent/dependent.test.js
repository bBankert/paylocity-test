
import Dependent from './dependent';
import React from "react";
import { MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../../context/AppContext';
import { act } from 'react-dom/test-utils';


describe('Dependents tests',() => {

    let wrapper = null;
    let dispatch = null;

    let fetchSpy = null;

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

    it("Display child dependent information", async () => {
    
    
    
        render(
            <Dependent  name="timmy" type="2" id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByText(/^Child/)).toBeInTheDocument();
        expect(screen.getByText(/^timmy/)).toBeInTheDocument();
    });

    it("Display spouse dependent information", async () => {
    
    
    
        render(
            <Dependent  name="sharon" type={1} id="1" employeeId="1"/>
            , {wrapper});
    
        
        expect(screen.getByText(/^Spouse/)).toBeInTheDocument();
        expect(screen.getByText(/^sharon/)).toBeInTheDocument();
    });

    it("Clicking the edit button opens the edit dialog", async () => {
    
    
    
        render(
            <Dependent  name="sharon" type={1} id="1" employeeId="1"/>
            , {wrapper});
    
        await act(async() => {
            const editButton = screen.getByTestId(/^edit-dependent-button/);
            await editButton.click();
        });
        expect(screen.getByText(/^Update Dependent/)).toBeInTheDocument();
    });

    it("Clicking the delete button deletes the dependent from the db", async () => {
    
    
    
        render(
            <Dependent  name="sharon" type={1} id="1" employeeId="1"/>
            , {wrapper});
    
        await act(async() => {
            const editButton = screen.getByTestId(/^delete-dependent-button/);
            await editButton.click();
        });

        expect(fetchSpy).toBeCalledTimes(1);
        expect(dispatch).toBeCalledTimes(2);
    });

    it("Clicking the delete button deletes the local dependent", async () => {
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/employee-edit/2' }]} >
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <Dependent  name="sharon" type={1} id="1" employeeId="1"/>
            , {wrapper});
    
        await act(async() => {
            const editButton = screen.getByTestId(/^delete-dependent-button/);
            await editButton.click();
        });

        expect(fetchSpy).toBeCalledTimes(0);
        expect(dispatch).toBeCalledTimes(2);
    });
})


import AddDependent from './add-dependent';
import React from "react";
import { MemoryRouter} from 'react-router-dom';
import {render, screen,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';
import { act } from 'react-dom/test-utils';


describe('Dependents tests',() => {

    let wrapper = null;
    let dispatch = null;

    beforeEach(() =>{
        dispatch = jest.fn();
        wrapper = ({children}) => (
        <AppContext.Provider value={{ dispatch }} >
            <MemoryRouter initialEntries={[{ pathname: '/' }]} >
                {children}
            </MemoryRouter>
        </AppContext.Provider>
        );

    });

    it("Adds the dependent on submit", async () => {
    
    
    
        render(
            <AddDependent  />
            , {wrapper});
    

        const nameField = screen.getByLabelText(/^Dependent Name/);
        nameField.value = "timmy";
        

        expect(nameField.value).toEqual("timmy");


        const addButton =  screen.getByText(/^Add Dependent/);

        await act(async() => {
            await fireEvent.click(addButton);
        })


        expect(nameField.value).toEqual('');
        expect(dispatch).toBeCalledTimes(1);
    });
})

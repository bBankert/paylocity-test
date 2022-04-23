
import SalaryWithBenefits from './salary-with-benefits';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppContext } from '../../context/AppContext';

describe('Salary with benefits tests',() => {

    let wrapper = null;
    let dispatch = null;
    const EmployeeAnnualBenefitCost = 1000;
    const DependentAnnualBenefitCost = 500;
    const nonDeductionEmployeePaycheckBenefitCost = parseFloat((EmployeeAnnualBenefitCost / 26).toFixed(2));
    const nonDeductionDependentPaycheckBenefitCost = (DependentAnnualBenefitCost / 26).toFixed(2);

    const EmployeeDeductionAnnualBenefitCost = 1000 * 0.9;
    const DependentDeductionAnnualBenefitCost = 500 * 0.9;
    const DeductionEmployeePaycheckBenefitCost = parseFloat((EmployeeDeductionAnnualBenefitCost / 26).toFixed(2));
    const DeductionDependentPaycheckBenefitCost = (DependentDeductionAnnualBenefitCost / 26).toFixed(2);

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

    it("renders employee data without dependents if they have none", async () => {
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <SalaryWithBenefits dependents={[]} name="tom" />
            , {wrapper});
    
    
        const WeeklySearchRegex = new RegExp(`Biweekly: ${nonDeductionEmployeePaycheckBenefitCost}`);
        const AnnualSearchRegex = new RegExp(`Annually: ${nonDeductionEmployeePaycheckBenefitCost * 26}`);
        
        expect(screen.getByText(WeeklySearchRegex)).toBeInTheDocument();
        expect(screen.getByText(AnnualSearchRegex)).toBeInTheDocument();
    });

    it("renders employee data with dependents if they have some", async () => {
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <SalaryWithBenefits dependents={[{name:'timmy',type:2}]} name="tom" />
            , {wrapper});
    
    
        const WeeklyEmployeeSearchRegex = new RegExp(`Biweekly: ${nonDeductionEmployeePaycheckBenefitCost}`);
        const AnnualEmployeeSearchRegex = new RegExp(`Annually: ${nonDeductionEmployeePaycheckBenefitCost * 26}`);
        const AnnualDependentSearchRegex = new RegExp(`Annually: ${nonDeductionDependentPaycheckBenefitCost * 26}`);
        const WeeklyDependentSearchRegex = new RegExp(`Biweekly: ${nonDeductionDependentPaycheckBenefitCost}`);
        
        expect(screen.getByText(WeeklyEmployeeSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(AnnualEmployeeSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(/^timmy/)).toBeInTheDocument();
        expect(screen.getByText(AnnualDependentSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(WeeklyDependentSearchRegex)).toBeInTheDocument();

    });

    it("renders employee data with dependents with deductions", async () => {
    
        wrapper = ({children}) => (
            <AppContext.Provider value={{ dispatch }} >
                <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                    {children}
                </MemoryRouter>
            </AppContext.Provider>
          )
    
    
        render(
            <SalaryWithBenefits dependents={[{name:'annie',type:2}]} name="Arnold" />
            , {wrapper});
    
    
        const WeeklyEmployeeSearchRegex = new RegExp(`Biweekly: ${DeductionEmployeePaycheckBenefitCost}`);
        const AnnualEmployeeSearchRegex = new RegExp(`Annually: ${(DeductionEmployeePaycheckBenefitCost * 26).toFixed(2)}`);
        const AnnualDependentSearchRegex = new RegExp(`Annually: ${(DeductionDependentPaycheckBenefitCost * 26).toFixed(2)}`);
        const WeeklyDependentSearchRegex = new RegExp(`Biweekly: ${DeductionDependentPaycheckBenefitCost}`);
        
        expect(screen.getByText(WeeklyEmployeeSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(AnnualEmployeeSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(/^annie/)).toBeInTheDocument();
        expect(screen.getByText(AnnualDependentSearchRegex)).toBeInTheDocument();
        expect(screen.getByText(WeeklyDependentSearchRegex)).toBeInTheDocument();

    });
    
})

import { ListItem,List,Chip,ListItemText,Divider } from "@mui/material";
import React, { useEffect, useState } from "react";


const SalaryWithBenefits = (props) => {
    const [WeeklySalary, SetWeeklySalary] = useState(2000);
    const BaseDependentDeduction = 500;
    const BaseEmployeeDedction = 1000;

    const CalculateIndividualDeductions = (name, baseAnnualDeduction) => {
        const deduction = name.charAt(0).toUpperCase() === 'A' ? (baseAnnualDeduction * 0.9) / 26 : baseAnnualDeduction / 26;
        return parseFloat(deduction.toFixed(2));
    }

    useEffect(() => {
        CalculateTotalDeductions();
    },[])
    
    const CalculateTotalDeductions = () => {
        const employeeDeductions = CalculateIndividualDeductions(props.name, BaseEmployeeDedction);
        const dependentDeductions = props.dependents && props.dependents.length > 0 ? props.dependents.map(dependent => CalculateIndividualDeductions(dependent.name,BaseDependentDeduction),0)[0] : 0;
        SetWeeklySalary(parseFloat((WeeklySalary - (employeeDeductions + dependentDeductions)).toFixed(2)));
    }

    return (
        <React.Fragment>
            
            <List>
                <ListItem>
                    <ListItemText primary={`Base Weekly Salary: $${WeeklySalary}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Annual Salary: $${WeeklySalary * 26}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Employee Benefit Deductions"} />
                    
                    <Chip color="error" label={`Weekly: ${CalculateIndividualDeductions(props.name, BaseEmployeeDedction)}`} sx={{ marginRight: '1rem' }} />
                    <Chip color="error" label={`Annually: ${CalculateIndividualDeductions(props.name, BaseEmployeeDedction) * 26}`}  />
                </ListItem>
                {props.dependents && props.dependents.length > 0 ?
                    props.dependents.map((dependent) => (
                        <ListItem key={`dependent-benefit-${dependent.id}`}>
                            <Divider />
                            <ListItemText primary={dependent.name} />
                            <Chip color="error" label={`Weekly: ${CalculateIndividualDeductions(dependent.name, BaseDependentDeduction)}`} sx={{ marginRight: '1rem' }} />
                            <Chip color="error" label={`Annually: ${CalculateIndividualDeductions(dependent.name, BaseDependentDeduction) * 26}`} />
                        </ListItem>
                    )) : ''
            
                }
            </List>
            
        </React.Fragment>
    );


};

export default SalaryWithBenefits;
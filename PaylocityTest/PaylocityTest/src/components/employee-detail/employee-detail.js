import React,{ useContext,useEffect,useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from 'react-router-dom';
import {  Card, CardContent, Typography, CardHeader } from "@mui/material";
import Dependents from '../dependents/dependents';
import SalaryWithBenefits from "../salary-with-benefits/salary-with-benefits";


const EmployeeDetail = () => {
    const { employees,dispatch,dependents } = useContext(AppContext);
    const { id } = useParams();
    const [Employee, SetEmployee] = useState(null);
    useEffect(() => {
        const employee = employees.filter(employee => employee.id === parseInt(id))[0];
        if(employee){
            SetEmployee(employee);
            dispatch({
                type: 'SET_DEPENDENTS',
                payload: employee.dependents
            });
        }   
    }, [employees])


    return (
    <React.Fragment>
        {
            (Employee) ?
                    <Card sx={{ minWidth: '50%' }}>
                        <CardHeader title={Employee.name} subheader="Employee" />

                        <CardContent>
                            <Typography variant="h6" component="div">
                                Dependents
                            </Typography>
                            {(Employee.dependents && Employee.dependents.length > 0) ?
                                <Dependents dependents={dependents} employeeId={id} /> :
                                <p><strong>No dependents found...</strong></p>
                            }
                            <Typography variant="h6" component="div">
                                Benefits
                            </Typography>
                            <SalaryWithBenefits dependents={ dependents ? dependents : []} name={Employee.name} />
                            
                        </CardContent>

            </Card>
             :
            <p>Loading Employee </p>
        }
    </React.Fragment>
        );
}

export default EmployeeDetail;
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import Employee from './employee/employee';
import { List } from '@mui/material';
import React from 'react';
import LoadingModal from '../loading-modal/loading-modal';


const Employees = () => {
    const { employees,loading,dispatch } = useContext(AppContext);
    useEffect(() => {
        dispatch({
            type: 'TOGGLE_LOADING'
        });
        fetch('https://localhost:7234/api/employee?withDependents=true')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'SET_EMPLOYEES',
                    payload: data
                });
            })
            .catch(error => console.log(error));
    },[])

    return (
        <React.Fragment>
            {loading ? <LoadingModal /> :
                (employees && employees.length > 0) ?
                    <List sx={{minWidth: '50%'}}>
                        {employees.map((employee) => (
                            <Employee key={`employee-${employee.id}`} name={employee.name} type={employee.type} dependents={employee.dependents} id={employee.id} />
                        ))}
                    </List>
                    :
                    <p><strong>No employees found...</strong></p>
            }
        </React.Fragment>
    );
};


export default Employees;
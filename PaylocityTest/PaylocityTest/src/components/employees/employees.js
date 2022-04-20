import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import Employee from './employee/employee';
import { TableContainer, TableHead, TableCell,TableRow,TableBody, Paper } from '@mui/material';
import React from 'react';
import LoadingModal from '../loading-modal/loading-modal';


const Employees = () => {
    const { employees,loading,dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({
            type: 'FETCH_EMPLOYEES'
        });
    },[])

    return (
        <React.Fragment>
            {loading ? <LoadingModal /> :
                (employees && employees.length > 0) ?
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Depedents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee) => (
                                <Employee key={employee.id} name={employee.name} type={employee.type} dependents={employee.dependents} />
                            ))}
                        </TableBody>
                    </TableContainer> :
                    <p><strong>No employees found...</strong></p>
            }
        </React.Fragment>
    );
};


export default Employees;
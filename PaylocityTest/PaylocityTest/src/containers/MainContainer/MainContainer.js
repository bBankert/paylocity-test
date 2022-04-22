import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Employees from '../../components/employees/employees';
import EmployeeForm from '../../components/employee-form/employee-form';
import {  Grid, Toolbar, Typography,CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../../components/navigation-bar/navigation-bar';
import EmployeeDetail from '../../components/employee-detail/employee-detail';
import EditEmployee from '../../components/edit-employee/edit-employee';

const MainContainer = () => {

    return (
        <React.Fragment>
            <CssBaseline />
            <Toolbar>
                <Typography variant="h5" noWrap component="div" sx={{margin:'auto'}}>
                    Employee Deduction Calculator
                </Typography>
            </Toolbar>
            <NavigationBar />
            <Grid className="main-root" container direction="row" justifyContent="center" alignItems="center" sx={{
                minHeight: '100vh'
            }}>
                <Routes>
                    <Route path="/" element={<Employees />} />
                    <Route path="add-employee" element={<EmployeeForm />} />
                    <Route path="employee-detail/:id" element={<EmployeeDetail />} />
                    <Route path="edit-employee/:id" element={<EditEmployee />} />
                    <Route path="*" element={<Employees />} />
                </Routes>
            </Grid>
        </React.Fragment>
        )
};


export default MainContainer;
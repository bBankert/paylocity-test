import { Grid,  TextField,Button } from "@mui/material";
import React,{ useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import AddDependent from '../add-dependent/add-dependent';
import Dependents from '../dependents/dependents';


const EmployeeForm = () => {
    const { dispatch,dependents } = useContext(AppContext);
    const [Name, SetName] = useState('');


    const HandleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'TOGGLE_LOADING'
        });
        const person = {
            name: Name,
            dependents: dependents
        };
        fetch('https://localhost:7234/api/employee/addemployee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(person)
        })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'ADD_EMPLOYEE',
                payload: person
            });
            SetName('');
        })
    }

    const HandleNameChange = (event) => {
        SetName(event.target.value);
    }

    return (
        <form onSubmit={HandleSubmit}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 2}}>
                <Grid item>
                    <TextField label="Employee Name" value={Name} onChange={HandleNameChange} />
                </Grid>
                <Grid item>
                    <AddDependent />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
                <Grid item sx={{width:'100%'}}>
                {(dependents && dependents.length > 0) ?
                    <Dependents dependents={dependents} /> :
                    <p><strong>No dependents found...</strong></p>
                }
                </Grid>
            </Grid>

        </form>
        )
};

export default EmployeeForm;
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useContext,useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Grid, TextField, Button } from '@mui/material'
import AddDependent from '../add-dependent/add-dependent';
import Dependents from '../dependents/dependents';


const EditEmployee = () => {
    const { id } = useParams();
    const { dispatch, dependents,employees } = useContext(AppContext);
    const [Name, SetName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const employee = employees.filter(employee => employee.id === parseInt(id))[0];
        dispatch({
            type: 'SET_DEPENDENTS',
            payload: employee.dependents
        });
        SetName(employee.name);
    },[employees])

    const HandleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        const person = {
            name: Name,
            dependents: dependents
        };
        fetch(`https://localhost:7234/api/employee/${id}/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(person)
        })
            .then(response => response.json())
            .then(data => {
                navigate('/');
            })
    }

    const HandleNameChange = (event) => {
        SetName(event.target.value);
    }

    return (
        <form onSubmit={HandleSubmit}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 2 }}>
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
                <Grid item sx={{ width: '100%' }}>
                    {(dependents && dependents.length > 0) ?
                        <Dependents dependents={dependents} /> :
                        <p><strong>No dependents found...</strong></p>
                    }
                </Grid>
            </Grid>

        </form>
    )
};

export default EditEmployee;
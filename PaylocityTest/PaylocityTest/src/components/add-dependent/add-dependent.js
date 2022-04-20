import React,{ useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FormControl, TextField, MenuItem,Select, Stack,InputLabel, Button} from "@mui/material";


const AddDependent = () => {
    const [Name, SetName] = useState('');
    const [Type, SetType] = useState(0);

    const { dispatch } = useContext(AppContext);



    const HandleAddDependent = () => {
        dispatch({
            type: 'ADD_DEPENDENT',
            payload: {
                name: Name,
                type: parseInt(Type)
            }
        });
        SetName('');
        SetType(0);
    };

    const HandleNameChange = (event) => {
        SetName(event.target.value);
    }

    const HandleTypeChange = (event) => {
        SetType(event.target.value);
    }


    return (
        <React.Fragment>
            <Stack spacing={2}>
                <TextField label="Dependent Name" value={Name} onChange={HandleNameChange} xs={12}/>
                <FormControl>
                    <InputLabel id="dependent-type-helper-label">Dependent Type</InputLabel>
                    <Select label="Dependent Type" name="Type" value={Type} onChange={HandleTypeChange} labelId="dependent-type-helper-label">
                    <MenuItem key="1" value="1">Spouse</MenuItem>
                    <MenuItem key="2" value="2">Child</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="success" onClick={HandleAddDependent}>
                    Add Dependent
                </Button>
            </Stack>
        </React.Fragment>
        );
};

export default AddDependent;
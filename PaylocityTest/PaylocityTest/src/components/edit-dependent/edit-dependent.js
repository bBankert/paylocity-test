import { Dialog, DialogContent,Stack,TextField,FormControl,InputLabel,Select,MenuItem,Button } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { useContext,useState,useEffect,memo } from 'react';
import { useLocation } from "react-router-dom";



const EditDependent = (props) => {
    const { dispatch } = useContext(AppContext);
    const [Name, SetName] = useState('');
    const [Type, SetType] = useState(0);
    const location = useLocation();

    useEffect(() => {
        SetName(props.name);
        SetType(props.type);
    },[])

    const HandleClick = () => {
        const dependent = {
            employeeId: props.employeeId,
            name: Name,
            type: Type,
            id: props.id
        };
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        if (location.pathname.includes('employee-detail')) {
            fetch(`https://localhost:7234/api/employee/${props.employeeId}/dependent/${props.id}/update`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dependent)
            })
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: 'UPDATE_DEPENDENT',
                        payload: dependent
                    })
                    props.setEditing(false);
                });
        }
        else {
            dispatch({
                type: 'UPDATE_DEPENDENT',
                payload: dependent
            });
            props.setEditing(false);
        }
    }

    const HandleNameChange = (event) => {
        SetName(event.target.value);
    }

    const HandleTypeChange = (event) => {
        SetType(event.target.value);
    }

    return (
        <Dialog open={true} onClose={() => props.setEditing(false)}>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField label="Dependent Name" value={Name} onChange={HandleNameChange} xs={12} />
                    <FormControl>
                        <InputLabel id="dependent-type-helper-label">Dependent Type</InputLabel>
                        <Select label="Dependent Type" name="Type" value={Type} onChange={HandleTypeChange} labelId="dependent-type-helper-label">
                            <MenuItem key="1" value="1">Spouse</MenuItem>
                            <MenuItem key="2" value="2">Child</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="success" onClick={HandleClick}>
                        Update Dependent
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
        )
};

export default memo(EditDependent);
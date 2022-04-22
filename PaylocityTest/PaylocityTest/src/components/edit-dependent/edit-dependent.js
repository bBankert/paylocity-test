import { Dialog, DialogContent,Stack,TextField,FormControl,InputLabel,Select,MenuItem,Button } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { useContext,useState,useEffect,memo } from 'react';



const EditDependent = (props) => {
    const { dispatch } = useContext(AppContext);
    const [Name, SetName] = useState('');
    const [Type, SetType] = useState(0);

    useEffect(() => {
        SetName(props.name);
        SetType(props.type);
    },[])

    const HandleClick = () => {
        const dependent = {
            id: props.id,
            name: Name,
            type: Type
        };
        dispatch({
            type: 'UPDATE_DEPENDENT',
            payload: dependent
        });
        props.setEditing(false);
    }

    const HandleNameChange = (event) => {
        SetName(event.target.value);
    }

    const HandleTypeChange = (event) => {
        SetType(event.target.value);
    }

    return (
        <Dialog open={true}>
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
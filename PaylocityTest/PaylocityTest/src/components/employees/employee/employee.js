import { ListItem, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from "../../../context/AppContext";



const Employee = (props) => {
    const { dispatch } = useContext(AppContext);

    const HandleClick = () => {

        fetch(`https://localhost:7234/api/employee/${props.id}/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then(response => {
            dispatch({
                type: 'REMOVE_EMPLOYEE',
                payload: props.id
            })
        });
    };


    return (
        <ListItem sx={{ border: '1px solid',padding:0,borderRadius:'10px'}}>
            <Button variant="text" fullWidth component={Link} to={`employee-detail/${props.id}`} sx={{justifyContent:'space-between',padding:'1rem'}}>
                <span>{props.name}</span>
                <span>Dependents: {props.dependents ? props.dependents.length : 0}</span>
            </Button>
            <IconButton component={Link} to={`edit-employee/${props.id}`}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={HandleClick}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
        )
};

export default Employee;
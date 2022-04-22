import { ListItem, ListItemText, Chip, Divider, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React,{ useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";


const Dependent = (props) => {
    const { dispatch } = useContext(AppContext);
    const location = useLocation();

    const HandleClick = () => {
        //if in employee detail, the dependent already exists in the DB
        //therefore, we want to delete them from the db too
        dispatch({
            type: 'TOGGLE_LOADING'
        });
        if (location.pathname.includes('employee-detail')) {
            fetch(`https://localhost:7234/api/employee/${props.employeeId}/delete/${props.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
            .then(response => {
                dispatch({
                    type: 'REMOVE_DEPENDENT',
                    payload: props.id
                })
            });
        }
        else {
            dispatch({
                type: 'REMOVE_DEPENDENT',
                payload: props.id
            });
        }
    };


    return (
        <React.Fragment>
            <Divider />
            <ListItem>
                <ListItemText primary={props.name} />
                <Chip color="success" label={props.type === 1 ? 'Spouse' : 'Child'} />
                <IconButton onClick={HandleClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </React.Fragment>
        );
}


export default Dependent;
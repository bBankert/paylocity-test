import { ListItem, ListItemText, Chip, Divider, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React,{ useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useState } from 'react';
import EditDependent from "../../edit-dependent/edit-dependent";


const Dependent = (props) => {
    const { dispatch } = useContext(AppContext);
    const [Editing, SetEditing] = useState(false);
    const location = useLocation();

    const HandleClick = () => {
        //if in employee detail, the dependent already exists in the DB
        //therefore, we want to delete them from the db too
        dispatch({
            type: 'SET_LOADING',
            payload: true
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
                <IconButton onClick={() => SetEditing(true)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={HandleClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            {Editing ?
                <EditDependent name={props.name} type={props.type} id={props.id} employeeId={props.employeeId} setEditing={SetEditing} /> :
                ''
            }
        </React.Fragment>
        );
}


export default Dependent;
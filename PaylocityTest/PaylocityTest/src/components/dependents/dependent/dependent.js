import { ListItem, ListItemText,Chip,Divider } from "@mui/material";
import React,{ useState } from "react";


const Dependent = (props) => {

    return (
        <React.Fragment>
            <Divider />
            <ListItem>
                <ListItemText primary={props.name} />
                <Chip color="success" label={props.type === 1 ? 'Spouse' : 'Child'} />
            </ListItem>
        </React.Fragment>
        );
}


export default Dependent;
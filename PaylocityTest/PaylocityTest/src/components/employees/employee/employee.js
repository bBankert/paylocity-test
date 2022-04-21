import { ListItem,Button } from "@mui/material";
import { Link } from 'react-router-dom';


const Employee = (props) => {

    return (
        <ListItem>
            <Button variant="outlined" fullWidth component={Link} to={`employee-detail/${props.id}`} sx={{justifyContent:'space-between',padding:'1rem'}}>
                <span>{props.name}</span>
                <span>Dependents: {props.dependents ? props.dependents.length : 0}</span>
            </Button>
        </ListItem>
        )
};

export default Employee;
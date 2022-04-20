import { TableCell, TableRow } from "@mui/material";



const Employee = (props) => {

    const MapType = () => {
        console.log(props.type);
        switch (props.type) {
            case 0:
                return 'Employee';
            case 1:
                return 'Spouse';
            case 2:
                return 'Child';
        }
    }

    const CalculateDependentNumber = () => {
        console.log(props.dependents);
        return props.dependents ? props.dependents.length : 0;
    }


    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{MapType}</TableCell>
            <TableCell>{CalculateDependentNumber}</TableCell>
        </TableRow>
        )
};

export default Employee;
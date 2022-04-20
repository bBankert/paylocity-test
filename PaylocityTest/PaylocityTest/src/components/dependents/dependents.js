import { List } from '@mui/material';
import Dependent from './dependent/dependent';

const Dependents = (props) => {

    return (
        <List>
            {props.dependents.map((dependent,idx) => (
                <Dependent key={`dependent-${idx}`} name={dependent.name} type={dependent.type} />
            ))}
        </List>
        )
}

export default Dependents;
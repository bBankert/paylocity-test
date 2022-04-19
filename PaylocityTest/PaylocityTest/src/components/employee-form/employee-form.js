import { useState } from "react";
import AddDependent from '../add-dependent/add-dependent';
import Dependents from '../dependents/dependents';


const EmployeeForm = () => {
    const [Name, SetName] = useState('');
    const [Dependents, SetDependents] = useState([]);

    const HandleSubmit = (event) => {
        event.preventDefault();

    }

    const HandleDependentChange = (event) =>{
        event.preventDefault();
        console.log(event);
        //this.SetDependents([...Dependents,event.target])
    }

    return (
        <form onSubmit={HandleSubmit}>
            <label>
                Name:
                <input type="text" onChange={(event) => SetName(event.target.value)} />
            </label>
            <label>
                Dependents:
                <AddDependent AddDependent={HandleDependentChange}/>
                {/*<Dependents dependents={Dependents}/>*/}
            </label>

        </form>
        )
};

export default EmployeeForm;
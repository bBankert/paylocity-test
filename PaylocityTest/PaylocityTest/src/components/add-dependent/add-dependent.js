import { useState } from "react";


const AddDependent = ({AddDependent}) => {
    const [Name, SetName] = useState('');
    const [Type, SetType] = useState(0);


    const HandleAddDependent = (event) => {
        event.preventDefault();
        fetch()

    }




    return (
        <form onSubmit={(event) => AddDependent(event)}>
            <label>
                Name:
                <input type="text" onChange={(event) => SetName(event.target.value)} />
            </label>
            <label>
                Type:
                <select onChange={(event) => SetType(event.target.value)} >
                    <option value="0">Spouse</option>
                    <option value="1">Child</option>
                </select>
            </label>
            <button type="submit">Add Dependent</button>
        </form>
        );
};

export default AddDependent;
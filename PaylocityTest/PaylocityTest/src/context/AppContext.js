import { useReducer, createContext } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            action.loading = true;
            fetch('https://localhost:7234/api/employee/addemployee', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            .then(response => response.json())
                .then(data => {
                    return {
                        ...state,
                        employees: [state.employees, data],
                        dependents: [],
                        loading: false
                    };
                })
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter(
                    (employee) => employee.id !== action.payload
                ),
            };
        case 'ADD_DEPENDENT':
            return {
                ...state,
                dependents: [...state.dependents,action.payload]
            }
        case 'FETCH_EMPLOYEES':
            state.loading = true;
            fetch('https://localhost:7234/api/employee')
                .then(res => res.json())
                .then(data => {
                    return {
                        ...state,
                        employees: data,
                        loading: false
                    }
                })
                .catch(error => console.log(error));
        case 'TOGGLE_LOADING':
            return {
                ...state,
                loading: !state.loading
            };
        default:
            return state;
    }
};


const initialState = {
    employees: [],
    dependents: [],
    loading: false
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                employees: state.employees,
                dependents: state.dependents,
                loading: state.loading,
                dispatch,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}
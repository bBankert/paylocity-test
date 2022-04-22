import { useReducer, createContext } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: [...state.employees, action.payload],
                dependents: [],
                loading: false
            };
        case 'ADD_DEPENDENT':
            return {
                ...state,
                dependents: [...state.dependents,action.payload]
            }
        case 'SET_EMPLOYEES':
            return {
                ...state,
                employees: action.payload,
                loading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'REMOVE_DEPENDENT':
            return {
                ...state,
                dependents: state.dependents.filter((dependent) => dependent.id !== parseInt(action.payload)),
                loading: false
            };
        case 'REMOVE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter((employee) => employee.id !== parseInt(action.payload)),
                loading: false
            };
        case 'SET_DEPENDENTS':
            return {
                ...state,
                dependents: action.payload
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
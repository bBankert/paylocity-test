import { useReducer, createContext } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
                isAdding: false,
            };
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                expenses: state.employees.filter(
                    (employee) => employee.id !== action.payload
                ),
            };
        default:
            return state;
    }
};


const initialState = {
    employees: []
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                employees: state.employees
                dispatch,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}
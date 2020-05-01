import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//initial state
const initialState = {
  transactions: [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  const deleteTransaction = (id) => {
    dispatch({ type: 'delete_transaction', payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'add_transaction', payload: transaction });
  };

  return (
    <GlobalContext.Provider
      value={{ transactions: state.transactions, deleteTransaction, addTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

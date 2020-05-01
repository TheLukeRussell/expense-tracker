import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  const getTransaction = async () => {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({ type: 'get_transactions', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'transaction_error', payload: err.response.data.error });
    }
  };

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

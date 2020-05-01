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

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: 'delete_transaction', payload: id });
    } catch (err) {
      dispatch({ type: 'transaction_error', payload: err.response.data.error });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({ type: 'add_transaction', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'transaction_error', payload: err.response.data.error });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransaction,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

export default (state, action) => {
  switch (action.type) {
    case 'get_transaction':
      return { ...state, loading: false, transactions: action.payload };
    case 'delete_transaction':
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      };
    case 'add_transaction':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

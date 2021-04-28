export const dispatchFunc = (state, action) => {
  switch (action.type) {
    case "SORTBY":
      return { ...state, sortBy: action.payload };
    case "FILTER_SPEED_DEIVERY":
      return { ...state, fastDelivery: !state.fastDelivery };
    case "FILTER_IN_STOCK":
      return { ...state, inStock: !state.inStock };
    case "SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  basket: [],
  user: null,
};
export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => (amount += item.price), 0);
};
function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "GET_LOCAL_DATA":
      if (state.user) {
        let localData = localStorage.getItem(state.user);
        if (localData) localData = JSON.parse(localData);
        else localData = [];
        return {
          ...state,
          basket: localData,
        };
      }
      return { ...state };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      if (state.user) {
        localStorage.setItem(
          state.user,
          JSON.stringify([...state.basket, action.item])
        );
      }
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else
        console.warn(
          `The provided id, ${action.id} does not belong to any product in the basket`
        );
      if (state.user) {
        localStorage.setItem(state.user, JSON.stringify(newBasket));
      }
      return { ...state, basket: newBasket };
    default:
      return { ...state };
  }
}
export default reducer;

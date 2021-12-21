export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((basketItem) => {
        return action.id === basketItem.id;
      });

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(`Not found : ${action.id}`);
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return{
        ...state,
        basket:[],
      }

    default:
      return state;
  }
};

export default reducer;

import {
  GET_DRINKS,
  ADD_DRINK,
  DELETE_DRINK,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_DRINKS,
  UPDATE_DRINK,
  FILTER_DRINKS,
  CLEAR_FILTER,
  DRINK_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DRINKS:
      return {
        ...state,
        drinks: action.payload,
        loading: false
      };
    case ADD_DRINK:
      return {
        ...state,
        drinks: [action.payload, ...state.drinks],
        loading: false
      };
    case UPDATE_DRINK:
      return {
        ...state,
        drinks: state.drinks.map(drink =>
          drink._id === action.payload._id ? action.payload : drink
        ),
        loading: false
      };
    case DELETE_DRINK:
      return {
        ...state,
        drinks: state.drinks.filter(drink => drink._id !== action.payload),
        loading: false
      };
    case CLEAR_DRINKS:
      return {
        ...state,
        drinks: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_DRINKS:
      return {
        ...state,
        filtered: state.drinks.filter(drink => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return drink.name.match(regex) || drink.type.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case DRINK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

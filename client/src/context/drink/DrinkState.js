import React, { useReducer } from 'react';
import axios from 'axios';
import DrinkContext from '../drink/drinkContext';
import drinkReducer from '../drink/drinkReducer';
import {
  GET_DRINKS,
  ADD_DRINK,
  DELETE_DRINK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DRINK,
  FILTER_DRINKS,
  CLEAR_DRINKS,
  CLEAR_FILTER,
  DRINK_ERROR
} from '../types';

const DrinkState = props => {
  const initialState = {
    drinks: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(drinkReducer, initialState);

  // Get Drinks
  const getDrinks = async () => {
    try {
      const res = await axios.get('/api/drinks');

      dispatch({ type: GET_DRINKS, payload: res.data });
    } catch (err) {
      dispatch({ type: DRINK_ERROR, payload: err.response.msg });
    }
  };

  // Add Drink
  const addDrink = async drink => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/drinks', drink, config);

      dispatch({ type: ADD_DRINK, payload: res.data });
    } catch (err) {
      dispatch({ type: DRINK_ERROR, payload: err.response.msg });
    }
  };

  // Delete Drink
  const deleteDrink = async id => {
    try {
      await axios.delete(`/api/drinks/${id}`);

      dispatch({ type: DELETE_DRINK, payload: id });
    } catch (err) {
      dispatch({ type: DRINK_ERROR, payload: err.response.msg });
    }
  };

  // Update Drink
  const updateDrink = async drink => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/drinks/${drink._id}`, drink, config);

      dispatch({ type: UPDATE_DRINK, payload: res.data });
    } catch (err) {
      dispatch({ type: DRINK_ERROR, payload: err.response.msg });
    }
  };

  // Clear Drinks
  const clearDrinks = () => {
    dispatch({ type: CLEAR_DRINKS });
  };

  // Set current Drink
  const setCurrent = drink => {
    dispatch({ type: SET_CURRENT, payload: drink });
  };

  // Clear current Drink
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Drink
  const filterDrinks = drink => {
    dispatch({ type: FILTER_DRINKS, payload: drink });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <DrinkContext.Provider
      value={{
        drinks: state.drinks,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addDrink,
        deleteDrink,
        setCurrent,
        clearCurrent,
        updateDrink,
        filterDrinks,
        clearFilter,
        getDrinks,
        clearDrinks
      }}
    >
      {props.children}
    </DrinkContext.Provider>
  );
};

export default DrinkState;

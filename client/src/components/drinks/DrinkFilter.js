import React, { useContext, useRef, useEffect } from 'react';
import DrinkContext from '../../context/drink/drinkContext';

const DrinkFilter = () => {
  const drinkContext = useContext(DrinkContext);
  const text = useRef('');

  const { filterDrinks, clearFilter, filtered } = drinkContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterDrinks(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Drinks...'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default DrinkFilter;

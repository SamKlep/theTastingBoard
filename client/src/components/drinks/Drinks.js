import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DrinkItem from '../drinks/DrinkItem';
import Spinner from '../layout/Spinner';
import DrinkContext from '../../context/drink/drinkContext';

const Drinks = () => {
  const drinkContext = useContext(DrinkContext);

  const { drinks, filtered, getDrinks, loading } = drinkContext;

  useEffect(() => {
    getDrinks();
    // eslint-disable-next-line
  }, []);

  if (drinks !== null && drinks.length === 0 && !loading) {
    return <h4>Please add a Drink</h4>;
  }

  return (
    <Fragment>
      {drinks !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(drink => (
                <CSSTransition key={drink._id} timeout={500} classNames='item'>
                  <DrinkItem drink={drink} />
                </CSSTransition>
              ))
            : drinks.map(drink => (
                <CSSTransition key={drink._id} timeout={500} classNames='item'>
                  <DrinkItem drink={drink} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Drinks;

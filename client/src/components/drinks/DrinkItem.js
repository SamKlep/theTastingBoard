import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DrinkContext from '../../context/drink/drinkContext';

const DrinkItem = ({ drink }) => {
  const drinkContext = useContext(DrinkContext);
  const { deleteDrink, setCurrent, clearCurrent } = drinkContext;

  const { _id, name, type, date, description, rating } = drink;

  const onDelete = () => {
    deleteDrink(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {type && (
          <li>
            <i className='fas fa-envelope-open'></i> {type}
          </li>
        )}
        {date && (
          <li>
            <i className='fas fa-phone'></i> {date}
          </li>
        )}
        <li>{description} </li>
        <li>{rating} </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(drink)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

DrinkItem.propTypes = {
  drink: PropTypes.object.isRequired
};

export default DrinkItem;

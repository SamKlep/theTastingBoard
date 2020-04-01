import React, { useState, useContext, useEffect } from 'react';
import DrinkContext from '../../context/drink/drinkContext';

const DrinkForm = () => {
  const drinkContext = useContext(DrinkContext);

  const { addDrink, updateDrink, clearCurrent, current } = drinkContext;

  useEffect(() => {
    if (current != null) {
      setDrink(current);
    } else {
      setDrink({
        name: '',
        type: '',
        date: '',
        description: '',
        rating: ''
      });
    }
  }, [drinkContext, current]);

  const [drink, setDrink] = useState({
    name: '',
    type: '',
    date: '',
    description: '',
    rating: ''
  });

  const { name, type, date, description, rating } = drink;

  const onChange = e => setDrink({ ...drink, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addDrink(drink);
    } else {
      updateDrink(drink);
    }
    setDrink({
      name: '',
      type: '',
      date: '',
      description: '',
      rating: ''
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Drink' : 'Add Drink'}</h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='type'
        name='type'
        value={type}
        onChange={onChange}
      />
      <input
        type='date'
        placeholder='date'
        name='date'
        value={date}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='rating'
        name='rating'
        value={rating}
        onChange={onChange}
      />
      {/* <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional */}
      <div>
        <input
          type='submit'
          value={current ? 'Update Drink' : 'Add Drink'}
          className='btn btn-dark btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default DrinkForm;

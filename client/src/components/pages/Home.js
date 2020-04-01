import React, { useContext, useEffect } from 'react';
import Drinks from '../drinks/Drinks';
import DrinkForm from '../drinks/DrinkForm';
import DrinkFilter from '../drinks/DrinkFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <DrinkForm />
      </div>
      <div>
        <DrinkFilter />
        <Drinks />
      </div>
    </div>
  );
};

export default Home;

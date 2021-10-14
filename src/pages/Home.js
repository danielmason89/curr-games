import React, {useEffect} from 'react';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {loadGames} from '../actions/gamesAction';

const Home = () => {
    // Fetch Games
    const dispatch = useDispatch();
  const popular = useSelector((state) => state);
  console.log({popular})
  useEffect(() => {
    dispatch(loadGames());
  }, []);
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home

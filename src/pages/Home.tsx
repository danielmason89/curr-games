import React, { useEffect } from 'react';
import GameDetail from '../components/GameDetail';
// Redux
import { loadGames } from '../actions/gamesAction';
// Styling and Animation
import styled from 'styled-components';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { fadeIn } from '../animations';
// Components
import Game from '../components/Game';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import type { Game as GameType } from '../types/game';

const Home = () => {
  // Get the current location of the game
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];

  // Fetch Games
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  // Get that data back
  const { popular, newGames, upcoming, searched } = useAppSelector(
    state => state.games
  );

  return (
    <GameList
      variants={fadeIn}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() => null}>
          {pathId ? <GameDetail pathId={pathId} /> : null}
        </AnimatePresence>

        {searched.length > 0 && (
          <div className='searched'>
            <h2>Games Searched</h2>
            <Games>
              {searched.map((game: GameType) => (
                <Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </Games>
          </div>
        )}
        <h2>Upcoming Games</h2>
        <Games>
          {upcoming.map((game: GameType) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game: GameType) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game: GameType) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 2rem;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    h2 {
      font-size: 1.25rem;
      text-align: center;
      padding: 1rem 2rem;
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 90vh;
  display: grid;
  justify-content: flex-start;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media (max-width: 768px) {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 4fr));
    gap: 2rem;
    text-align: center;
  }
`;

export default Home;

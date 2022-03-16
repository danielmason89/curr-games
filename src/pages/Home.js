import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";
// Components
import Game from "../components/Game";
import { useLocation } from "react-router-dom";

const Home = () => {
  // Get the current location of the game
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  // Fetch Games
  const dispatch = useDispatch();
  // const popular = useSelector((state) => state);
  // console.log({popular})
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  // Get that data back
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && <GameDetail pathId={pathId} />}
        </AnimatePresence>
        {searched.length ? (
          <div className="searched">
            <h2>Searched Games</h2>
            <Games>
              {searched.map((game) => (
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
        ) : (
          ""
        )}
        <h2>Upcoming Games</h2>
        <Games>
          {upcoming.map((game) => (
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
          {popular.map((game) => (
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
          {newGames.map((game) => (
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

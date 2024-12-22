import React from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Redux
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { smallImage } from '../util';
// Icons
import PlatformIcons from './PlatformIcons';
import StarRating from './StarRating';

const GameDetail = ({ pathId }) => {
  const navigate = useNavigate();
  // Exit Detail
  const exitDetailhandler = e => {
    const element = e.target;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      navigate('/');
    }
  };

  // Data
  const { screen, game, isLoading } = useSelector(state => state.detail);
  return (
    <>
      {!isLoading && (
        <CardShadow className='shadow' onClick={exitDetailhandler}>
          <Detail LayoutId={pathId}>
            <Stats>
              <header>
                <motion.h3 LayoutId={`title ${pathId}`}>{game.name}</motion.h3>
              </header>
              <Info>
                <StarRating rating={game.rating} />
                <PlatformIcons platforms={game.platforms} />
              </Info>
            </Stats>
            <Media>
              <motion.img
                LayoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.background_image}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className='gallery'>
              {screen.results &&
                screen.results.map(screen => (
                  <img
                    src={smallImage(screen.image, 1280)}
                    key={screen.id}
                    alt={screen.image}
                  />
                ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
  &::-webkit-scrollbar {
    width: 0.04rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c25353;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  border-radius: 1rem;
  padding: 1rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  z-index: 12;
  color: black;
  h3 {
    text-decoration-line: underline;
  }
  img {
    width: 100%;
    padding: 0.5rem 0;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    h3 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1rem;
      text-decoration-line: underline;
      text-align: center;
    }
    p {
      font-size: 0.75rem;
    }
    img {
      height: 25%;
    }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  h3 {
    text-decoration-line: underline;
  }
  img {
    display: inline;
    width: 2rem;
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  @media (max-width: 768px) {
    display: block;
    align-items: center;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
`;

const Description = styled(motion.div)`
  margin: 2rem 0rem;
  @media (max-width: 768px) {
    margin: 6rem 0rem;
  }
`;

export default GameDetail;

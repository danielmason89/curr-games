import React from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Redux
import { Link } from 'react-router-dom';
import { smallImage } from '../util/image';
import { useAppDispatch } from '../hooks/redux';
import { loadDetail } from '../actions/detailAction';
import { popUp } from '../animations';

interface GameProps {
  name: string;
  released: string;
  image: string;
  id: number;
}

const Game = ({ name, released, image, id }: GameProps) => {
  const stringPathId = id.toString();
  // Load Detail Handler
  const dispatch = useAppDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = 'hidden';
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame
      variants={popUp}
      initial='hidden'
      animate='show'
      exit='exit'
      layoutId={stringPathId}
      onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 1rem;
  h3 {
    font-size: 0.9rem;
  }
  p {
    font-size: 1rem;
  }

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  &:hover {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
    border: 0.05rem solid #000000;
  }
  @media (max-width: 768px) {
    img {
      height: 25vh;
    }
    h3 {
      font-size: 0.65rem;
      text-align: center;
    }
    p {
      font-size: 0.55rem;
      text-align: center;
    }
  }
`;

export default Game;

import React, {useState} from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { smallImage } from '../utils/image';
import { popUp } from '../animations';

import type { Game as GameType } from '@/shared/types';
import GameModal from './GameModal';

interface GameProps {
  name: GameType["name"];
  released: GameType["released"];
  image: GameType["background_image"];
  id: GameType["id"];

}

const Game = ({ name, released, image: image, id}: GameProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const stringPathId = id?.toString();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
   <>
    <StyledGame
      variants={popUp}
      initial='hidden'
      animate='show'
      exit='exit'
      layoutId={stringPathId}
      >
      <button onClick={handleOpenModal}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(image ?? "", 640)}
          alt={name}
        />
      </button>
    </StyledGame>
     {isModalOpen ? <GameModal gameId={id} onModalClose={
            handleCloseModal
          } /> : null}
   </>
  );
};

const StyledGame = styled(motion.li)`
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
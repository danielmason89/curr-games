import React, { useState } from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { smallImage } from '../utils/image';
import { popUp } from '../utils/animations';

import type { Game as GameType } from '@/shared/types';
import GameModal from './GameModal';

interface GameProps {
  name: GameType['name'];
  released: GameType['released'];
  image: GameType['background_image'];
  id: GameType['id'];
}

const Game = ({ name, released, image: image, id }: GameProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const stringPathId =
    id?.toString() || `game-${Math.random().toString(36).substr(2, 9)}`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <StyledGame
        variants={popUp}
        initial='hidden'
        animate='show'
        exit='exit'
        layoutId={stringPathId}>
        <button onClick={handleOpenModal}>
          <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
          <p>{released}</p>
          <ImageContainer>
            {!imageLoaded && <ImageSkeleton />}
            <motion.img
              layoutId={`image ${stringPathId}`}
              src={smallImage(image ?? '', 640)}
              alt={name}
              onLoad={handleImageLoad}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </ImageContainer>
        </button>
      </StyledGame>
      <AnimatePresence>
        {isModalOpen && (
          <GameModal
            gameId={id}
            stringPathId={stringPathId}
            onModalClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;

  @media (max-width: 768px) {
    height: 25vh;
  }
`;

const ImageSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const StyledGame = styled(motion.li)`
  height: auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 0.05rem solid transparent;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  h3 {
    font-size: 0.9rem;
  }
  p {
    font-size: 1rem;
  }

  button {
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    padding: 0;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
    border: 0.05rem solid #000000;
  }

  @media (max-width: 768px) {
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

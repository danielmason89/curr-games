import React, { useState } from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

import { smallImage } from '../utils/image';
import { popUp } from '../utils/animations';

import type { Game as GameType } from '@/shared/types';
import GameModal from './GameModal';

interface GameProps {
  name: GameType['name'];
  released: GameType['released'];
  image: GameType['background_image'];
  id: GameType['id'];
  rating?: GameType['rating'];
}

const Game = ({ name, released, image: image, id, rating }: GameProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const stringPathId: string =
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

  const formattedDate = released
    ? new Date(released).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'TBA';

  return (
    <>
      <StyledGame
        variants={popUp}
        initial='hidden'
        animate='show'
        exit='exit'
        layoutId={stringPathId}>
        <CardButton onClick={handleOpenModal}>
          <ImageContainer>
            {!imageLoaded && <ImageSkeleton />}
            <GameImage
              layoutId={`image ${stringPathId}`}
              src={smallImage(image ?? '', 640)}
              alt={name}
              onLoad={handleImageLoad}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
            <Overlay />
          </ImageContainer>
          <CardContent>
            <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
            <MetaInfoContainer>
              <ReleaseDateTag>{formattedDate}</ReleaseDateTag>
              {rating && rating > 0 ? (
                <RatingTag>
                  <StarIcon />
                  <span>{rating.toFixed(1)}</span>
                </RatingTag>
              ) : null}
            </MetaInfoContainer>
          </CardContent>
        </CardButton>
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

const StyledGame = styled(motion.li)`
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.15s ease;
  position: relative;

  &:hover {
    box-shadow: var(--shadow-md);

    img {
      transform: scale(1.05);
    }
  }
`;

const CardButton = styled.button`
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const GameImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--text-dark);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;

    h3 {
      font-size: 0.9rem;
    }
  }
`;

const MetaInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const ReleaseDateTag = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary);
  background-color: rgba(194, 83, 83, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

const RatingTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  background-color: rgba(255, 215, 0, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);

  span {
    line-height: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

const StarIcon = styled(FaStar)`
  color: #ffd700;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
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

export default Game;

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { smallImage } from '../utils/image';
import PlatformIcons from './PlatformIcons';
import StarRating from './StarRating';
import type { GameDetails } from '@/shared/types';
import { useGetGameByIdQuery } from '../hooks/useGamesApi';
import { stripHtmlTags } from '../utils/stripHtmlTags';
import { Link } from 'react-router';

interface GameModalProps {
  gameId: GameDetails['id'];
  stringPathId?: string;
  onModalClose: () => void;
}

const GameModal = ({
  gameId,
  stringPathId = '',
  onModalClose,
}: GameModalProps) => {
  const { data: game, isLoading } = useGetGameByIdQuery(gameId);
  const [imageLoaded, setImageLoaded] = useState(false);

  const exitDetailhandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      onModalClose();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <CardShadow
      className='shadow'
      onClick={exitDetailhandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <Detail
        layoutId={stringPathId}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}>
        {isLoading || !game ? (
          <LoadingContainer>
            <LoadingSpinner />
            <p>Loading game details...</p>
          </LoadingContainer>
        ) : (
          <>
            <Stats>
              <GameHeader>
                <motion.h3 layoutId={`title ${stringPathId}`}>
                  {game.name}
                </motion.h3>
                <GameLink to={`/games/${gameId}`}>View More</GameLink>
              </GameHeader>
              <Info>
                <RatingSection>
                  <StarRating rating={game.rating || 0} />
                </RatingSection>
                {game.platforms && game.platforms.length > 0 && (
                  <PlatformSection>
                    <PlatformIcons platforms={game.platforms} />
                  </PlatformSection>
                )}
              </Info>
            </Stats>
            <Media>
              <ImageContainer>
                {!imageLoaded && <ImageSkeleton />}
                <motion.img
                  layoutId={`image ${stringPathId}`}
                  src={smallImage(game.background_image ?? '', 1280)}
                  alt='Game Screen Screenshot'
                  onLoad={handleImageLoad}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              </ImageContainer>
            </Media>
            <Description>
              <p>{stripHtmlTags(game.description ?? '')}</p>
            </Description>
          </>
        )}
      </Detail>
    </CardShadow>
  );
};

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const GameLink = styled(Link)`
  text-decoration: none;
  background-color: #ff7676;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: medium;
  transition: background-color 0.3s ease;
  color: white;
  text-align: center;

  &:hover {
    background-color: #ff5656;
  }
`;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Detail = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  border-radius: 1rem;
  background: white;
  color: black;
  z-index: 10;
  padding: 1rem;
  margin: 0;
  position: relative;
  height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;

  /* Hide default scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 4px;
    border-radius: 4px;
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ff7676 transparent;

  @media (min-width: 768px) {
    padding: 2rem;
    width: 90%;
  }

  @media (min-width: 1024px) {
    padding: 2rem 5rem;
  }

  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding-bottom: 1rem;
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const Info = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RatingSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 0.5rem;
`;

const PlatformSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 0.5rem;
`;

const Media = styled(motion.div)`
  margin-top: 2rem;
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
`;

const Description = styled(motion.div)`
  margin: 3rem 0;
  p {
    line-height: 1.6;
    font-size: 1.1rem;
    color: #333;
  }

  @media (max-width: 768px) {
    margin: 2rem 0;
    p {
      font-size: 1rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  p {
    font-size: 1.2rem;
    color: #333;
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #ff7676;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const ImageSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
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

export default GameModal;

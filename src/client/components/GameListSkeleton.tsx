import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GameList, Games } from './GamesList';

const GameSkeleton = () => {
  return (
    <StyledGameSkeleton>
      <div className='title-skeleton'></div>
      <div className='date-skeleton'></div>
      <div className='image-skeleton'></div>
    </StyledGameSkeleton>
  );
};

interface GameListSkeletonProps {
  title?: string;
}

export const GameListSkeleton = ({ title }: GameListSkeletonProps) => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => (
    <GameSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <GameList>
      {title && <h2>{title}</h2>}
      <Games>{skeletonItems}</Games>
    </GameList>
  );
};

const StyledGameSkeleton = styled(motion.li)`
  height: auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
  padding: 1rem;

  .title-skeleton {
    height: 1rem;
    width: 80%;
    margin: 0.5rem auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.25rem;
  }

  .date-skeleton {
    height: 0.8rem;
    width: 40%;
    margin: 0.5rem auto 1rem;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.25rem;
  }

  .image-skeleton {
    width: 100%;
    height: 40vh;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @media (max-width: 768px) {
    .image-skeleton {
      height: 25vh;
    }
    .title-skeleton {
      height: 0.65rem;
    }
    .date-skeleton {
      height: 0.55rem;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

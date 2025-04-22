import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  GameListContainer,
  GamesGrid,
  SectionTitle,
  TitleContainer,
} from './GamesList';

const GameSkeleton = () => {
  return (
    <StyledGameSkeleton>
      <ImageSkeletonContainer>
        <div className='image-skeleton'></div>
        <OverlaySkeleton />
      </ImageSkeletonContainer>
      <ContentSkeleton>
        <div className='title-skeleton'></div>
        <div className='title-skeleton second-line'></div>
        <div className='date-skeleton'></div>
      </ContentSkeleton>
    </StyledGameSkeleton>
  );
};

interface GameListSkeletonProps {
  title?: string;
}

export const GameListSkeleton = ({ title }: GameListSkeletonProps) => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => (
    <GameSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <GameListContainer>
      <TitleContainer>
        {title && <SectionTitle>{title}</SectionTitle>}
      </TitleContainer>
      <GamesGrid>{skeletonItems}</GamesGrid>
    </GameListContainer>
  );
};

const StyledGameSkeleton = styled(motion.li)`
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow-sm);
  position: relative;
`;

const ImageSkeletonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;

  .image-skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const OverlaySkeleton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.05) 0%, transparent 100%);
  z-index: 1;
`;

const ContentSkeleton = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title-skeleton {
    height: 1rem;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
  }

  .second-line {
    width: 70%;
    margin-top: 0.25rem;
  }

  .date-skeleton {
    height: 0.8rem;
    width: 40%;
    margin-top: 0.5rem;
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    align-self: flex-start;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;

    .title-skeleton {
      height: 0.9rem;
    }

    .date-skeleton {
      height: 0.7rem;
      margin-top: 0.25rem;
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

export default GameListSkeleton;

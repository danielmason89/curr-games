import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { smallImage } from '../utils/image';
import PlatformIcons from './PlatformIcons';
import StarRating from './StarRating';
import type { GameDetails } from '@/shared/types';
import { useGetGameByIdQuery } from '../hooks/useGamesApi';
import { stripHtmlTags } from '../utils/stripHtmlTags';
import { Link } from 'react-router';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface GameModalProps {
  gameId: GameDetails['id'];
  stringPathId?: string; // Add back for backward compatibility
  onModalClose: () => void;
}

// Add interface for genre data
interface Genre {
  id: number;
  name: string;
  slug?: string;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const GameModal = ({ gameId, onModalClose }: GameModalProps) => {
  const { data: game, isLoading } = useGetGameByIdQuery(gameId);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const exitDetailHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains('shadow')) {
      onModalClose();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Type guard for genres property
  const hasGenres = (
    game: GameDetails
  ): game is GameDetails & { genres: Genre[] } => {
    return (
      !!game &&
      typeof game === 'object' &&
      'genres' in game &&
      Array.isArray((game as { genres?: unknown }).genres) &&
      (game as { genres: unknown[] }).genres.length > 0
    );
  };

  return (
    <CardShadow
      className='shadow'
      onClick={exitDetailHandler}
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'>
      <DetailCard
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'>
        <CloseButton onClick={onModalClose}>
          <FaTimes />
        </CloseButton>

        {isLoading || !game ? (
          <ModalSkeleton />
        ) : (
          <>
            <ModalHeader>
              <TitleSection>
                <TitleLink to={`/games/${gameId}`}>
                  <h2>{game.name}</h2>
                  <TitleLinkIcon>
                    <FaExternalLinkAlt />
                  </TitleLinkIcon>
                </TitleLink>
                <ReleaseDate>
                  <CardTitle>Release Date: </CardTitle>
                  {game.released
                    ? new Date(game.released).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'TBA'}
                </ReleaseDate>
              </TitleSection>
            </ModalHeader>

            <DetailsButtonWrapper>
              <DetailsButton to={`/games/${gameId}`}>
                View Full Details
              </DetailsButton>
            </DetailsButtonWrapper>

            <MediaSection>
              <GameImageContainer>
                {!imageLoaded && <ImageSkeleton />}
                <GameImage
                  src={smallImage(game.background_image ?? '', 1280)}
                  alt={game.name}
                  onLoad={handleImageLoad}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              </GameImageContainer>
            </MediaSection>

            <InfoGrid>
              {game.rating && (
                <InfoCard>
                  <CardTitle>Rating</CardTitle>
                  <RatingWrapper>
                    <StarRating rating={game.rating || 0} />
                    <RatingNumber>{game.rating.toFixed(1)}</RatingNumber>
                  </RatingWrapper>
                </InfoCard>
              )}

              {game.platforms && game.platforms.length > 0 && (
                <InfoCard>
                  <CardTitle>Platforms</CardTitle>
                  <PlatformWrapper>
                    <PlatformIcons platforms={game.platforms} />
                  </PlatformWrapper>
                </InfoCard>
              )}

              {hasGenres(game) && (
                <InfoCard>
                  <CardTitle>Genres</CardTitle>
                  <GenreList>
                    {game.genres.map(genre => (
                      <GenreTag key={genre.id}>{genre.name}</GenreTag>
                    ))}
                  </GenreList>
                </InfoCard>
              )}
            </InfoGrid>

            <DescriptionSection>
              <CardTitle>About</CardTitle>
              <Description>{stripHtmlTags(game.description ?? '')}</Description>
            </DescriptionSection>
          </>
        )}
      </DetailCard>
    </CardShadow>
  );
};

const TitleLink = styled(Link)`
  text-decoration: none;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    h2 {
      color: var(--primary);
    }
  }
`;

const TitleLinkIcon = styled.span`
  font-size: 0.9rem;
  color: var(--primary);
  opacity: 0.8;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CardShadow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow-y: hidden;
  backdrop-filter: blur(4px);
`;

const DetailCard = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--primary-light) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-light);
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.25rem;
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: var(--text-dark);
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(194, 83, 83, 0.2);
    color: var(--primary);
  }

  @media (max-width: 768px) {
    top: 0.75rem;
    right: 0.75rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 2.5rem; /* Make space for close button */
`;

const TitleSection = styled.div`
  width: 100%;

  h2 {
    font-size: 2rem;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
    display: inline;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const ReleaseDate = styled.div`
  font-size: 0.95rem;
  color: var(--text-medium);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailsButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const DetailsButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-2px);
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
`;

const MediaSection = styled.div`
  width: 100%;
`;

const GameImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoCard = styled.div`
  background: var(--bg-off);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const RatingNumber = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin-top: 0.25rem;
`;

const PlatformWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GenreTag = styled.span`
  background-color: rgba(194, 83, 83, 0.1);
  color: var(--primary);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
`;

const DescriptionSection = styled.div`
  padding-top: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-medium);
  margin-top: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
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

const ModalSkeleton = () => {
  return (
    <>
      <ModalHeaderSkeleton>
        <TitleSkeleton className='title-skeleton' />
        <ReleaseDateSkeleton className='date-skeleton' />
      </ModalHeaderSkeleton>

      <DetailsButtonSkeletonWrapper>
        <div className='button-skeleton'></div>
      </DetailsButtonSkeletonWrapper>

      <MediaSectionSkeleton>
        <div className='image-skeleton'></div>
      </MediaSectionSkeleton>

      <InfoGridSkeleton>
        <InfoCardSkeleton>
          <CardTitleSkeleton className='card-title-skeleton' />
          <div className='card-content-skeleton'></div>
        </InfoCardSkeleton>
        <InfoCardSkeleton>
          <CardTitleSkeleton className='card-title-skeleton' />
          <div className='card-content-skeleton'></div>
        </InfoCardSkeleton>
        <InfoCardSkeleton>
          <CardTitleSkeleton className='card-title-skeleton' />
          <div className='card-content-skeleton'></div>
        </InfoCardSkeleton>
      </InfoGridSkeleton>

      <DescriptionSectionSkeleton>
        <CardTitleSkeleton className='card-title-skeleton' />
        <div className='description-line'></div>
        <div className='description-line'></div>
        <div className='description-line'></div>
        <div className='description-line'></div>
        <div className='description-line' style={{ width: '75%' }}></div>
      </DescriptionSectionSkeleton>

      <ButtonSkeleton>
        <div className='button-skeleton'></div>
      </ButtonSkeleton>
    </>
  );
};

const ModalHeaderSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 2.5rem;

  .title-skeleton {
    height: 2.25rem;
    width: 70%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .date-skeleton {
    height: 1rem;
    width: 30%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

const TitleSkeleton = styled.div``;

const ReleaseDateSkeleton = styled.div``;

const MediaSectionSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);

  .image-skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

const InfoGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoCardSkeleton = styled.div`
  background: var(--bg-off);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .card-title-skeleton {
    height: 1.25rem;
    width: 50%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .card-content-skeleton {
    height: 3rem;
    width: 100%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

const CardTitleSkeleton = styled.div``;

const DescriptionSectionSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .card-title-skeleton {
    height: 1.25rem;
    width: 15%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .description-line {
    height: 1rem;
    width: 100%;
    border-radius: var(--radius-sm);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 0.5rem;
  }
`;

const ButtonSkeleton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  .button-skeleton {
    height: 2.6rem;
    width: 200px;
    border-radius: var(--radius-md);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @media (max-width: 600px) {
    .button-skeleton {
      width: 100%;
    }
  }
`;

const DetailsButtonSkeletonWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;

  .button-skeleton {
    height: 2.2rem;
    width: 170px;
    border-radius: var(--radius-md);
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export default GameModal;

import React from 'react';
// Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Redux
import { useNavigate } from 'react-router';
import { smallImage } from '../utils/image';
// Icons
import PlatformIcons from './PlatformIcons';
import StarRating from './StarRating';
import type {GameDetails} from '@/shared/types';
import { useGetGameByIdQuery } from '../hooks/useGamesApi';
import { stripHtmlTags } from '../utils/stripHtmlTags';

interface GameModalProps {
  gameId: GameDetails['id'];
  onModalClose: () => void;
}

const GameModal = ({ gameId,  onModalClose }: GameModalProps) => {
  const {data: game, isLoading} = useGetGameByIdQuery(gameId);
  const navigate = useNavigate();

  // Exit Detail
  const exitDetailhandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      onModalClose();
      navigate('/');
    }
  };

  if (isLoading || !game) {
    return null;
  }

  const gameIdString = game.id!.toString();
  const parsedDescription = stripHtmlTags(game.description ?? "");


  return (
    <>
      {!isLoading && game && (
        <CardShadow className='shadow' onClick={exitDetailhandler}>
          <Detail layoutId={gameIdString}>
            <Stats>
              <motion.h3 layoutId={`title ${gameIdString}`}>{game.name}</motion.h3>
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
              <motion.img
                layoutId={`image ${gameIdString}`}
                src={smallImage(game.background_image ?? "", 1280)}
                alt="Game Screen Screenshot"
              />
            </Media>
            <Description>
              <p>{parsedDescription}</p>
            </Description>
            {/* <Gallery>
              {screen.results.map((screen: Screenshot) => (
                <img
                  key={screen.id}
                  src={smallImage(screen.image, 1280)}
                  alt={screen.image}
                />
              ))}
            </Gallery> */}
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
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    width: 90%;
    left: 5%;
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
    text-align: center;
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

// const Gallery = styled(motion.div)`
//   display: grid;
//   grid-gap: 1rem;
//   img {
//     width: 100%;
//     border-radius: 0.5rem;
//   }
// `;

export default GameModal;
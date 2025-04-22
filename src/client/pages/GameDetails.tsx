import React from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { useGetGameByIdQuery } from '@/client/hooks/useGamesApi';
import { GameDetailsCard } from '@/client/components/GameDetailsCard';
import { gameIdSchema } from '@/shared/schemas';

// Utilities & Components
// import { smallImage } from '@/client/util/image';
// import PlatformIcons from './PlatformIcons';
// import StarRating from '../components/StarRating';

// Styling and Animation
// import styled from 'styled-components';
// import { motion } from 'framer-motion';

export default function GameDetails() {
  // Get the id from the URL params (e.g. /games/123)
  const { id } = useParams();

  // We need to validate the id parameter to ensure it's a valid game ID
  // before passing it to RTK Query and then to the server.
  // This gets revalidated on the server side as well.
  const idValidation = gameIdSchema.safeParse(id);
  if (!idValidation.success) {
    return <Navigate to='/404' />;
  }

  // RTK Query automatically handles:
  // - Cache invalidation
  // - Refetching when needed
  // - Deduplication of requests
  // - Loading and error states
  const {
    data: game,
    isLoading,
    error,
  } = useGetGameByIdQuery(idValidation.data);

  if (error) {
    return (
      <div className='error'>
        An error occurred while fetching game details.
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <Link to='/games'>← Back to Games</Link>
      <GameDetailsCard game={game} />
    </div>
  );
}

// const CardShadow = styled(motion.div)`
//   width: 100%;
//   min-height: 100vh;
//   overflow-y: scroll;
//   background: rgba(0, 0, 0, 0.5);
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 5;

//   &::-webkit-scrollbar {
//     width: 0.5rem;
//   }

//   &::-webkit-scrollbar-thumb {
//     background-color: #ff7676;
//   }

//   &::-webkit-scrollbar-track {
//     background: white;
//   }
// `;

// const Detail = styled(motion.div)`
//   width: 80%;
//   border-radius: 1rem;
//   padding: 2rem 5rem;
//   background: white;
//   position: absolute;
//   left: 10%;
//   color: black;
//   z-index: 10;
//   img {
//     width: 100%;
//   }

//   @media (max-width: 768px) {
//     padding: 2rem 2rem;
//     width: 90%;
//     left: 5%;
//   }
// `;

// const Stats = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   padding-bottom: 1.5rem;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.1);

//   h3 {
//     font-size: 2rem;
//     text-align: center;
//   }

//   @media (max-width: 768px) {
//     gap: 1rem;
//     padding-bottom: 1rem;
//     h3 {
//       font-size: 1.5rem;
//     }
//   }
// `;

// const Info = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 1rem;
//   }
// `;

// const RatingSection = styled(motion.div)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.75rem;
//   background: rgba(0, 0, 0, 0.02);
//   border-radius: 0.5rem;
// `;

// const PlatformSection = styled(motion.div)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.75rem;
//   background: rgba(0, 0, 0, 0.02);
//   border-radius: 0.5rem;
// `;

// const Media = styled(motion.div)`
//   margin-top: 2rem;
//   img {
//     width: 100%;
//     border-radius: 0.5rem;
//   }
// `;

// const Description = styled(motion.div)`
//   margin: 3rem 0;
//   p {
//     line-height: 1.6;
//     font-size: 1.1rem;
//     color: #333;
//   }

//   @media (max-width: 768px) {
//     margin: 2rem 0;
//     p {
//       font-size: 1rem;
//     }
//   }
// `;

// const Gallery = styled(motion.div)`
//   display: grid;
//   grid-gap: 1rem;
//   img {
//     width: 100%;
//     border-radius: 0.5rem;
//   }
// `;

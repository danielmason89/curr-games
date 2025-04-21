import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const getStars = () => {
    const stars = [];
    const fullRating = Math.floor(rating);
    const fractionalPart = rating - fullRating;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullRating) {
        stars.push(<FaStar key={i} />);
      } else if (i === fullRating + 1 && fractionalPart >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <StyledStars>
      <div className='stars'>{getStars()}</div>
    </StyledStars>
  );
};

const StyledStars = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 100%;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .stars {
    display: flex;
    gap: 0.25rem;

    svg {
      font-size: 1.5rem;
      color: #ffd700;
    }
  }

  @media (min-width: 1024px) {
    h3 {
      font-size: 1.1rem;
    }
    .stars svg {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 768px) {
    .stars svg {
      font-size: 1.35rem;
    }
  }
`;

export default StarRating;

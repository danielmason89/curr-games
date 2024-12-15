import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
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
      <div>
        <h3>Rating: {rating}</h3>
        <div className='star'>{getStars()}</div>
      </div>
    </StyledStars>
  );
};

const StyledStars = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 1.2rem;
  }
  img {
    margin: 1rem 0.75rem;
  }
  .star svg {
    font-size: 1.75rem;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    img {
      width: 1.25rem;
      margin: 1.3rem 0.75rem;
    }
    .star svg {
      font-size: 1.25rem;
    }
  }
`;

export default StarRating;

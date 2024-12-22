import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { platformIconMap, platformFamilyMap } from '../util/platformMaps';

const PlatformIcons = ({ platforms }) => {
  return (
    <StyledPlatforms>
      <div>
        <h3>Platform</h3>
        <ul>
          {platforms &&
            Array.from(
              new Set(
                platforms
                  .map(data => platformFamilyMap[data.platform.slug])
                  .filter(Boolean)
              )
            ).map(family => (
              <li key={family} aria-label={`Platform: ${family}`}>
                {platformIconMap[family]}
              </li>
            ))}
        </ul>
      </div>
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 4rem;
  h3 {
    font-size: 1.2rem;
  }
  img {
    height: 5rem;
    width: 3.75rem;
    margin: 1rem 0.75rem;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style: none;
    flex-wrap: wrap;
  }
  ul > li > svg {
    font-size: 3.75rem;
    margin: 1rem 0.75rem;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 0.9rem;
    }
    img {
      width: 3.25rem;
      margin: 1rem 0.75rem;
    }
    ul > li > svg {
      font-size: 3.25rem;
    }
    padding-left: 0rem;
  }
`;

export default PlatformIcons;

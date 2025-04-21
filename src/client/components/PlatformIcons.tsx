import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  platformIconMap,
  platformFamilyMap,
  PlatformFamilyKey,
} from '../utils/platformMaps';
import type { PlatformDetails } from '@/shared/types';

interface PlatformIconsProps {
  platforms: PlatformDetails[];
}

const PlatformIcons = ({ platforms }: PlatformIconsProps) => {
  return (
    <StyledPlatforms>
      <IconsContainer>
        {platforms &&
          Array.from(
            new Set(
              platforms.map(data => {
                const slug = data.platform.slug as PlatformFamilyKey;
                return platformFamilyMap[slug] || 'pc';
              })
            )
          ).map(family => (
            <IconWrapper key={family} title={family}>
              {platformIconMap[family]}
            </IconWrapper>
          ))}
      </IconsContainer>
    </StyledPlatforms>
  );
};

const StyledPlatforms = styled(motion.div)`
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

  @media (min-width: 1024px) {
    h3 {
      font-size: 1.1rem;
    }
  }
`;

const IconsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.05);

  svg {
    font-size: 1.5rem;
    color: #333;
  }

  @media (min-width: 1024px) {
    padding: 0.5rem;
    svg {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.35rem;
    svg {
      font-size: 1.35rem;
    }
  }
`;

export default PlatformIcons;

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const animStar = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
`;

const titleFade = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

// Styled components
const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
`;

const StarsSmall = styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${generateBoxShadows(700)};
  animation: ${animStar} 50s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${generateBoxShadows(700)};
  }
`;

const StarsMedium = styled.div`
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${generateBoxShadows(200)};
  animation: ${animStar} 100s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: ${generateBoxShadows(200)};
  }
`;

const StarsBig = styled.div`
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${generateBoxShadows(100)};
  animation: ${animStar} 150s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: ${generateBoxShadows(100)};
  }
`;

const Title = styled.div`
  position: fixed;
  z-index: -1;
  top: 50%;
  left: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.1);
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 300;
  font-size: 130px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
  animation: ${titleFade} 5s ease-in forwards;
  pointer-events: none;
  user-select: none;

  span {
    background: linear-gradient(white, #38495a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

// Helper function to generate random box shadows
function generateBoxShadows(n) {
  let shadows = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(', ');
}

const StarsBackground = () => {
  return (
    <StarsContainer>
      <StarsSmall id='stars' />
      <StarsMedium id='stars2' />
      <StarsBig id='stars3' />
      <Title id='title'>
        <span>HAYAT</span>
      </Title>
    </StarsContainer>
  );
};

export default StarsBackground;

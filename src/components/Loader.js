import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blurText = keyframes`
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(4px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-family: 'Quattrocento Sans', sans-serif;

  span {
    display: inline-block;
    margin: 0 5px;
    color: #fff;
    font-size: 3rem;
    font-weight: bold;

    &:nth-child(1) {
      animation: ${blurText} 1.5s 0s infinite linear alternate;
    }
    &:nth-child(2) {
      animation: ${blurText} 1.5s 0.2s infinite linear alternate;
    }
    &:nth-child(3) {
      animation: ${blurText} 1.5s 0.4s infinite linear alternate;
    }
    &:nth-child(4) {
      animation: ${blurText} 1.5s 0.6s infinite linear alternate;
    }
    &:nth-child(5) {
      animation: ${blurText} 1.5s 0.8s infinite linear alternate;
    }
    &:nth-child(6) {
      animation: ${blurText} 1.5s 1s infinite linear alternate;
    }
  }

  @media (max-width: 768px) {
    span {
      font-size: 2rem;
    }
  }
`;

const WelcomeMessage = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 2s;
  font-family: 'Quattrocento Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Loader = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContainer>
      <LoadingText>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </LoadingText>
      {showWelcome && (
        <WelcomeMessage>Welcome to Hayat's Profile</WelcomeMessage>
      )}
    </LoaderContainer>
  );
};

export default Loader;

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Loading animation keyframes
const scanAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const typeAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #3399ff;
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
`;

const ScanLine = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(51, 153, 255, 0) 0%,
    rgba(51, 153, 255, 0.5) 50%,
    rgba(51, 153, 255, 0) 100%
  );
  box-shadow: 0 0 15px rgba(51, 153, 255, 0.7), 0 0 30px rgba(51, 153, 255, 0.5);
  animation: ${scanAnimation} 2s ease-in-out infinite;
`;

const LoadingText = styled.div`
  font-family: 'Space Mono', monospace;
  color: #3399ff;
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(51, 153, 255, 0.5);
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const ProgressContainer = styled.div`
  width: 300px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 20px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #3399ff;
  box-shadow: 0 0 10px rgba(51, 153, 255, 0.7);
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

const CodeSnippet = styled.div`
  background: rgba(10, 25, 47, 0.7);
  padding: 15px;
  border-radius: 5px;
  width: 300px;
  margin-top: 30px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #ffffff;
  position: relative;
  border: 1px solid rgba(51, 153, 255, 0.3);
  overflow: hidden;

  &:before {
    content: '// Initializing...';
    display: block;
    color: #666;
    margin-bottom: 10px;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(51, 153, 255, 0.05) 100%
    );
    pointer-events: none;
  }
`;

const TypedText = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #3399ff;
  animation: ${typeAnimation} 3.5s steps(40, end),
    ${blinkCursor} 0.75s step-end infinite;
  color: #3399ff;
`;

const ByteStream = styled.div`
  position: absolute;
  top: 20%;
  color: rgba(51, 153, 255, 0.3);
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
  animation: ${fadeAnimation} 2s infinite;
  pointer-events: none;
`;

const generateRandomBytes = () => {
  const chars = '01';
  let result = '';
  for (let i = 0; i < 50; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [byteStreams, setByteStreams] = useState([]);

  useEffect(() => {
    // Initialize progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Generate byte streams for visual effect
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setByteStreams((prev) => [
          ...prev,
          {
            id: i,
            bytes: generateRandomBytes(),
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            opacity: Math.random() * 0.5 + 0.2,
          },
        ]);
      }, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContainer>
      <ScanLine />
      {byteStreams.map((stream) => (
        <ByteStream
          key={stream.id}
          style={{
            left: stream.left,
            top: stream.top,
            opacity: stream.opacity,
          }}
        >
          {stream.bytes}
        </ByteStream>
      ))}
      <LoadingText>SYSTEM BOOT</LoadingText>
      <CodeSnippet>
        <TypedText>
          import &#123; Portfolio &#125; from './HayatSingh';
          <br />
          <br />
          const init = async () =&gt; &#123;
          <br />
          &nbsp;&nbsp;await Portfolio.render();
          <br />
          &nbsp;&nbsp;console.log('Welcome to my world');
          <br />
          &#125;;
        </TypedText>
      </CodeSnippet>
      <ProgressContainer>
        <ProgressBar $progress={progress} />
      </ProgressContainer>
    </LoaderContainer>
  );
};

export default Loader;

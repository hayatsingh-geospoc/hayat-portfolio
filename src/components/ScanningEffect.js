import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ScannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const ScanningLine = styled.div`
  position: absolute;
  width: 100%;
  height: 8px;
  background: linear-gradient(
    90deg,
    rgba(51, 153, 255, 0) 0%,
    rgba(51, 153, 255, 0.2) 25%,
    rgba(51, 153, 255, 0.8) 50%,
    rgba(51, 153, 255, 0.2) 75%,
    rgba(51, 153, 255, 0) 100%
  );
  box-shadow: 0 0 20px rgba(51, 153, 255, 0.5), 0 0 40px rgba(51, 153, 255, 0.3);
  transform: translateY(-50%);
  opacity: 0.7;
  z-index: 2;
`;

const ScanningOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255, 0.05) 0%,
    rgba(51, 153, 255, 0) 100%
  );
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;
  clip-path: polygon(
    0 0,
    100% 0,
    100% var(--scan-position),
    0 var(--scan-position)
  );
`;

const DataBits = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: rgba(51, 153, 255, 0.8);
  text-shadow: 0 0 5px rgba(51, 153, 255, 0.5);
  line-height: 1.2;
  letter-spacing: 1px;
  opacity: 0.7;
  padding: 0 20px;
  transform: translateY(-50%);
  z-index: 3;
  white-space: nowrap;
`;

const ScanningEffect = () => {
  const scanLineRef = useRef(null);
  const scanOverlayRef = useRef(null);
  const dataBitsRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let scanPosition = 0;
    const scanSpeed = 2; // pixels per frame

    // Generate random data bits
    const generateRandomBits = () => {
      const chars = '01';
      let result = '';
      for (let i = 0; i < 150; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const updateDataBits = () => {
      if (dataBitsRef.current) {
        dataBitsRef.current.textContent = generateRandomBits();
      }
    };

    // Animation loop
    const animate = () => {
      if (!scanLineRef.current || !scanOverlayRef.current) return;

      scanPosition += scanSpeed;

      // Reset position when it goes off screen
      if (scanPosition > window.innerHeight) {
        scanPosition = 0;
      }

      // Update scan line position
      scanLineRef.current.style.top = `${scanPosition}px`;

      // Update data bits position
      if (dataBitsRef.current) {
        dataBitsRef.current.style.top = `${scanPosition + 15}px`;
      }

      // Update scan overlay clip path
      scanOverlayRef.current.style.setProperty(
        '--scan-position',
        `${scanPosition}px`
      );

      // Update data bits periodically
      if (Math.random() > 0.9) {
        updateDataBits();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    updateDataBits();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <ScannerContainer>
      <ScanningLine ref={scanLineRef} />
      <ScanningOverlay ref={scanOverlayRef} />
      <DataBits ref={dataBitsRef} />
    </ScannerContainer>
  );
};

export default ScanningEffect;

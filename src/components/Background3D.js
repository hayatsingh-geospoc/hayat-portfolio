import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const Background3D = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Load Vanta.js scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // Load Three.js first
        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
        );
        // Then load Vanta.js
        await loadScript(
          'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js'
        );

        // Initialize Vanta effect
        if (window.VANTA) {
          window.VANTA.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            backgroundColor: 0x0a0a0a,
            cloudColor: 0x3399ff,
            cloudShadowColor: 0x2288ee,
            speed: 1.0,
            texturePath:
              'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/clouds.png',
          });
        }
      } catch (error) {
        console.error('Error loading Vanta.js:', error);
      }
    };

    initVanta();

    // Cleanup
    return () => {
      if (window.VANTA && window.VANTA.destroy) {
        window.VANTA.destroy();
      }
      // Remove scripts
      const scripts = document.querySelectorAll(
        'script[src*="three.js"], script[src*="vanta"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return <BackgroundContainer ref={vantaRef} />;
};

export default Background3D;

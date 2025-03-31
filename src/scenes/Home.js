import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomeContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  max-width: 800px;

  @media (max-width: 1024px) {
    font-size: 5rem;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(0, 255, 0, 0.4);
    box-shadow: 0 0 25px rgba(0, 255, 0, 0.5);
    transform: translateY(-3px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.to(heroRef.current, {
      opacity: 0.3,
      y: 100,
      scale: 0.9,
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <HomeContainer>
      <HeroSection ref={heroRef}>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Title variants={itemVariants}>
            Hi, I'm <Highlight>Hayat Singh</Highlight>
          </Title>
          <Subtitle variants={itemVariants}>
            Full Stack Developer with 3 years of experience building scalable
            applications and RESTful APIs.
          </Subtitle>
          <motion.div variants={itemVariants}>
            <StyledLink to='/projects'>
              <CTAButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </CTAButton>
            </StyledLink>
            <StyledLink to='/contact'>
              <CTAButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </CTAButton>
            </StyledLink>
          </motion.div>
        </motion.div>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;

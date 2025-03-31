import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent'};
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  z-index: 20;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff00;
  }

  &.active {
    color: #00ff00;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #00ff00;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  z-index: 20;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 10;

  /* Netflix-inspired gradient */
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(20, 20, 20, 0.95) 100%
  );
`;

const MobileNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ffffff;
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const mobileMenuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30,
    },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Nav
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Logo>HS</Logo>
        <NavLinks>
          <StyledNavLink to='/'>Home</StyledNavLink>
          <StyledNavLink to='/about'>About</StyledNavLink>
          <StyledNavLink to='/projects'>Projects</StyledNavLink>
          <StyledNavLink to='/contact'>Contact</StyledNavLink>
        </NavLinks>
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <MobileNavLink to='/' onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to='/about' onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink to='/projects' onClick={() => setIsOpen(false)}>
              Projects
            </MobileNavLink>
            <MobileNavLink to='/contact' onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

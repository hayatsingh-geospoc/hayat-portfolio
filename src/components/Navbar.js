import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: rgba(10, 25, 47, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(51, 153, 255, 0.2);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #3399ff;
  letter-spacing: 2px;
  cursor: pointer;

  &:after {
    content: '_';
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(10, 25, 47, 0.95);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-bottom: 1px solid rgba(51, 153, 255, 0.2);
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  padding: 5px 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #3399ff;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  &.active:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;

          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <NavBarContainer>
      <Logo>HAYAT</Logo>
      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      <NavLinks isOpen={isOpen}>
        {sections.map((section) => (
          <NavLink
            key={section.id}
            onClick={() => scrollToSection(section.ref)}
            className={activeSection === section.id ? 'active' : ''}
          >
            {section.label}
          </NavLink>
        ))}
      </NavLinks>
    </NavBarContainer>
  );
};

export default Navbar;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 5rem 1rem 1rem;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 3rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  overflow: hidden;
  height: 460px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.8) 80%
    );
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  width: 100%;
  background: ${({ bgColor }) => bgColor || 'rgba(0, 255, 0, 0.1)'};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 255, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
`;

const ProjectIcon = styled.div`
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 0, 0.3);
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff00;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.1rem;
  }
`;

const DetailModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #111;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #0a0a0a;
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.2);
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

// Project data from the original portfolio
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Backend API',
    description:
      'Developed a NestJS-based e-commerce backend using GraphQL and MongoDB, enabling efficient and scalable API interactions.',
    technologies: ['NestJS', 'GraphQL', 'MongoDB', 'JWT'],
    icon: 'fas fa-shopping-cart',
    bgColor: '#151515',
    github:
      'https://github.com/hayatsingh-geospoc/Take-Home-Task-IDS-Backend.git',
    features: [
      'Implemented comprehensive product catalog management system with efficient pagination',
      'Designed and integrated secure shopping cart functionality and order processing workflows',
      'Built optimized GraphQL resolvers for efficient data fetching and MongoDB schema integration',
      'Implemented robust JWT-based authentication and security middleware',
      'Developed comprehensive input validation and error handling mechanisms',
      'Created RESTful admin endpoints for backend operations management',
      'Implemented automated testing suite for ensuring system reliability',
    ],
  },
  {
    id: 2,
    title: 'JIO Insure Portal',
    description:
      'Backend development for a unified insurance portal system with integrations to multiple insurer APIs.',
    technologies: [
      'Node.js',
      'Express.js',
      'NestJS',
      'RESTful APIs',
      'MongoDB',
      'SQL',
    ],
    icon: 'fas fa-shield-alt',
    bgColor: '#151515',
    features: [
      "Integrated insurers' APIs to fetch and recalculate premiums in a unified portal",
      'Optimized API endpoints for dynamic premium calculations',
      'Implemented KYC processes with third-party verification services',
      'Developed a custom Zoho Desk ticketing API and customized platform features',
      'Seamlessly integrated with the Bimastreet portal for unified insurance services',
      'Developed secure proposal submission flows for insurers',
      'Enhanced API scalability to handle high request volumes efficiently',
    ],
  },
  {
    id: 3,
    title: 'Ola Maps API Development',
    description:
      'Full stack development for Ola Maps platform including API development and data processing solutions.',
    technologies: [
      'Node.js',
      'CSV Processing',
      'MBTiles',
      'TileServer-GL-JS',
      'Axios',
    ],
    icon: 'fas fa-map-marked-alt',
    bgColor: '#151515',
    features: [
      'Developed an API to process large volumes of CSV data with optimization for performance',
      'Conducted R&D using Planetiler repository to generate complete India map from scratch',
      'Optimized benchmarking, latency, and data size for MBTiles',
      'Integrated PMTiles support into TileServer-GL-JS, enhancing map-rendering capabilities',
      'Migrated a legacy PHP system to Node.js, improving system performance and maintainability',
      'Optimized database interactions and implemented asynchronous processing',
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <ProjectsContainer>
      <PageTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </PageTitle>

      <ProjectsGrid
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            variants={itemVariants}
            onClick={() => openModal(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProjectImage bgColor={project.bgColor}>
              <ProjectIcon>
                <i className={project.icon}></i>
              </ProjectIcon>
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectTech>
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </ProjectTech>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectLinks>
                {project.github && (
                  <ProjectLink
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className='fab fa-github'></i>
                    GitHub
                  </ProjectLink>
                )}
                <ProjectLink
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(project);
                  }}
                >
                  <i className='fas fa-info-circle'></i>
                  Details
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      {selectedProject && (
        <DetailModal
          initial='hidden'
          animate='visible'
          exit='exit'
          onClick={handleModalClick}
        >
          <ModalContent variants={modalVariants} ref={modalRef}>
            <CloseButton
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </CloseButton>
            <ModalHeader>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ProjectTech>
                {selectedProject.technologies.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </ProjectTech>
            </ModalHeader>
            <ModalBody>
              <ModalDescription>{selectedProject.description}</ModalDescription>
              <h3 style={{ color: '#00ff00', marginBottom: '1rem' }}>
                Key Features
              </h3>
              <FeaturesList>
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </FeaturesList>
              {selectedProject.github && (
                <ProjectLink
                  href={selectedProject.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-github'></i>
                  View Repository
                </ProjectLink>
              )}
            </ModalBody>
          </ModalContent>
        </DetailModal>
      )}
    </ProjectsContainer>
  );
};

export default Projects;

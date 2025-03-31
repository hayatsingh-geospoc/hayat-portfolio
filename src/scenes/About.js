import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 5rem 1rem 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Bio = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const SkillsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #00ff00;
`;

const SkillName = styled.h3`
  font-weight: 600;
  text-align: center;
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00ff00;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(0, 255, 0, 0.1),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;

const CompanyName = styled.h4`
  font-size: 1.25rem;
  color: #00ff00;
  margin-bottom: 1rem;
`;

const JobPeriod = styled.div`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const JobDescription = styled.ul`
  list-style-position: inside;
  margin-left: 1rem;

  li {
    margin-bottom: 0.75rem;
  }
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
    },
  },
};

const skillsList = [
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'TypeScript', icon: 'fab fa-js' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'Express.js', icon: 'fab fa-node-js' },
  { name: 'NestJS', icon: 'fas fa-server' },
  { name: 'ReactJS', icon: 'fab fa-react' },
  { name: 'VueJS', icon: 'fab fa-vuejs' },
  { name: 'MySQL', icon: 'fas fa-database' },
  { name: 'PostgreSQL', icon: 'fas fa-database' },
  { name: 'MongoDB', icon: 'fas fa-database' },
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'Azure', icon: 'fab fa-microsoft' },
  { name: 'GraphQL', icon: 'fas fa-project-diagram' },
];

const experienceList = [
  {
    title: 'Backend Developer (Node.js)',
    company: 'EVERVENT Private Limited - JIO Insure Portal',
    period: 'Sep 2023 - Present',
    description: [
      "Integrated insurers' APIs to fetch and recalculate premiums in a unified portal",
      'Optimized API endpoints for dynamic premium calculations',
      'Implemented KYC processes with third-party verification services',
      'Developed a custom Zoho Desk ticketing API',
      'Enhanced API scalability to handle high request volumes efficiently',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Geospoc (An OLA Company)',
    period: 'Jan 2022 - Sep 2023',
    description: [
      'Developed an API to process large volumes of CSV data',
      'Conducted R&D using Planetiler repository to generate complete India map from scratch',
      'Integrated PMTiles support into TileServer-GL-JS',
      'Migrated a legacy PHP system to Node.js',
      'Optimized database interactions and implemented asynchronous processing',
    ],
  },
];

const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    // Create animations for sections
    gsap.from(skillsRef.current, {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    gsap.from(experienceRef.current, {
      scrollTrigger: {
        trigger: experienceRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <AboutContainer ref={aboutRef}>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <Section>
          <SectionTitle variants={itemVariants}>About Me</SectionTitle>
          <Bio variants={itemVariants}>
            Full Stack Developer with 3 years of experience, based in India/UK.
            Specialized in building robust and scalable full-stack solutions
            using modern JavaScript frameworks and libraries. Passionate about
            creating efficient, maintainable, and user-friendly applications.
          </Bio>
        </Section>

        <Section ref={skillsRef}>
          <SectionTitle variants={itemVariants}>Tech Stack</SectionTitle>
          <SkillsWrapper>
            {skillsList.map((skill, index) => (
              <SkillCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkillIcon>
                  <i className={skill.icon}></i>
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
              </SkillCard>
            ))}
          </SkillsWrapper>
        </Section>

        <Section ref={experienceRef}>
          <SectionTitle variants={itemVariants}>Work Experience</SectionTitle>
          <ExperienceList>
            {experienceList.map((job, index) => (
              <ExperienceCard
                key={index}
                variants={itemVariants}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>{job.company}</CompanyName>
                <JobPeriod>{job.period}</JobPeriod>
                <JobDescription>
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </JobDescription>
              </ExperienceCard>
            ))}
          </ExperienceList>
        </Section>
      </motion.div>
    </AboutContainer>
  );
};

export default About;

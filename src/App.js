import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import StarsBackground from './components/StarsBackground';
import ScanningEffect from './components/ScanningEffect';

// Styled Components
const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  font-family: 'Space Grotesk', sans-serif;
  color: white;
  overflow-x: hidden;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

// Superhero Background Container
const SuperheroBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3399ff;
  text-shadow: 0 0 10px rgba(51, 153, 255, 0.5);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const NavLink = styled.a`
  color: #3399ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    text-shadow: 0 0 8px rgba(51, 153, 255, 0.8);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  padding: 110px 20px 50px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-margin-top: 100px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(51, 153, 255, 0.1);
  }
`;

const SectionContent = styled(motion.div)`
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 153, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  h1,
  h2,
  h3 {
    color: #3399ff;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(51, 153, 255, 0.3);
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 30px;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 20px;
  }

  p {
    color: #ffffff;
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 20px;
  }

  ul {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ProjectCard = styled.div`
  margin-bottom: 30px;
  background: rgba(10, 10, 30, 0.3);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(51, 153, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(51, 153, 255, 0.3);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input,
  textarea {
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(51, 153, 255, 0.3);
    border-radius: 5px;
    color: white;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3399ff;
      box-shadow: 0 0 10px rgba(51, 153, 255, 0.5);
    }
  }

  button {
    padding: 12px;
    background-color: #3399ff;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #2288ee;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(51, 153, 255, 0.4);
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-20px) translateX(-50%);
    }
    60% {
      transform: translateY(-10px) translateX(-50%);
    }
  }
`;

const ArrowDown = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid #3399ff;
  border-bottom: 2px solid #3399ff;
  transform: rotate(45deg);
  margin-bottom: 10px;
`;

const ScrollText = styled.span`
  color: #3399ff;
  font-size: 0.8rem;
`;

// Add this new styled component
const HomeContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgba(51, 153, 255, 0.7);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    letter-spacing: 2px;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #3399ff, #66ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const ExploreButton = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(0);
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate random superhero position data
  const generateRandomHeroData = () => {
    const heroes = [
      {
        id: 'ironman',
        title: 'Iron Man',
        powers: ['Genius intellect', 'Advanced technology', 'Flight'],
        description: 'Billionaire inventor who created a powered suit of armor',
      },
      {
        id: 'superman',
        title: 'Superman',
        powers: ['Super strength', 'Flight', 'Heat vision', 'X-ray vision'],
        description:
          "Last son of Krypton with incredible powers under Earth's yellow sun",
      },
      {
        id: 'batman',
        title: 'Batman',
        powers: [
          'Master detective',
          'Peak human conditioning',
          'Advanced gadgets',
        ],
        description:
          'The Dark Knight of Gotham City who fights crime with technology and intelligence',
      },
      {
        id: 'hulk',
        title: 'Hulk',
        powers: ['Superhuman strength', 'Invulnerability', 'Healing factor'],
        description:
          'Scientist transformed by gamma radiation into a powerful green monster',
      },
      {
        id: 'wonderwoman',
        title: 'Wonder Woman',
        powers: [
          'Super strength',
          'Flight',
          'Combat mastery',
          'Lasso of Truth',
        ],
        description:
          'Amazon princess with divine powers who fights for justice and peace',
      },
      {
        id: 'thor',
        title: 'Thor',
        powers: ['God-like strength', 'Control of lightning', 'Mjolnir hammer'],
        description:
          'Asgardian god of thunder who protects Earth and the Nine Realms',
      },
      {
        id: 'flash',
        title: 'The Flash',
        powers: ['Super speed', 'Time manipulation', 'Speed force connection'],
        description: 'The fastest man alive who can move at incredible speeds',
      },
    ];

    return heroes;
  };

  useEffect(() => {
    // Show loading screen for 5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
      // Show main content after a short delay
      setTimeout(() => {
        setShowMainContent(true);
      }, 1000);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: homeRef, id: 'home' },
        { ref: aboutRef, id: 'about' },
        { ref: skillsRef, id: 'skills' },
        { ref: experienceRef, id: 'experience' },
        { ref: projectsRef, id: 'projects' },
        { ref: contactRef, id: 'contact' },
      ];

      // Determine which section is in view
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(({ ref, id }) => {
        const element = ref.current;
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            // Could highlight active nav item here
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <Loader key='loader' />
        ) : (
          <AppContainer
            isLoaded={isLoaded}
            style={{
              opacity: showMainContent ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <StarsBackground />
            <ScanningEffect />
            {/* Keep this commented for now to make the stars background more visible */}
            {/* <Background3D /> */}

            <Navbar
              sections={[
                { id: 'home', ref: homeRef, label: 'Home' },
                { id: 'about', ref: aboutRef, label: 'About' },
                { id: 'skills', ref: skillsRef, label: 'Skills' },
                { id: 'experience', ref: experienceRef, label: 'Experience' },
                { id: 'projects', ref: projectsRef, label: 'Projects' },
                { id: 'contact', ref: contactRef, label: 'Contact' },
              ]}
            />

            <ContentContainer>
              <Section ref={homeRef} id='home'>
                <HomeContentWrapper>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    HAYAT <GradientText>(HARRY)</GradientText>
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Backend Developer | Node.js | Microservices | Redis | Kafka
                  </motion.h2>
                  <ExploreButton
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onClick={() => scrollToSection(aboutRef)}
                  >
                    <ArrowDown />
                    <ScrollText>Explore More</ScrollText>
                  </ExploreButton>
                </HomeContentWrapper>
              </Section>

              <Section ref={aboutRef} id='about'>
                <SectionContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h1>About Me</h1>
                  <p>
                    I'm a passionate Backend Developer based in Uttarakhand,
                    India. With 3+ years of experience, I specialize in building
                    scalable applications using Node.js, Express.js, and modern
                    technologies like Redis and Kafka.
                  </p>
                  <p>
                    My expertise lies in microservices architecture, real-time
                    applications, and event-driven systems. I'm constantly
                    learning and improving my skills to deliver high-quality,
                    performant applications.
                  </p>

                  <h2>Education</h2>
                  <p>🎓 Bachelor's Degree in Computer Science</p>

                  <h2>Certifications</h2>
                  <ul>
                    <li>
                      📜 <strong>Node.js Certified Developer</strong>
                    </li>
                    <li>
                      📜 <strong>MongoDB Advanced Certification</strong>
                    </li>
                    <li>
                      📜{' '}
                      <strong>
                        Kafka & Event-Driven Architecture Certification
                      </strong>
                    </li>
                  </ul>

                  <h2>Additional Info</h2>
                  <ul>
                    <li>
                      🌱 Currently learning:{' '}
                      <strong>Advanced Kafka & Scalable System Design</strong>
                    </li>
                    <li>
                      🎯 Goal: Becoming a{' '}
                      <strong>Senior Backend Engineer</strong> & mastering{' '}
                      <strong>distributed systems</strong>
                    </li>
                    <li>
                      🎥 YouTube Creator: Running a{' '}
                      <strong>cricket-based YouTube channel</strong>
                    </li>
                  </ul>
                </SectionContent>
              </Section>

              <Section ref={skillsRef} id='skills'>
                <SectionContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h1>Technical Skills</h1>

                  <h2>Backend Technologies</h2>
                  <ul>
                    <li>
                      ✅ <strong>Node.js, Express.js, NestJS</strong>
                    </li>
                    <li>✅ RESTful APIs, GraphQL</li>
                    <li>✅ Microservices & Monolithic Architectures</li>
                  </ul>

                  <h2>Databases & Storage</h2>
                  <ul>
                    <li>
                      ✅ <strong>MongoDB, MySQL, PostgreSQL</strong>
                    </li>
                    <li>✅ Query Optimization, Aggregations, Indexing</li>
                    <li>
                      ✅{' '}
                      <strong>
                        Redis (Caching, Pub/Sub, Session Management)
                      </strong>
                    </li>
                  </ul>

                  <h2>Messaging & Event-Driven Systems</h2>
                  <ul>
                    <li>
                      ✅{' '}
                      <strong>
                        Kafka (Producer-Consumer Model, Message Queues, Streams
                        Processing)
                      </strong>
                    </li>
                    <li>✅ RabbitMQ, WebSockets (Real-time Applications)</li>
                  </ul>

                  <h2>DevOps & Deployment</h2>
                  <ul>
                    <li>
                      ✅ <strong>Docker, Docker Compose, Kubernetes</strong>
                    </li>
                    <li>✅ CI/CD Pipelines (GitHub Actions, Jenkins)</li>
                    <li>✅ Cloud Services (AWS, GCP, DigitalOcean)</li>
                  </ul>

                  <h2>Other Skills</h2>
                  <ul>
                    <li>✅ Authentication (JWT, OAuth, Firebase Auth)</li>
                    <li>✅ Caching Strategies (Redis, Memcached)</li>
                    <li>✅ WebSockets for Real-Time Apps</li>
                    <li>✅ Unit Testing (Jest, Mocha, Chai)</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section ref={experienceRef} id='experience'>
                <SectionContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h1>Work Experience</h1>

                  <h2>Software Engineer | INDIANIC | 2025-Present</h2>
                  <ul>
                    <li>
                      Working as a Software Engineer at INDIANIC, contributing
                      to various projects and solutions.
                    </li>
                  </ul>

                  <h2>
                    Node.js Developer | Evervent Private Limited | 2023-2025
                  </h2>
                  <ul>
                    <li>
                      Led backend development for multiple fintech projects
                      including <strong>JioFinance</strong>,{' '}
                      <strong>JioInsure</strong>,{' '}
                      <strong>Muthooth Finance</strong>, and{' '}
                      <strong>Wallnut</strong>.
                    </li>
                    <li>
                      Developed and maintained the{' '}
                      <strong>Bimastreet portal</strong> using Node.js and
                      modern backend technologies.
                    </li>
                    <li>
                      Implemented <strong>microservices architecture</strong>{' '}
                      for scalable financial applications.
                    </li>
                    <li>
                      Integrated <strong>payment gateways</strong> and{' '}
                      <strong>insurance APIs</strong> for seamless transactions.
                    </li>
                  </ul>

                  <h2>SDE-1 | GeoSpoc (An Ola Company) | 2022-2023</h2>
                  <ul>
                    <li>
                      Worked on <strong>Ola Maps project</strong> in the GIS
                      domain, contributing to location-based services.
                    </li>
                    <li>
                      Developed and optimized{' '}
                      <strong>geospatial data processing</strong> systems.
                    </li>
                    <li>
                      Implemented <strong>real-time location tracking</strong>{' '}
                      and <strong>route optimization</strong> features.
                    </li>
                    <li>
                      Collaborated with cross-functional teams to enhance map
                      accuracy and user experience.
                    </li>
                  </ul>
                </SectionContent>
              </Section>

              <Section ref={projectsRef} id='projects'>
                <SectionContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h1>Projects</h1>

                  <ProjectCard>
                    <h2>🚀 Real-Time Chat Application</h2>
                    <p>
                      Built a <strong>real-time messaging app</strong> using{' '}
                      <strong>WebSockets & Redis Pub/Sub</strong>. Used{' '}
                      <strong>Kafka</strong> for handling event-driven
                      notifications and message queuing. Implemented{' '}
                      <strong>JWT authentication</strong> and{' '}
                      <strong>MongoDB for message storage</strong>.
                    </p>
                  </ProjectCard>

                  <ProjectCard>
                    <h2>🚀 Portfolio Website</h2>
                    <p>
                      Created a{' '}
                      <strong>React + Node.js/NestJS portfolio site</strong> to
                      showcase projects. Used <strong>Redis caching</strong> for
                      faster API responses. Deployed with{' '}
                      <strong>Docker + AWS + CI/CD pipelines</strong>.
                    </p>
                  </ProjectCard>

                  <ProjectCard>
                    <h2>🚀 NGO Website Backend</h2>
                    <p>
                      Developed backend APIs for{' '}
                      <strong>
                        user management, donations, and event tracking
                      </strong>
                      . Used <strong>Redis for session management</strong> and{' '}
                      <strong>Kafka for processing donation events</strong>.
                    </p>
                  </ProjectCard>

                  <ProjectCard>
                    <h2>🚀 Cricket YouTube Automation</h2>
                    <p>
                      Built a <strong>Node.js script</strong> to automate{' '}
                      <strong>YouTube metadata generation</strong>. Integrated{' '}
                      <strong>YouTube API</strong> for scheduled video uploads.
                    </p>
                  </ProjectCard>
                </SectionContent>
              </Section>

              <Section ref={contactRef} id='contact'>
                <SectionContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h1>Contact Me</h1>
                  <p>
                    I'm always open to discussing new projects, opportunities,
                    or partnerships. Feel free to reach out to me through any of
                    the following channels.
                  </p>

                  <h2>Location</h2>
                  <p>📍 Uttarakhand, India</p>

                  <h2>Email</h2>
                  <p>📧 jeet53316@gmail.com</p>

                  <h2>Portfolio & Social Media</h2>
                  <p>
                    🌐{' '}
                    <a
                      href='https://hayat-portfolio.vercel.app/'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: '#3399ff', textDecoration: 'none' }}
                    >
                      Portfolio Website
                    </a>{' '}
                    | 🔗{' '}
                    <a
                      href='https://github.com/hayatsingh-geospoc'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: '#3399ff', textDecoration: 'none' }}
                    >
                      GitHub
                    </a>{' '}
                    | 🔗{' '}
                    <a
                      href='https://www.linkedin.com/in/hayat-singh-b4327b1b3'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: '#3399ff', textDecoration: 'none' }}
                    >
                      LinkedIn
                    </a>{' '}
                    | 🎥{' '}
                    <a
                      href='https://www.youtube.com/@harryuk17'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: '#3399ff', textDecoration: 'none' }}
                    >
                      YouTube
                    </a>
                  </p>

                  <h2>Send a Message</h2>
                  <ContactForm>
                    <input type='text' placeholder='Your Name' />
                    <input type='email' placeholder='Your Email' />
                    <textarea placeholder='Your Message' rows={5} />
                    <button type='submit'>Send Message</button>
                  </ContactForm>
                </SectionContent>
              </Section>
            </ContentContainer>
          </AppContainer>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

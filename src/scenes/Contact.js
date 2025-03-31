import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
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
  margin-bottom: 1rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid rgba(0, 255, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #00ff00;
`;

const InputGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);

  &:hover {
    background: rgba(0, 255, 0, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactInfoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 255, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 0, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ContactIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 255, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00ff00;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactType = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff00;
  }
`;

const FormSuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const contactInfo = [
  {
    type: 'Email',
    value: 'jeet53316@gmail.com',
    icon: 'fas fa-envelope',
    link: 'mailto:jeet53316@gmail.com',
  },
  {
    type: 'Phone',
    value: '+91 7409150572',
    icon: 'fas fa-phone',
    link: 'tel:+917409150572',
  },
  {
    type: 'LinkedIn',
    value: 'Hayat Singh',
    icon: 'fab fa-linkedin',
    link: 'https://www.linkedin.com/in/hayat-singh-b4327b1b3',
  },
  {
    type: 'GitHub',
    value: 'hayatsingh-geospoc',
    icon: 'fab fa-github',
    link: 'https://github.com/hayatsingh-geospoc',
  },
];

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

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      mass: 1,
    },
  },
};

const infoVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      mass: 1,
    },
  },
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <ContactContainer>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <PageTitle variants={itemVariants}>Get In Touch</PageTitle>
        <Subtitle variants={itemVariants}>
          I'm always open to new opportunities and collaborations. Feel free to
          reach out!
        </Subtitle>

        <Content>
          <FormSection
            variants={formVariants}
            initial='hidden'
            animate='visible'
          >
            <FormTitle>Send a Message</FormTitle>

            {isSubmitted && (
              <FormSuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Thank you for your message! I'll get back to you soon.
              </FormSuccessMessage>
            )}

            <form onSubmit={handleSubmit}>
              <InputGroup variants={itemVariants}>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup variants={itemVariants}>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup variants={itemVariants}>
                <Label htmlFor='message'>Message</Label>
                <TextArea
                  id='message'
                  name='message'
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <SubmitButton
                type='submit'
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </form>
          </FormSection>

          <ContactInfoSection
            variants={infoVariants}
            initial='hidden'
            animate='visible'
          >
            {contactInfo.map((contact, index) => (
              <ContactCard
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <ContactIconWrapper>
                  <i className={contact.icon}></i>
                </ContactIconWrapper>
                <ContactInfo>
                  <ContactType>{contact.type}</ContactType>
                  <ContactLink
                    href={contact.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {contact.value}
                  </ContactLink>
                </ContactInfo>
              </ContactCard>
            ))}
          </ContactInfoSection>
        </Content>
      </motion.div>
    </ContactContainer>
  );
};

export default Contact;

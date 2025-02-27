import React from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: '60px 0',
  textAlign: 'center',
  backgroundColor: 'white',
}));

const Tagline = styled(Typography)(({ theme }) => ({
  color: '#159EEC',
  fontWeight: 'bold',
  marginBottom: '16px',
  textTransform: 'uppercase',
  fontSize: '18px',
  lineHeight: '21.96px',
  letterSpacing: '16%',
  textAlign: 'center',
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: '#0E1680',
  fontWeight: 'bold',
  marginBottom: '20px',
  fontSize: '2rem',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: '#666',
  maxWidth: '800px',
  margin: '0 auto 30px',
  lineHeight: 1.6,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '40px auto 0',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#3498db',
  fontWeight: 'medium',
  padding: '6px 0',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#2980b9',
  },
}));

interface WelcomeSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
  learnMoreText?: string;
  onLearnMoreClick?: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  tagline = 'WELCOME TO MEDDICAL',
  heading = 'A Great Place to Receive Care',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.',
  imageUrl = '/ui/Landing/welcomesection.png',
  learnMoreText = 'Learn More',
  onLearnMoreClick = () => {},
}) => {
  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        <Tagline variant="subtitle1">{tagline}</Tagline>
        <Heading variant="h2">{heading}</Heading>
        <Description variant="body1">{description}</Description>

        {/* Learn More Button */}
        <LearnMoreButton endIcon={<ArrowForwardIcon />} onClick={onLearnMoreClick}>
          {learnMoreText}
        </LearnMoreButton>

        {/* Grid Layout for Image & Text */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
            <ImageContainer className='max-h-[250px] flex items-center justify-center'>
              <Box
                component="img"
                src={imageUrl}
                alt="Medical team"
                sx={{
                  width: '100%',
                  height: 'auto',  
                  display: 'block',
                }}
              />
            </ImageContainer>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default WelcomeSection;

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button 
} from '@mui/material';
import { 
  MedicalServices, 
  MonitorHeart, 
  Science, 
  Bloodtype 
} from '@mui/icons-material';

interface ServiceFeatureItem {
  text: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
}

interface OurServicesSectionProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description1?: string;
  description2?: string;
  serviceFeatures?: ServiceFeatureItem[];
  viewAllText?: string;
  onViewAllClick?: () => void;
}

const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  tagline = "CARE YOU CAN BELIEVE IN",
  heading = "Our Services",
  subHeading = "A passion for putting patients first.",
  description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.",
  description2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Velit nascetur proin massa in.",
  serviceFeatures = [
    { text: "A Passion for Healing" },
    { text: "5-Star Care" },
    { text: "All our best" },
    { text: "Believe in Us" },
    { text: "A Legacy of Excellence" },
    { text: "Always Caring" },
  ],
  viewAllText = "View All",
  onViewAllClick = () => {},
}) => {
  
  const services: ServiceCardProps[] = [
    { icon: <MedicalServices className="text-3xl" />, title: "Free Checkup" },
    { icon: <MonitorHeart className="text-3xl" />, title: "Cardiogram" },
    { icon: <Science className="text-3xl" />, title: "DNA Testing" },
    { icon: <Bloodtype className="text-3xl" />, title: "Blood Bank" },
  ];

  return (
    <Box className="py-16 bg-white">
      <Container maxWidth="lg">
        <Typography variant="subtitle1" className="text-center text-blue-500 font-bold mb-4 uppercase">
          {tagline}
        </Typography>
        
        <Typography variant="h2" className="text-center text-4xl font-bold mb-12 text-indigo-900">
          {heading}
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left Column - Service Cards and View All Button */}
          <Grid item xs={12} md={3}>
            {services.map((service, index) => (
              <Box 
                key={index} 
                className="flex flex-col items-center p-5 rounded-lg mb-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <Box className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-indigo-900">
                  {service.icon}
                </Box>
                <Typography variant="subtitle1" className="font-bold mb-2 text-gray-800">
                  {service.title}
                </Typography>
              </Box>
            ))}
            <Box className="text-center mt-4">
              <Button 
                onClick={onViewAllClick}
                className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                {viewAllText}
              </Button>
            </Box>
          </Grid>
          
          {/* Middle Column - Content */}
          <Grid item xs={12} md={5}>
            <Typography variant="h5" className="font-bold mb-5 text-xl text-gray-800">
              {subHeading}
            </Typography>
            
            <Box className="mt-10 mb-8">
              <Grid container spacing={2}>
                {serviceFeatures.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box className="flex items-center gap-2">
                      <Box className="w-2.5 h-2.5 rounded-full bg-blue-500"></Box>
                      <Typography variant="body2">
                        {feature.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Typography variant="body2" className="text-gray-600 leading-relaxed mb-5">
              {description1}
            </Typography>
            <Typography variant="body2" className="text-gray-600 leading-relaxed mb-5">
              {description2}
            </Typography>
          </Grid>
          
          {/* Right Column - Images */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/ui/Landing/OurServicesSection1.jpg"
              alt="Doctor with patient"
              className="w-full h-auto rounded-lg mb-4"
            />
            
            <Box
              component="img"
              src="/ui/Landing/OurServicesSection2.jpg"
              alt="Smiling doctor"
              className="w-full h-auto rounded-lg"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurServicesSection;
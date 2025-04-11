import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  SimpleGrid,
  Flex,
  Image,
  Card,
  CardBody,
  VStack,
} from '@chakra-ui/react';
import { FaMicrophone, FaVideo, FaChartLine, FaRobot, FaBookmark, FaUsers, FaLaptopCode, FaBook, FaStar } from 'react-icons/fa';

// Feature component
const Feature = ({ title, text, icon, onClick }) => {
  return (
    <Card
      direction="column"
      overflow="hidden"
      variant="outline"
      cursor="pointer"
      onClick={onClick}
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
      transition="all 0.2s"
    >
      <CardBody>
        <VStack spacing={4} align="center" p={4}>
          <Flex
            w={16}
            h={16}
            align="center"
            justify="center"
            color="white"
            rounded="full"
            bg={useColorModeValue('blue.500', 'blue.300')}
            mb={1}
          >
            <Icon as={icon} w={8} h={8} />
          </Flex>
          <Heading size="md" textAlign="center">{title}</Heading>
          <Text color="gray.600" textAlign="center">{text}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const headerBg = useColorModeValue('blue.500', 'blue.200');
  const headerColor = useColorModeValue('white', 'gray.800');

  const features = [
    {
      title: 'Speech Analysis',
      text: 'Our AI analyzes your speech patterns, fluency, clarity, and confidence levels to provide personalized feedback.',
      icon: FaMicrophone,
      path: '/speech-analysis'
    },
    {
      title: 'Performance Tracking',
      text: 'Track your progress over time with detailed analytics on your strengths and areas for improvement.',
      icon: FaChartLine,
      path: '/progress'
    },
    {
      title: 'Practice Questions',
      text: 'Access a vast library of interview questions across different domains and difficulty levels.',
      icon: FaLaptopCode,
      path: '/practice'
    },
    {
      title: 'Mock Interviews',
      text: 'Participate in realistic mock interviews with AI-powered feedback and evaluation.',
      icon: FaUsers,
      path: '/mock-interviews'
    },
    {
      title: 'Learning Resources',
      text: 'Access comprehensive study materials, guides, and tips for interview preparation.',
      icon: FaBook,
      path: '/resources'
    },
    {
      title: 'Community Support',
      text: 'Join our community to share experiences and learn from other candidates.',
      icon: FaStar,
      path: '/forum'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={headerBg} color={headerColor} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading as="h1" size="2xl">
              Ace your next interview with confidence
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              Our intelligent interview preparation platform helps you practice, receive AI-powered feedback, 
              and track your improvement. Get ready for your dream job with personalized mock interviews.
            </Text>
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              onClick={() => navigate('/register')}
              mt={4}
            >
              Start for free!
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center">Features that will help you succeed</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  title={feature.title}
                  text={feature.text}
                  icon={feature.icon}
                  onClick={() => navigate(feature.path)}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={16}>
        <Container maxW={'4xl'}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            align={'center'}
            justify={'center'}
            rounded={'xl'}
            bg={useColorModeValue('primary.50', 'gray.700')}
            p={{ base: 8, md: 12 }}
          >
            <Stack flex={1} spacing={4}>
              <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                Ready to ace your interviews?
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={'gray.600'}>
                Join thousands of job seekers who've improved their interview
                skills and landed their dream jobs.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme={'blue'}
                  bg={'primary.500'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'primary.600',
                  }}
                >
                  Sign Up Now
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant={'outline'}
                  colorScheme={'blue'}
                  rounded={'full'}
                  px={6}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

// Custom arrow icon
const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Home; 
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUsers, FaRocket, FaBrain, FaLightbulb } from 'react-icons/fa';

const About = () => {
  return (
    <Container maxW={'6xl'} py={12}>
      {/* Hero Section */}
      <Stack spacing={10}>
        <Stack spacing={4} align={'center'} textAlign={'center'}>
          <Heading fontSize={'4xl'}>About Interview Prep Platform</Heading>
          <Text color={'gray.600'} maxW={'3xl'} fontSize={'xl'}>
            We're on a mission to help job seekers ace their interviews with confidence.
            Our platform provides personalized preparation tools and AI-powered feedback.
          </Text>
        </Stack>

        {/* Our Story */}
        <Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Heading size={'lg'}>Our Story</Heading>
              <Text color={'gray.600'} lineHeight={1.8}>
                Interview Prep Platform was born out of a simple observation: despite the 
                abundance of resources for job seekers, there was no comprehensive solution 
                that provided personalized, interactive interview practice with real-time feedback.
              </Text>
              <Text color={'gray.600'} lineHeight={1.8}>
                Founded in 2023, our team of career experts, technology enthusiasts, and AI 
                specialists came together to create a platform that would revolutionize the 
                way people prepare for interviews, making quality preparation accessible to everyone.
              </Text>
              <Text color={'gray.600'} lineHeight={1.8}>
                Today, we're proud to help thousands of job seekers practice, learn, and improve
                their interview skills to land their dream jobs.
              </Text>
            </Stack>
            <Flex justifyContent={'center'} alignItems={'center'}>
              <Image
                rounded={'md'}
                alt={'Our team working'}
                src={
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }
                objectFit={'cover'}
              />
            </Flex>
          </SimpleGrid>
        </Box>

        {/* Our Mission */}
        <Box py={10} bg={useColorModeValue('gray.50', 'gray.900')} rounded={'lg'}>
          <Container maxW={'4xl'} py={5}>
            <Stack spacing={4} align={'center'} textAlign={'center'} mb={10}>
              <Heading>Our Mission</Heading>
              <Text color={'gray.600'} maxW={'3xl'} fontSize={'lg'}>
                We believe everyone deserves the chance to showcase their best self in job interviews.
                Our mission is to democratize interview preparation and help candidates build the 
                confidence they need to succeed.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
              <Stack align={'center'} textAlign={'center'}>
                <Flex
                  w={16}
                  h={16}
                  align={'center'}
                  justify={'center'}
                  color={'white'}
                  rounded={'full'}
                  bg={'primary.500'}
                  mb={3}
                >
                  <Icon as={FaUsers} w={10} h={10} />
                </Flex>
                <Heading fontSize={'xl'}>Inclusivity</Heading>
                <Text color={'gray.600'}>
                  Making quality interview preparation accessible to everyone, regardless of background.
                </Text>
              </Stack>

              <Stack align={'center'} textAlign={'center'}>
                <Flex
                  w={16}
                  h={16}
                  align={'center'}
                  justify={'center'}
                  color={'white'}
                  rounded={'full'}
                  bg={'primary.500'}
                  mb={3}
                >
                  <Icon as={FaRocket} w={10} h={10} />
                </Flex>
                <Heading fontSize={'xl'}>Innovation</Heading>
                <Text color={'gray.600'}>
                  Leveraging cutting-edge technology to create a personalized learning experience.
                </Text>
              </Stack>

              <Stack align={'center'} textAlign={'center'}>
                <Flex
                  w={16}
                  h={16}
                  align={'center'}
                  justify={'center'}
                  color={'white'}
                  rounded={'full'}
                  bg={'primary.500'}
                  mb={3}
                >
                  <Icon as={FaBrain} w={10} h={10} />
                </Flex>
                <Heading fontSize={'xl'}>Empowerment</Heading>
                <Text color={'gray.600'}>
                  Building confidence through practice, feedback, and continuous improvement.
                </Text>
              </Stack>

              <Stack align={'center'} textAlign={'center'}>
                <Flex
                  w={16}
                  h={16}
                  align={'center'}
                  justify={'center'}
                  color={'white'}
                  rounded={'full'}
                  bg={'primary.500'}
                  mb={3}
                >
                  <Icon as={FaLightbulb} w={10} h={10} />
                </Flex>
                <Heading fontSize={'xl'}>Growth</Heading>
                <Text color={'gray.600'}>
                  Fostering a mindset of continuous learning and personal development.
                </Text>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        {/* How It Works */}
        <Box py={5}>
          <Stack spacing={4} mb={10}>
            <Heading textAlign={'center'}>How It Works</Heading>
            <Text color={'gray.600'} textAlign={'center'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
              Our platform combines advanced technology with proven interview techniques to help you succeed.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box bg={useColorModeValue('white', 'gray.700')} p={6} shadow={'md'} rounded={'lg'}>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={2} color={'primary.500'}>
                Step 1: Practice
              </Text>
              <Text color={'gray.600'}>
                Choose your job role and difficulty level, then practice with AI-generated interview
                questions tailored to your needs. Record your responses through video, audio, or text.
              </Text>
            </Box>

            <Box bg={useColorModeValue('white', 'gray.700')} p={6} shadow={'md'} rounded={'lg'}>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={2} color={'primary.500'}>
                Step 2: Analyze
              </Text>
              <Text color={'gray.600'}>
                Receive instant feedback on your performance, including analysis of your
                communication clarity, confidence level, and content relevance.
              </Text>
            </Box>

            <Box bg={useColorModeValue('white', 'gray.700')} p={6} shadow={'md'} rounded={'lg'}>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={2} color={'primary.500'}>
                Step 3: Improve
              </Text>
              <Text color={'gray.600'}>
                Track your progress over time, identify areas for improvement, and access
                resources to enhance your interview skills and land your dream job.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
};

export default About; 
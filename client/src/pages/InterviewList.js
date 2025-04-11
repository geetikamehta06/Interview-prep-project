import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  SimpleGrid, 
  Badge, 
  Flex, 
  HStack, 
  VStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCheck, FaClock, FaCalendar } from 'react-icons/fa';

const InterviewList = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">My Interviews</Heading>
        <Button as={Link} to="/interviews/new" colorScheme="blue">
          Schedule New Interview
        </Button>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={10}>
        {/* Example Interview Card */}
        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg" 
          bg={bgColor}
          borderColor={borderColor}
        >
          <VStack align="start" spacing={3}>
            <Flex w="full" justify="space-between">
              <Badge colorScheme="green">Frontend</Badge>
              <Badge colorScheme="blue">Completed</Badge>
            </Flex>
            
            <Heading size="md">Frontend Development Interview</Heading>
            
            <HStack>
              <Icon as={FaCalendar} color="gray.500" />
              <Text color="gray.500">May 15, 2023</Text>
            </HStack>
            
            <HStack>
              <Icon as={FaClock} color="gray.500" />
              <Text color="gray.500">45 minutes</Text>
            </HStack>
            
            <Text noOfLines={2}>Practice interview focusing on React, JavaScript, and CSS.</Text>
            
            <HStack spacing={4} pt={2}>
              <Button as={Link} to="/interviews/1" size="sm" colorScheme="blue">
                View Details
              </Button>
              <Button as={Link} to="/interviews/1/review" size="sm" variant="outline">
                View Feedback
              </Button>
            </HStack>
          </VStack>
        </Box>
        
        {/* Example Upcoming Interview */}
        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg"
          bg={bgColor}
          borderColor={borderColor}
        >
          <VStack align="start" spacing={3}>
            <Flex w="full" justify="space-between">
              <Badge colorScheme="purple">Full Stack</Badge>
              <Badge colorScheme="orange">Upcoming</Badge>
            </Flex>
            
            <Heading size="md">Full Stack Developer Interview</Heading>
            
            <HStack>
              <Icon as={FaCalendar} color="gray.500" />
              <Text color="gray.500">May 20, 2023</Text>
            </HStack>
            
            <HStack>
              <Icon as={FaClock} color="gray.500" />
              <Text color="gray.500">60 minutes</Text>
            </HStack>
            
            <Text noOfLines={2}>Practice interview covering Node.js, Express, React, and MongoDB.</Text>
            
            <Button as={Link} to="/interviews/2" size="sm" colorScheme="blue">
              Join Interview
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
      
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Note: This is a placeholder for the interview list functionality.
      </Text>
    </Container>
  );
};

export default InterviewList; 
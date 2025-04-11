import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  HStack, 
  VStack,
  Divider,
  Badge,
  Textarea,
  useColorModeValue,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const InterviewSession = () => {
  const { id } = useParams();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <Button as={Link} to="/interviews" size="sm" colorScheme="blue" variant="outline" mb={6}>
        Back to Interviews
      </Button>
      
      <Box mb={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Interview Session #{id}</Heading>
          <Badge colorScheme="green" fontSize="lg" px={3} py={1}>Active</Badge>
        </Flex>
        
        <Text color="gray.500" mb={8}>Frontend Development Interview • 45 minutes</Text>
        
        <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={6}>
          <GridItem>
            <Box 
              p={5} 
              shadow="md" 
              borderWidth="1px" 
              borderRadius="lg" 
              bg={cardBg}
              borderColor={borderColor}
              mb={6}
            >
              <Heading size="md" mb={4}>Current Question</Heading>
              <Text mb={4}>
                Explain the difference between controlled and uncontrolled components in React. 
                When would you use one over the other?
              </Text>
              
              <Divider my={4} />
              
              <Heading size="sm" mb={3}>Your Answer</Heading>
              <Textarea 
                placeholder="Type your answer here..." 
                minH="200px"
                mb={4}
              />
              
              <Flex justify="space-between">
                <Button colorScheme="gray">Previous Question</Button>
                <Button colorScheme="blue">Next Question</Button>
              </Flex>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box 
              p={5} 
              shadow="md" 
              borderWidth="1px" 
              borderRadius="lg" 
              bg={cardBg}
              borderColor={borderColor}
              mb={6}
            >
              <Heading size="md" mb={4}>Interview Progress</Heading>
              <Text mb={4}>Question 2 of 5</Text>
              
              <VStack spacing={3} align="stretch">
                <HStack>
                  <Badge colorScheme="green">Complete</Badge>
                  <Text>Question 1: Explain React lifecycle methods</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="blue">Current</Badge>
                  <Text>Question 2: Controlled vs uncontrolled components</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="gray">Upcoming</Badge>
                  <Text>Question 3: Redux state management</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="gray">Upcoming</Badge>
                  <Text>Question 4: CSS layout techniques</Text>
                </HStack>
                <HStack>
                  <Badge colorScheme="gray">Upcoming</Badge>
                  <Text>Question 5: Web performance optimization</Text>
                </HStack>
              </VStack>
            </Box>
            
            <Button colorScheme="red" size="lg" width="full">
              End Interview
            </Button>
          </GridItem>
        </Grid>
      </Box>
      
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Note: This is a placeholder for the interview session functionality.
      </Text>
    </Container>
  );
};

export default InterviewSession; 
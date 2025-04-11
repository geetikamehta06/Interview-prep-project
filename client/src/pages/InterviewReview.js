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
  Progress,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  SimpleGrid
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const InterviewReview = () => {
  const { id } = useParams();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <Button as={Link} to="/interviews" size="sm" colorScheme="blue" variant="outline" mb={6}>
        Back to Interviews
      </Button>
      
      <Box mb={10}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Interview Feedback #{id}</Heading>
          <Badge colorScheme="green" fontSize="lg" px={3} py={1}>Completed</Badge>
        </Flex>
        
        <Text color="gray.500" mb={8}>Frontend Development Interview • Completed on May 15, 2023</Text>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            borderColor={borderColor}
          >
            <StatGroup>
              <Stat>
                <StatLabel>Overall Score</StatLabel>
                <StatNumber>8.5/10</StatNumber>
                <Progress value={85} colorScheme="green" mt={2} />
              </Stat>
            </StatGroup>
          </Box>
          
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            borderColor={borderColor}
          >
            <StatGroup>
              <Stat>
                <StatLabel>Technical Accuracy</StatLabel>
                <StatNumber>9/10</StatNumber>
                <Progress value={90} colorScheme="blue" mt={2} />
              </Stat>
            </StatGroup>
          </Box>
          
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            borderColor={borderColor}
          >
            <StatGroup>
              <Stat>
                <StatLabel>Communication</StatLabel>
                <StatNumber>8/10</StatNumber>
                <Progress value={80} colorScheme="purple" mt={2} />
              </Stat>
            </StatGroup>
          </Box>
        </SimpleGrid>
        
        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg" 
          bg={cardBg}
          borderColor={borderColor}
          mb={8}
        >
          <Heading size="md" mb={4}>Feedback Summary</Heading>
          <Text mb={4}>
            You demonstrated strong technical knowledge in React fundamentals. Your explanation of component lifecycle and state management
            was thorough and accurate. You could improve on explaining complex concepts more concisely, and providing more real-world examples
            to support your answers.
          </Text>
          
          <Divider my={4} />
          
          <Heading size="md" mb={4}>Strengths</Heading>
          <VStack align="start" spacing={2} mb={4}>
            <Text>• Strong understanding of React fundamentals</Text>
            <Text>• Good problem-solving approach</Text>
            <Text>• Clear communication of technical concepts</Text>
          </VStack>
          
          <Heading size="md" mb={4}>Areas for Improvement</Heading>
          <VStack align="start" spacing={2}>
            <Text>• Provide more concrete examples in answers</Text>
            <Text>• Be more concise when explaining complex topics</Text>
            <Text>• Deepen knowledge of performance optimization</Text>
          </VStack>
        </Box>
        
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Note: This is a placeholder for the interview review functionality.
        </Text>
      </Box>
    </Container>
  );
};

export default InterviewReview; 
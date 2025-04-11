import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Input,
  Select,
  Button,
  useToast,
  Link,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  Divider,
  IconButton,
  Tooltip,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
} from '@chakra-ui/react';
import { FaCode, FaSearch, FaFilter, FaStar, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InterviewQuestions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  const toast = useToast();
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      title: "Implement  React's Virtual DOM ",
      difficulty: "Medium",
      category: "Frontend",
      tags: ["React", "JavaScript", "Performance"],
      rating: 4.8,
      answers: 230,
      type: "Technical"
    },
    {
      id: 2,
      title: "Implement  event delegation work in JavaScript?",
      difficulty: "Easy",
      category: "Frontend",
      tags: ["JavaScript", "DOM", "Events"],
      rating: 4.5,
      answers: 195,
      type: "Technical"
    },
    {
      id: 3,
      title: "Implement a function to detect a cycle in a linked list",
      difficulty: "Hard",
      category: "Algorithms",
      tags: ["Data Structures", "Linked Lists", "Algorithms"],
      rating: 4.7,
      answers: 156,
      type: "Technical"
    },
    {
      id: 4,
      title: "Practice Javascript ",
      difficulty: "Medium",
      category: "Time Management",
      tags: ["Deadlines", "Pressure", "Prioritization"],
      rating: 4.3,
      answers: 220,
      type: "Behavioral"
    },
    {
      id: 5,
      title: "Design a page using mongodb",
      difficulty: "Medium",
      category: "Web Services",
      tags: ["System Design", "Scalability", "Databases"],
      rating: 4.9,
      answers: 175,
      type: "System Design"
    }
  ];

  const handlePractice = (question) => {
    try {
      window.open('https://www.onlinegdb.com/', '_blank', 'noopener,noreferrer');
      toast({
        title: "Opening Compiler",
        description: `Practice: ${question.title}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not open compiler. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = difficulty === 'all' || question.difficulty === difficulty;
    const matchesCategory = category === 'all' || question.category === category;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Practice Questions</Heading>
          <Text color="gray.500">Select a question and practice in our online compiler</Text>
        </Box>

        <HStack spacing={4}>
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            flex={1}
          />
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            w="200px"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            w="200px"
          >
            <option value="all">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Algorithms">Algorithms</option>
          </Select>
        </HStack>

        <VStack spacing={4} align="stretch">
          {filteredQuestions.map((question) => (
            <Card
              key={question.id}
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              overflow="hidden"
              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <Flex justify="space-between" align="center">
                    <Badge
                      colorScheme={
                        question.difficulty === 'Easy' ? 'green' :
                        question.difficulty === 'Medium' ? 'blue' : 'red'
                      }
                    >
                      {question.difficulty}
                    </Badge>
                    <Button
                      leftIcon={<FaCode />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handlePractice(question)}
                    >
                      Practice Now
                    </Button>
                  </Flex>

                  <Heading size="md">{question.title}</Heading>

                  <Flex wrap="wrap" gap={2}>
                    {question.tags.map((tag, index) => (
                      <Tag key={index} size="sm" colorScheme="gray">
                        {tag}
                      </Tag>
                    ))}
                  </Flex>

                  <Flex justify="space-between" align="center" color="gray.500">
                    <HStack>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text>{question.rating}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaComment} />
                      <Text>{question.answers} answers</Text>
                    </HStack>
                  </Flex>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default InterviewQuestions; 